const http = require('http');
const socketio = require('socket.io');

var clients = [];
var port = process.env.PORT || 5000;
var key = process.env.KEY;

var server = new socketio();

server.on('connection', (client) => {
  console.log("Exiting.");
});

server.listen(port);

// Handle ctrl-c.
process.on('SIGINT', function () {
  server.close(function () {
    console.log("Exiting.");
    process.exit(0);
  });
});

console.log("SocketSounds server running on port " + port);
