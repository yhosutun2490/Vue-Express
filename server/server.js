const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const route = require('./routes/index')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
console.log('env',process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded())
app.use(route)
// 設定靜態資源目錄
const clientPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientPath));

// 處理所有未知路由，導向到 Vue 的 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// 404 not found
app.use ((req,res,next)=>{
    res.status(404).send(`<h1>Page not Found</h1>`)
})
app.listen(3000)