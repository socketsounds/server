const WebSocket = require('ws');

var port = process.env.PORT || 5000;
var key = process.env.KEY;

const server = new WebSocket.Server({ port: port });

server.on('connection', (socket) => {
  socket.name = socket._socket.remoteAddress.replace(/^.*:/, '') +
    ':' + socket._socket.remotePort;
  console.log('Connected: ' + socket.name);

  socket.on('message', (message) => {
    message = message.trim();

    // Match 'play blah' messages.
    if (found = message.match(/^play ([a-zA-Z0-9]+)$/)) {
      server.broadcast(message);
      console.log("Play: " + found[1] + " by " + socket.name);
    }
  });
});

// Broadcast to all.
server.broadcast = function broadcast(data) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Handle ctrl-c.
process.on('SIGINT', () => {
  server.close(() => {
    console.log("Exiting.");
    process.exit(0);
  });
});

console.log("SocketSounds server running on port " + port);
