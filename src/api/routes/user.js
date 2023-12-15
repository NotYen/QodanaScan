var express = require('express');
var router = express.Router();
const _ = require('lodash')
const Collections = require('../collections')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth")

const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
let serviceAccount = require('../config/ethan-387206-firebase-adminsdk-m9jn8-6e68258291.json');
const firebaseApp = initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', auth, async function(req, res, next) {
  const { username, password } = req.body

  if (!(username && password)) {
    return res.status(400).json({
      status: 'error',
      message: {
        username: '請輸入用戶名和密碼'
      },
    })
  }

  const user = await Collections.Users.getOne({ username })

  if (user) {

    user.token = req.user.token
    return res.json({
      status: 'success',
      data: user,
    })
  } else {
    return res.status(400).json({
      status: 'error',
      message: {
        username: '無效的用戶名/密碼'
      },
    })
  }

});

router.post('/create', async function(req, res, next) {

  const { username, password, id, verify } = req.body

  if (!username || !password) {
    return res.status(400).send({
      status: 'error',
      message: {
        username: 'req username or password cannot be empty'
      },
    })
  }
  console.log(username, password, id, verify)

  const user = await Collections.Users.getOne({ username })

  if (user) {
    return res.status(409).send({
      status: 'error',
      message: {
        username: 'username already exist'
      },
    })
  }

  if (verify !== 'false') {
    if (!id) {
      return res.status(400).send({
        status: 'error',
        message: {
          id: '註冊碼不可為空'
        },
      })
    }

    const mmhId = await Collections.MmhId.getOne({ _id: id })

    if (!mmhId) {
      return res.status(400).send({
        status: 'error',
        message: {
          id: '註冊碼未找到'
        },
      })
    }

    const mmhIdUser = await Collections.Users.getOne({ mmh_id: id })

    if (mmhIdUser) {
      return res.status(409).send({
        status: 'error',
        message: {
          id: '註冊碼已經使用'
        },
      })
    }

  }

  // create user
  try {
    const userRecord = await getAuth().createUser({
      email: username,
      emailVerified: true,
      password: password,
      disabled: false,
    })

    console.log('Successfully created new user:', userRecord);

    const newUser = {
      _id: userRecord.uid,
      username: username,
      mmh_id: id || null
    }

    const result = await Collections.Users.create(newUser)
    console.log('result', result)

    console.log('process.env.TOKEN_KEY', process.env.TOKEN_KEY)

    return res.json({
      status: 'success',
      data: newUser,
      result: result,
    })
  } catch (error) {
    console.log('Error creating new user:', error);
    return res.status(400).send({
      status: 'error',
      message: {
        username: error.message
      },
    })
  }

});

// router.post('/update', auth, async function(req, res, next) {
//   const { username, password } = req.body
//   if (!(username && password)) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'req body cannot be empty',
//     })
//   }

//   const user = await Collections.Users.getOne({ _id: req.user.user_id })

//   if (!user) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'user not found',
//     })
//   }
//   const encryptedPassword = await bcrypt.hash(password, 10)
//   userData = await Collections.Users.update({ _id: user_id }, { $set: { username: username, password: encryptedPassword } })
//   return res.json({
//     status: 'success',
//     data: userData,
//   })
// });

router.get('/case', auth, async function(req, res, next) {

  const user = await Collections.Users.getOne({ _id: req.user.user_id })
  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'user not found',
    })
  }
  return res.json({
    status: 'success',
    data: user.cases,
  })
});

router.post('/case', auth, async function(req, res, next) {
  const body = req.body
  console.log(body)
  const user_id = req.user.user_id
  console.log(user_id)
  try {
    const userCase = await Collections.Users.addCase({ _id: user_id }, body)
    console.log(userCase)
    return res.json({
      status: 'success',
      data: userCase,
    })
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error,
    })
  }
});


module.exports = router;
