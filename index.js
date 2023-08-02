const express = require("express");
let cors = require('cors')
const http = require("http");
const { Server } = require("socket.io");
let morgan = require('morgan')


const app = express();
const server = http.createServer(app);
app.use(morgan('tiny'))
app.use(express.json())
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const io = new Server(server, {
  allowEIO3: true,
    cors: {
        origin: ['https://chat-app-socket-io-delta.vercel.app/','http://localhost:3000'],
        credentials: true,
        methods: ["GET", "POST"],
        allowedHeaders: ['Access-Control-Allow-Origin']
    },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.emit('notification', 'Thanks for connecting to Codedamn!')

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
app.post("/webhook", async function (req, res){    
    const sockets = await io.fetchSockets();

    sockets.forEach((socket)=>socket.emit("send_message",req.body))
    res.send(req.body)
  })
  
app.get("/",function(req, res){
  return res.send('my app is running')
})
let port = process.env.PORT || 9001

server.listen(port,()=>{
    console.info("test Example app listening on port 9001! Go to http://localhost:9001/",port );
});


module.exports = app