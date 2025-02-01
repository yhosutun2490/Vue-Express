const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')

const route = require('./routes/index')
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