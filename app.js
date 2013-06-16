var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

//TODO: use redis instead
var clients = {};

server.listen(process.env.VCAP_APP_PORT || process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/rc', function (req, res) {
  res.sendfile(__dirname + '/rc.html');
});

io.sockets.on('connection', function(socket) {
  var conName;

  socket.on('connection name', function(name, callback){
    conName = name;
    clients[conName] = socket;
    callback();
  });

  socket.on('command', function(name, cmd){
    if (name in clients) {
      clients[name].emit(cmd);
    }
  });

  socket.on('disconnect', function(){
    if (conName in clients) {
      delete clients[conName];
    }
  });
});
