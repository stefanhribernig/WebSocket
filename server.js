var io = require('socket.io')(3001);

connections = [];

io.on('connect', function (ws) {
  connections.push(ws.id);
  io.emit('news', {users : connections.length+" users connected"});
  console.log('connected!');

  ws.on('message', function (message) {
    personName = message.name;
    console.log('Received: ' + message.data);
    io.emit('msg', {
      name: personName,
      data: message.data})
  });

  ws.on('disconnect', function(){
    connections.splice(connections.indexOf(ws.id),1);
    console.log("disconnected");
    io.emit('news', {users : connections.length+" users connected"});
  });
});
