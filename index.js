// index.js
const express = require('express')

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

module.exports = app


// const express = require("express");
// const app = express();

// app.use(express.json())

// app.post("/webhook", function (req, res){
//     console.log('req',req.body)
//     res.send('test response2')
//   })
  
// app.get("/",function(req, res){
//   return res.send('my app is running')
// })
// let port = process.env.PORT || 9001

// app.listen(port,()=>{
//     console.info("test Example app listening on port 9001! Go to https://localhost:9001/" );
// });

// //https://github.com/YashVashisth772/node_server_test.git

// module.exports = app
