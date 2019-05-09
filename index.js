let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

server.listen(3000);

app.use(express.static('public'));

user = [];
connections = [];

io.sockets.on('connection', function(socket) {
  console.log('Успешное соединение');
  connections.push(socket);

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Отключились');
  });

  socket.on('send_mess', function(data) {
    io.sockets.emit('new_mess', {message: data.message, name: data.name, className: data.className});
  });

});