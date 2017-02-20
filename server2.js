const http = require('http');

var clients = [];
var port = process.env.PORT || 5000;
var key = process.env.KEY;

var server = new http.Server();

server.on('connect', (req, socket, head) => {
  console.log("CONNECT " + req.connection.remoteAddress);
});

server.on('connection', (socket) => {
  console.log("CONNECTION " + socket.remoteAddress);
});

server.on('upgrade', (req, socket, head) => {
  console.log("UPGRADE");
  console.log(req);
  socket.write('HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: WebSocket\r\n' +
    'Connection: Upgrade\r\n' +
    '\r\n');
});

server.on('request', (req, res) => {
  console.log("REQUEST " + req.connection.remoteAddress);
});

server.on('close', () => {
  console.log("CLOSE");
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
