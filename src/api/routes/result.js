var express = require('express');
var router = express.Router();
const { Results, Users, aiResult, audioResult } = require('../collections');
const auth = require("../middleware/auth")
const { ObjectId } = require('mongodb')
const { parse } = require('json2csv');

router.get('/', auth, async function (req, res, next) {
  // TODO: 取得 result
  const user = await Results.getOne({ user_id: req.user.user_id, case_id: parseInt(req.query.case_id, 10) });
  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'user not found',
    });
  }
  return res.json({
    status: 'success',
    data: user.results,
  });
});

router.post('/', auth, async function (req, res, next) {
  // TODO: 更新 result 資料庫
  const resultData = req.body;
  const user_id = req.user.user_id;

  const query = { user_id, case_id: resultData.case_id };

  // 確認該 user 的 collections 中有沒有這個 case_id
  const user = await Users.getOne({ _id: user_id });
  if (!user.cases.some(caseObj => caseObj.case_id === resultData.case_id)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Case not found in user\'s collection.',
    });
  }

  try {
    // 確認該 results 是否已經存在
    const existingResult = await Results.getOne(query);

    // 如果 results 已存在，更新該 results
    if (existingResult) {
      const addedResult = await Results.addResult(query, {
        question: resultData.question,
        answer: resultData.answer,
        spend_time: resultData.spend_time,
        more: resultData.more
      });
      return res.json({
        status: 'success',
        data: addedResult,
      });
    } else {
      // 如果 results 不存在，創建新的 results
      const data = {
        user_id: user_id,
        case_id: resultData.case_id,
        created_at: new Date()
      };
      const results = {
        [resultData.question]: {
          answer: resultData.answer,
          spend_time: resultData.spend_time,
          more: resultData.more,
          created_at: new Date()
        }
      };
      const createdResult = await Results.create(data, results);
      return res.json({
        status: 'success',
        data: createdResult,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
});

router.post('/score', auth, async function (req, res, next) {
  const { case_id, score } = req.body;

  try {
    const result = await Results.addScore({ user_id: req.user.user_id, case_id }, score);
    return res.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
});

// 輸出 excel
router.get('/export', async function (req, res, next) {
  try {
    // 從資料庫中取得所有的結果資料
    const results = await Results.getAll();

    // 從資料庫中取得所有的使用者資料
    const users = await Users.getAll();

    // 從資料庫中取得所有的 ai_result 資料
    const aiResults = await aiResult.getAll();

    // 從資料庫中取得所有的 audio_result 資料
    const audioResults = await audioResult.getAll();

    // 建立一個使用者映射，將每個使用者的 _id 映射到該使用者的資訊
    const userMap = {};
    users.forEach(user => {
      userMap[user._id] = user;
    });

    // 建立一個 ai_result 映射表
    const aiResultsMap = {};
    aiResults.forEach(aiResult => {
      aiResultsMap[aiResult.case_id] = aiResult;
    });

    // 建立一個 audio_result 映射表
    const audioResultsMap = {};
    audioResults.forEach(audioResult => {
      audioResultsMap[audioResult.case_id] = audioResult;
    });

    // 轉換資料以供輸出
    const transformedData = results.map(result => {
      let flattened = {};
  
      // 加入 user 的資訊
      let user = userMap[result.user_id];
      if (user) {
          // 加入 user 的基本資料
          flattened._id = user._id;
          flattened.username = user.username;
          flattened.password = user.password;
          flattened.created_at = user.created_at;
          flattened.token = user.token;
          flattened.mmh_id = user.mmh_id;
  
          // 加入 user 的案例資訊
          if (user.cases && user.cases.length > 0) {
              let caseData = user.cases[0];
              for (let key in caseData) {
                  flattened[key] = caseData[key];
              }
          }
      }
  
      // 加入 result 的資訊
      flattened.result_id = result._id;
      flattened.case_id = result.case_id;
      flattened.result_created_at = result.created_at;
      for (let key in result.results) {
          flattened[`${key}_answer`] = result.results[key].answer;
          flattened[`${key}_spend_time`] = result.results[key].spend_time;
      }
  
      // 加入 ai_result 的資訊
      let aiResult = aiResultsMap[result.case_id];
      if (aiResult) {
          for (let key in aiResult.result) {
              flattened[`${key}_ai_result`] = aiResult.result[key].result;
              flattened[`${key}_ai_url`] = aiResult.result[key].url;
              flattened[`${key}_ai_updated_at`] = aiResult.result[key].updated_at;
          }
      }
  
      // 加入 audio_result 的資訊
      let audioResult = audioResultsMap[result.case_id];
      if (audioResult) {
          for (let question in audioResult.result) {
              flattened[`${question}_audio_result`] = audioResult.result[question].result;
              flattened[`${question}_audio_url`] = audioResult.result[question].url;
              flattened[`${question}_audio_updated_at`] = audioResult.result[question].updated_at;
          }
      }
  
      // 加入 result 的 score
      for (let scoreKey in result.score) {
          flattened[`score_${scoreKey}`] = result.score[scoreKey];
      }
  
      // 返回轉換後的資料
      return flattened;
  });

    // 將轉換後的資料解析為 CSV 格式
    const csv = parse(transformedData);

    // 設置適當的響應標頭，然後將 CSV 資料發送回客戶端
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.end(csv);
  } catch (error) {
    // 如果在上面的程式碼中發生錯誤，返回 500 狀態碼和錯誤訊息
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
