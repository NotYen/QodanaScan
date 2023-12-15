var express = require('express')
var router = express.Router()

const _ = require('lodash')

router.post('/', (req, res, next) => {
    const {body: {username, password}} = req
    // const default = { username: 'mmh-admin', password: 'mmh-123'}
    if (username === 'mmh-admin' && password === 'mmh-123') {
        // 符合帳密，傳送 JWT token
        return res.send({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Im1taC1hZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.gmG7hjdmZas17e3C85h7vd5U9-RZ19X0gcYP30--qXg'
        })
    } else {
        return res.sendStatus(401)
    }
})


module.exports = router