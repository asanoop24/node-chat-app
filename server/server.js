const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '..', 'public');
console.log(publicPath);

var port = process.env.PORT || 3000;


// Initiating the App
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.broadcast.emit('newMessage', generateMessage('admin', 'A new user joined'));
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the group'));


  socket.on('disconnect', (socket) => {
    console.log('User Disconnected');
  });

  socket.on('createEmail', (email) => {
    console.log('Created Email: ', email);
  });

  socket.on('createMessage', (message, callback) => {
    console.log('Created Message: ', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback(message);
  });

  // socket.emit('newEmail', {
  //   from: 'Server',
  //   to: 'Browser',
  //   text: 'get the email',
  //   createdAt: 123124
  // });
  //
  // socket.emit('newMessage', {
  //   from: 'Server',
  //   to: 'Browser',
  //   text: 'This is a message from server to browser',
  //   createdAt: 123124
  // });


});

// Declaring the Static Middleware for HTML files
app.use(express.static(publicPath));

// Starting the app server on the port 3000
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
