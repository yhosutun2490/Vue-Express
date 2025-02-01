const express = require('express')
const router = express.Router()

const homeRoute = require('./module/home')
const todoRoute = require('./module/todo')
// 總路由器
router.use('/api/',homeRoute)
router.use('/api/todo',todoRoute)
module.exports = router