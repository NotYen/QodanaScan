var express = require('express')
var router = express.Router()

const { format } = require('util')
const Multer = require('multer')
const { Storage } = require('@google-cloud/storage')
const axios = require('axios')
const auth = require("../middleware/auth")
const Collections = require('../collections')

/**
 * @description GCS 上傳設定
 */
const storage = new Storage({
    keyFilename: 'config/ethan-387206-6bb6739b3efa.json',
})
const multer = Multer({
    // storage: Multer.diskStorage({
    //     destination: '/tmp',
    // }),
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
})
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET)
const bucketAI = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_AI)



/**
 * @description 單一檔案上傳，適用 30 mb 左右
 */
router.get('/upload-form', (req, res, next) => {
    res.render('file-upload')
})

router.post('/upload/avatar', multer.single('file'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    console.log('req.file', req.file)
    const file = req.file;

    const fileName = `avatar/${(new Date()).getTime()}_${file.originalname}`

    const gcsFile = bucket.file(fileName);
    const stream = gcsFile.createWriteStream({
        resumable: false,
        gzip: false,
    });

    stream.end(file.buffer);

    stream.on('error', (err) => {
        console.error(err);
        return res.status(500).json({ message: err })
    });

    stream.on('finish', async () => {
        try {
            await storage.bucket(bucket.name).file(fileName).makePublic();
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ error })
        }
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${fileName}`
        );
        return res.json({
            publicUrl,
        })
    });
})

/**
 * @description 前端透過此 API 上傳影片檔案後，由後端向 ai server 發請求讓 ai server
 * 取得此影片分析的結果，再回傳給前端
 */

// TODO: 之後接上錄影的前端，和串接 AI api(endpoint 需要拉到 .env)
router.post('/upload', auth, multer.single('file'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    // 預設 question 為握筆
    const { body: { question = 'pen' } } = req

    const file = req.file;
    const uid = req.user.user_id;
    const case_id = req.body.case_id;
    const question_name = req.body.question_name;
    console.log('file', file)
    console.log('uid', uid)
    console.log('case_id', case_id)
    console.log('question', question)
    console.log('question_name', question_name)

    // const folderName = 'download/storage/v1/b/mmh-record-video/o/'

    const fileName = `${(new Date()).getTime()}_video_${question}_${Buffer.from(file.originalname, 'latin1').toString('utf8')}`

    const gcsFile = bucketAI.file(fileName);
    const stream = gcsFile.createWriteStream({
        resumable: false,
        gzip: false,
    });

    stream.end(file.buffer);

    stream.on('error', (err) => {
        console.error(err);
        return res.status(500).json({ message: err })
    });

    stream.on('finish', async () => {
        try {
            await storage.bucket(bucketAI.name).file(fileName).makePublic();
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ error })
        }
        const publicUrl = format(
            `https://storage.googleapis.com/${bucketAI.name}/${fileName}`
        );
        let aiServerResponse = ''
        try {
            aiServerResponse = await axios.get(`http://34.125.5.213:5000/ai_server?question=${question}&filename=${fileName}`, {
                timeout: 30000
            });
            console.log('aiServerResponse', aiServerResponse)
            console.log('aiServerResponse.data', aiServerResponse.data)
            try {
                let aiResult = await Collections.aiResult.update(
                    { uid, case_id },
                    {
                        uid: uid,
                        case_id: case_id,
                        question_name: question_name,
                        url: publicUrl,
                        result: aiServerResponse.data,
                    }
                )
                console.log(aiResult)
            } catch (error) {
                console.log('update ai result error', error)
            }
        } catch (error) {
            console.log('request ai server error', error)
        }

        // axios.get(`http://34.125.5.213:5000/ai_server?question=${question}&filename=${fileName}`, {
        //     timeout: 30000
        // }).then(async (response) => {
        //     console.log(response.data)
        //     try {
        //         let res = await Collections.aiResult.update(
        //             { uid, case_id },
        //             {
        //                 uid: uid,
        //                 case_id: case_id,
        //                 question_name: question_name,
        //                 url: publicUrl,
        //                 result: response.data,
        //             }
        //         )
        //         console.log(res)
        //     } catch (error) {
        //         console.log('update ai result error', error)
        //     }
        // }).catch(error => {
        //     console.log('request ai server error', error)
        // })

        return res.json({
            publicUrl,
            message: aiServerResponse.data
        })
    });

    // Create a new blob in the bucket and upload the file data.
    // const blob = bucket.file(req.file.originalname);
    // const blobStream = blob.createWriteStream();

    // blobStream.on('error', err => {
    //     next(err);
    // });

    // blobStream.on('finish', () => {
    //     // The public URL can be used to directly access the file via HTTP.
    //     const publicUrl = format(
    //         `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    //     );

    //     // 因為前端不需要 ai server 分析的結果，所以直接回傳給前端告知已完成影片上傳
    //     res.json({
    //         publicUrl,
    //     })

    //     // 檔案上傳完成後，向 ai server 發出請求取得分析結果
    //     axios.get(`http://34.125.186.244:5000/ai_server?question=${question}&filename=${blob.name}`)
    //         .then(response => {
    //             console.log(response.data)
    //             // TODO: 需要存下此影片分析的結果。
    //             /**
    //              * {
    //              *  user,
    //              *  created_at,
    //              *  video_url,
    //              *  analyze_response,
    //              *
    //              * }
    //              */
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // });

    // blobStream.end(req.file.buffer);
})

router.post('/upload/audio', auth, multer.single('file'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    const file = req.file;
    const uid = req.user.user_id;
    const case_id = req.body.case_id;
    const question_name = req.body.question_name;
    console.log('file', file)
    console.log('uid', uid)

    const fileName = `${(new Date()).getTime()}_audio_${Buffer.from(file.originalname, 'latin1').toString('utf8')}`

    const gcsFile = bucketAI.file(fileName);
    const stream = gcsFile.createWriteStream({
        resumable: false,
        gzip: false,
    });

    stream.end(file.buffer);

    stream.on('error', (err) => {
        console.error(err);
        return res.status(500).json({ message: err })
    });

    stream.on('finish', async () => {
        try {
            await storage.bucket(bucketAI.name).file(fileName).makePublic();
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ error })
        }
        const publicUrl = format(
            `https://storage.googleapis.com/${bucketAI.name}/${fileName}`
        );

        let aiResult = await Collections.audioResult.update(
            { uid, case_id },
            {
                uid: uid,
                case_id: case_id,
                question_name: question_name,
                url: publicUrl,
                result: '',
            }
        )
        console.log(aiResult)

        return res.json({
            publicUrl,
        })
    });
})

module.exports = router