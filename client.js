var serverUrl = "ws://localhost:5000";
var soundsUrl = "http://home.caseyfulton.com/sounds/";

debugger;
socket = new WebSocket(serverUrl);
socket.onmessage = function(data) {
  data = data.trim();
  console.log("Received: " + data);
  if (found = data.match(/^play ([a-zA-Z0-9]+)$/)) {
    playSound(found[1]);
  }
};

function playSound(sound) {
  var audio = new Audio(soundsUrl + sound + ".mp3");
  audio.play();
}
