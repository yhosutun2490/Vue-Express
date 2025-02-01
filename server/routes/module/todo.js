const express = require('express')
const router = express.Router()
const Todo = require('../../models/todos') // 載入 Todo model

router.get('/',async (req,res,next)=>{
 try {
    const data = await Todo.find().lean()
    res.send(data)
 } catch(err) {
    console.log('get todo api err',err)
 }
})

router.post('/',async (req,res,next)=>{
    try {
       const newTodoContent = req.body.name
       console.log("post body",req.body)
       await Todo.create({name: newTodoContent})
       res.send({
        message: 'create todo success'
       })
    } catch(err) {
       console.log('create todo api err',err)
       res.status(500).send({
        message: err.message
       })
    }
})

module.exports= router