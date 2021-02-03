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
            message: 'A rejoin le tchat'
        });

    });

    socket.on('leave', function (data) {

        io.emit('left room', {
            user: data.user,
            message: 'A quitté le tchat.'
        });
        socket.leave(data.room);

    });

    socket.on('message', function (data) {

        io.in(data.room).emit('new message', {
            user: data.user,
            message: data.message
        });

    })

     
    // socket.on('adduser', function (data) {
    //     var username = data.username;
    //     var room = data.room;
 
    //     if (rooms.indexOf(room) != -1) {
    //         socket.username = username;
    //         socket.room = room;
    //         usernames[username] = username;
    //         socket.join(room);
    //         socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
    //         socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
    //     } else {
    //         socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
    //     }
    // });
     
    // socket.on('createroom', function (data) {
    //     var new_room = ("" + Math.random()).substring(2, 7);
    //     rooms.push(new_room);
    //     data.room = new_room;
    //     socket.emit('updatechat', 'SERVER', 'Your room is ready, invite someone using this ID:' + new_room);
    //     socket.emit('roomcreated', data);
    // });
 
    // socket.on('sendchat', function (data) {
    //     io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    // });
 
    // socket.on('disconnect', function () {
    //     delete usernames[socket.username];
    //     io.sockets.emit('updateusers', usernames);
    //     if (socket.username !== undefined) {
    //         socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    //         socket.leave(socket.room);
    //     }
    // });

});


http.listen(process.env.PORTCHAT,(err)=>{
    /* istanbul ignore if */
  if(err){
    console.log(err);
  }else{
    console.log("api tourne sur le port : " + process.env.PORTCHAT);
  }
})