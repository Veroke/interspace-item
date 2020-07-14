const express = require('express')
const Mock = require('mockjs')
// const { Random } = require('mockjs')

const app = express()
// Random.ctitle()
const Random = Mock.Random

app.use((req, res, next) => {
  //设置响应头
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'content-type,token')
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  //调用下一个中间件
  next()
})

app.get('/admin/edu/subject/:page/:limit', (req, res) => {
  const { page, limit } = req.params
  const data = Mock.mock({
    total: Random.integer(+limit + 2, limit * 2),
    // ['items|' + limit]: [{
    [`items|${limit}`]: [{
      '_id|+1': 1,
      title: '@ctitle(2,5)',
      parentId: 0
    }]
  })

  res.json({
    code: 20000,
    success: true,
    data,
    message: ""
  })
})

app.listen(8888, err => {
  if (err) {
    return console.log('服务器启动失败')
  }
  console.log('gogogo')
})

// const express = require('express')
// const Mock = require('mockjs')

// const app = express()

// app.get(`/admin/edu/subject/:page/:limit`, (req, res) => {
//   let { page, limit } = req.params
//   const data = Mock.mock({
//     total: 100,
//     items: '@ctitl()'
//   })

//   res.json({
//     code: 20000,
//     success: true,
//     data,
//     message: ""
//   })
// })

// app.listen(8888, err => {
//   if (err) {
//     console.log('启动失败')

//   }
//   console.log('mumumu')

// })