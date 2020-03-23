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


//clients
var inputs = io.of('/input');
inputs.on('connection', function(socket){
  console.log('new input client!: ' + socket.id);

  socket.on('spawn', function(spawnData){
    console.log(spawnData.x + " : " + spawnData.y);
    unity.emit('spawn', spawnData);
  });
  
  // socket.on('log', function(data){
  //   console.log("mX: " + data.mouseX + ", mY: " + data.mouseY);
  // });
//   //click
//   socket.on('click', function(){
//     console.log("click");
//     unity.emit('click');
//   });
  
//   //upgrade
//   socket.on('upgrade', function(){
//     console.log("upgrade");
//     unity.emit('upgrade');
//   });
  
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

//2p
var inputs2 = io.of('/input2');
inputs2.on('connection', function(socket){
  console.log('new 2p client!: ' + socket.id);

  socket.on('spawn2', function(spawnData){
    console.log("spawn 2" + spawnData.x + " : " + spawnData.y);
    unity.emit('spawn2', spawnData);
  });
  
  // socket.on('log', function(data){
  //   console.log("mX: " + data.mouseX + ", mY: " + data.mouseY);
  // });
//   //click
//   socket.on('click', function(){
//     console.log("click");
//     unity.emit('click');
//   });
  
//   //upgrade
//   socket.on('upgrade', function(){
//     console.log("upgrade");
//     unity.emit('upgrade');
//   });
  
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
