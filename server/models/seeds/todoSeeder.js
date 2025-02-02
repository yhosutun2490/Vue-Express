const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  // db連接後的邏輯
  for (let i = 0; i < 10; i++) {
    Todo.create({
      name:`name-${i}`,
      time: new Date(),
      isDone: false
    })
  }
  console.log('done')
})