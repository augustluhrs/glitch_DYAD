// init project
let port = process.env.PORT || 8000;
const express = require("express");
const app = express();
let server = require('http').createServer(app).listen(port, function() {
  console.log('Server listening at port: ', port);
});

app.use(express.static("public")); 

let io = require('socket.io').listen(server);

//unity
var unity = io.of('/');
unity.on('connection', function(socket){
  console.log('unity connected');
});

let players = 2;
//clients 
//so for now, both clients can use the same url
var inputs = io.of('/input');
inputs.on('connection', function(socket){  
  console.log("players count = " + players);
  console.log('new input client!: ' + socket.id);
  socket.on('player', function(){
    //hacky fix to get 2p to work
    if (players == 1){
      players = 2;
    }
    else if (players == 2)
    {
      players = 1;
    }
    socket.emit('get player', {player: players});
  });
  socket.on('drop', function(_player){
    let p = _player.player
    // console.log(p);
    console.log("player " + p + ": slappa/drop");
    unity.emit('drop', _player);
  });
  socket.on('type', function(player){
    console.log("player " + player + ": beskrivning/type");
    unity.emit('type', player);
  });
  socket.on('rotate', function(player){
    console.log("player " + player + ": vinkel/rotate");
    unity.emit('rotate', player);
  });
  socket.on('scale', function(player){
    console.log("player " + player + ": skalla/scale");
    unity.emit('scale', player);
  });
  socket.on('move', function(player){
    console.log("player " + player + ": plats/move");
    unity.emit('move', player);
  });
  
  socket.on('disconnect', function(){
    console.log('disconnected: ' + socket.id);
    // players--;
    // unity.emit('clientDisconnect', {id: socket.id});
    // console.log('disconnect' + client_arrays[0].id);
    // for (let i = client_arrays.length - 1; i >= 0 ; i--){
    //   if (client_arrays[i].id == socket.id){
    //     client_arrays.splice(i, 1);
    //   }
    // }
  });
});

//2p
/*
var inputs2 = io.of('/input2');
inputs2.on('connection', function(socket){
  console.log('new 2p client!: ' + socket.id);

  socket.on('spawn2', function(spawnData){
    console.log("spawn 2" + spawnData.x + " : " + spawnData.y);
    unity.emit('spawn2', spawnData);
  });
  
  socket.on('disconnect', function(){
    console.log('disconnected: ' + socket.id);
    // unity.emit('clientDisconnect', {id: socket.id});
    // console.log('disconnect' + client_arrays[0].id);
    // for (let i = client_arrays.length - 1; i >= 0 ; i--){
    //   if (client_arrays[i].id == socket.id){
    //     client_arrays.splice(i, 1);
    //   }
    // }
  });
});
*/
