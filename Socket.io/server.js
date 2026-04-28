

import app from "./src/app.js";

import {createServer}from 'http'
import { Server } from "socket.io";

const httpserver = createServer(app)

const io = new Server(httpserver,{})

io.on('connection',(socket)=>{
  console.log('new user connect');
  
  socket.on('msg',(ms)=>{
    console.log(ms);
    console.log('mseggggggg');
    socket.emit('msg',ms)
    io.emit('abc')
    
  })
  
})

httpserver.listen(3000,()=>{
    console.log('server conntected');
    
})