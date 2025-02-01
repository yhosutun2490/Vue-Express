const express = require('express')
const router = express.Router()

const homeRoute = require('./module/home')
const adminRoute = require('./module/admin')
// 總路由器
router.use('/api/',homeRoute)
router.use('/api/admin',adminRoute)
module.exports = router