var express = require('express');
var router = express.Router();
const { Persist, Users } = require('../collections');
const auth = require("../middleware/auth")

router.get('/', auth, async function(req, res, next) {
  const data = await Persist.getOne({ user_id: req.user.user_id, case_id: parseInt(req.query.case_id, 10) });
  if (!data) {
    return res.status(404).json({
      status: 'error',
      message: 'data not found',
    });
  }
  return res.json({
    status: 'success',
    data: data,
  });
});

router.post('/', auth, async function(req, res, next) {
  const {case_id, persist} = req.body;
  const user_id = req.user.user_id;

  const query = { user_id, case_id };

  // 確認該 user 的 collections 中有沒有這個 case_id
  const user = await Users.getOne({ _id: user_id });
  if (!user.cases.some(caseObj => caseObj.case_id === case_id)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Case not found in user\'s collection.',
    });
  }

  try {
    // 確認該 Persist 是否已經存在
    const existing = await Persist.getOne(query);

    // 如果 Persist 已存在，更新該 Persist
    if (existing) {
      const updateResult = await Persist.update(query, { persist: persist });
      return res.json({
        status: 'success',
        data: updateResult,
      });
    } else {
      // 如果 Persist 不存在，創建新的 Persist
      const data = {
        user_id: user_id,
        case_id: case_id,
        persist: persist,
        created_at: new Date()
      };
      const createdResult = await Persist.create(data);
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

module.exports = router;
