const express = require("express");
let cors = require('cors')
const http = require("http");
const { Server } = require("socket.io");
let morgan = require('morgan')
const winston = require('winston');


const app = express();
const server = http.createServer(app);
app.use(morgan('tiny'))
app.use(express.json())
// const corsOptions ={
//   origin:['https://chat-app-socket-io-delta.vercel.app/','http://localhost:3000'], 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))
app.use(cors())

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-app.log' }),
  ],
});

// app.options('*', cors(corsOptions)) 

const io = new Server(server, {
  // allowEIO3: true,
    cors: {
        origin: ['https://chat-app-socket-io-delta.vercel.app','http://localhost:3000'],
        // credentials: true,
        methods: ["GET", "POST"],
        allowedHeaders: ['Access-Control-Allow-Origin'],
        // 'force new connection': true,
    },
});
io.on("connection", (socket) => {
  logger.info(`User Connected: ${socket.id}`);

  // console.log(`User Connected: ${socket.id}`);
  socket.emit('notification', 'Thanks for connecting to Codedamn!')

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  socket.on("reconnect", () => {
    console.log("User Reconnected", socket.id);
  });
});
app.post("/webhook", async function (req, res){    
    const sockets = await io.fetchSockets();
    logger.info('test sockets',req.body,sockets.length,sockets);
  // console.info('test sockets',sockets,sockets.length);
    sockets.forEach((socket)=>socket.emit("send_message",req.body))
    res.send(req.body)
  })
  
app.get("/",function(req, res){
  return res.send('my app is running')
})
let port = 9001

server.listen(port,()=>{
    logger.info(`port + ${port}`);
    console.info("test Example app listening on port 9001! Go to http://localhost:9001/",port );
});


module.exports = app