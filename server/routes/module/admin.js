const express = require('express')
const router = express.Router()

router.post('/product',(req,res,next)=>{
    console.log('req',req.body)
    res.redirect('/')
})

router.get('/add-product',(req,res,next)=>{
    res.send(`<form action="/admin/product" method="POST">
        <input type="text" name="title"/>
        <button type="submit">Send</button>
        </form>`)
})

module.exports= router