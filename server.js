const http = require('http');

var clients = [];
var port = process.env.PORT || 5000;
var port = process.env.KEY;

var server = http.createServer((req, res) => {

  var name = socket.remoteAddress.replace(/^.*:/, '') + ":" + socket.remotePort;
  clients.push(socket);
  console.log("Connected: " + socket.name);

  // Handle incoming messages.
  socket.on('data', function (data) {
    if (data instanceof Buffer) {
      data = data.toString();
    }
    data = data.trim();
    if (found = data.match(/^play ([a-zA-Z0-9]+)$/)) {
      broadcast(data);
      console.log("Play " + found[1] + " by " + socket.name);
    }
  });

  // Handle client disconnect.
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    console.log(socket.name + " disconnected.");
  });

  // Send a message to all clients.
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      client.write(message);
    });
  }
}).listen(port);

// Handle ctrl-c.
process.on('SIGINT', function () {
  server.close(function () {
    console.log("Exiting.");
    process.exit(0);
  });
});

console.log("SocketSounds server running on port " + port);
