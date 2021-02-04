const express = require('express');
const app = express();
const dotenv = require("dotenv").config()
const http = require('http').Server(app);


const io = require('socket.io')(http,{
    cors:{
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

io.on('connection', (socket) => {

    socket.on('join', function (data) {
        socket.join(data.room);
        io.emit('new user joined', {
            user: data.user,
            message: 'A rejoin le chat',
            famille : data.famille
        });

    });

    socket.on('leave', function (data) {

        io.emit('left room', {
            user: data.user,
            message: 'A quitté le chat.',
            famille : data.famille
        });
        socket.leave(data.room);

    });

    socket.on('message', function (data) {

        io.in(data.room).emit('new message', {
            user: data.user,
            message: data.message,
            famille : data.famille
        });

    })

});

http.listen(process.env.PORTCHAT,(err)=>{
    /* istanbul ignore if */
  if(err){
    console.log(err);
  }else{
    console.log("api tourne sur le port : " + process.env.PORTCHAT);
  }
})