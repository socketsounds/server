# SocketSounds Server
A NodeJS adhoc sounds server. Receives 'play blah' messages from clients, and broadcasts them to all clients. The client is responsible for handling these messages.

Running
=======
`docker run -d -p 5000:5000 socketsounds/server` starts an instance on port 5000.
