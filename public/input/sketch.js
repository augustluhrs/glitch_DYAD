//open and connect the input socket
let socket = io("/input");

//listen for the confirmation of connection
socket.on("connect", function() {
  console.log("connected to server");
});

//leftover variables
let clickDebounce = 50;
let lastClick = 0;
let isFirstClick = true;

//buttons
let dropButt, typeButt, colorButt, rotateButt, scaleButt, moveButt;
let playerNum = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 81, 186); //IKEA BLUE

  socket.emit("player");
  socket.on("get player", function(_player){
    playerNum = _player.player;
  });

  //set up buttons
  dropButt = createButton('SLAPPA')
    .position(width/4, height/7)
    .class("button")
    .mousePressed(()=>{
      if (millis() - lastClick >= clickDebounce && !isFirstClick){
        socket.emit("drop", {player: playerNum});
        lastClick = millis();
        isFirstClick = true;
        return;
      }
      isFirstClick = false;
    });
  typeButt = createButton('BESKRIVNING')
    .position(width/4, 2*height/7)
    .class("button")
    .mousePressed(()=>{
      if (millis() - lastClick >= clickDebounce && !isFirstClick){
        socket.emit("type", {player: playerNum});
        console.log(playerNum);
        lastClick = millis();
        isFirstClick = true;
        return;
      }
      isFirstClick = false;
    });
  colorButt = createButton('FARG')
    .position(width/4, 3*height/7)
    .class("button")
    .mousePressed(()=>{
      if (millis() - lastClick >= clickDebounce && !isFirstClick){
        socket.emit("color", {player: playerNum});
        console.log(playerNum);
        lastClick = millis();
        isFirstClick = true;
        return;
      }
      isFirstClick = false;
    });
  rotateButt = createButton('VINKEL')
    .position(width/4, 4*height/7)
    .class("button")
    .mousePressed(()=>{
      if (millis() - lastClick >= clickDebounce && !isFirstClick){
        socket.emit("rotate", {player: playerNum});
        lastClick = millis();
        isFirstClick = true;
        return;
      }
      isFirstClick = false;
    });
  scaleButt = createButton('SKALLA')
    .position(width/4, 5*height/7)
    .class("button")
    .mousePressed(()=>{
      if (millis() - lastClick >= clickDebounce && !isFirstClick){
        socket.emit("scale", {player: playerNum});
        lastClick = millis();
        isFirstClick = true;
        return;
      }
      isFirstClick = false;
    });
  moveButt = createButton('PLATS')
    .position(width/4, 6*height/7)
    .class("button")
    .mousePressed(()=>{
      if (millis() - lastClick >= clickDebounce && !isFirstClick){
        socket.emit("move", {player: playerNum});
        lastClick = millis();
        isFirstClick = true;
        return;
      }
      isFirstClick = false;
    });
}

// if (millis() - lastClick >= clickDebounce && !isFirstClick)
//   {lastClick = millis();
//     isFirstClick = true;
//     return;
//   }
//   isFirstClick = false;
function draw() {
}

// function mousePressed(){
//   if (millis() - lastClick >= clickDebounce)
//   {
//     if (mouseY > 3 * height/4)
//     {
//       pointTotal++;
//       lastClick = millis();
//     }
    
//   }
// }

/*
function mousePressed(){
  fill(255-r, 255-g, 255-b);
  ellipse(mouseX, mouseY, 20, 20);
  socket.emit("log", {mouseX: mouseX, mouseY: mouseY});
  if (millis() - lastClick >= clickDebounce && !isFirstClick)
  {
    spawnData = {
      // x: map(mouseX * xScale, 0, 20, 10, -10), //flipped because reasons
      // y: map(mouseY * yScale, 0, 20, -10, 10),
      x: mouseX,
      y: mouseY,
      width: width,
      height: height,
      r: r,
      g: g,
      b: b
    }
    socket.emit("spawn", spawnData);
    lastClick = millis();
    isFirstClick = true;
    return;
  }
  isFirstClick = false;
}
*/