const express = require("express");
const app = express();

app.use(express.json())

app.post("/webhook", function (req, res){
    console.log('req',req.body)
    res.send('test response')
  })
  
app.get("/",function(req, res){
  return res.send('my app is running')
})
let port = process.env.PORT || 9001

app.listen(port,()=>{
    console.info("test Example app listening on port 9001! Go to https://localhost:9001/" );
});

//https://github.com/YashVashisth772/node_server_test.git