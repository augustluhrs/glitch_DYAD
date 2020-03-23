//open and connect the input socket
let socket = io("/input2");

//listen for the confirmation of connection
socket.on("connect", function() {
  console.log("connected to server");
});

let clickDebounce = 100;
let lastClick = 0;

// let xScale, yScale;
// let lastX, lastY;
let isFirstClick = true;
let r,g,b;
let backgroundButtCol, complementButtCol;
let socketCol, inverseCol;


//new variables
let pointTotal = 0;
let spawnButt, spawnCostText;
let canSpawn = false;
let canUpgradeSpeed = false;
let spawnCost = 10;

//upgrades
let speedSlider, speedButt;
let fertilitySlider, fertilityButt;
let reloadSlider, reloadButt;
let lifeSlider, lifeButt;
let speedTextLeft = "Faster";
let speedTextRight = "Slower";
let fertilityTextLeft = "Sterile";
let fertilityTextRight = "Fertile";
let reloadTextLeft = "short reload";
let reloadTextRight = "long reload";
let lifeTextLeft = "shorter life";
let lifeTextRight = "longer life";

let canvasContainer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = random(0, 255);
  g = random(0, 200);
  b = random(0, 255);
  socketCol = color(r, g, b);
  inverseCol = color(255-r, 255-g, 255-b);
  background(socketCol);
  // background(r, g, b);
  // backgroundButtCol = color(r, g, b, 100);
  // complementButtCol = color(255-r, 255-g, 255-b, 100);
  // console.log(backgroundButtCol);
  // console.log(complementButtCol);

  rectMode(CORNER);
  textSize(width/8);
  textAlign(CENTER);
  // ellipseMode(CENTER);
  // upgradeButt = createButton('     UPGRADE     ')
  //   .position(width/2, 5 * height/6)
  //   .mousePressed(()=>{
  //     socket.emit("upgrade");
  //     upgradeCounter = 0;
  //     upgradeButt.hide();
  //   });
  // xScale = 20/width;
  // yScale = 20/height;
  //upgrades
  speedSlider = createSlider(2, 40, 30, 1)
    .position(width/5, height/16);
  speedButt = createButton(speedSlider.value())
    .class("upgradeButton")
    // .parent("canvasContainer")
    .position(80/width*100, height/16)
    .mousePressed(()=>{
      //nothing yet
      let newSpeed = speedSlider.value();
      newSpeed--;
      speedSlider.value(newSpeed);
    });
  fertilitySlider = createSlider(0, 1, .2, .05)
    .position(width/5, 3*height/16);
  fertilityButt = createButton(fertilitySlider.value())
    .class("upgradeButton")
    // .parent("canvasContainer")
    .position(80/width*100, 3* height/16)
    .mousePressed(()=>{
      //nothing yet
      let newVal = fertilitySlider.value();
      newVal += .05;
      fertilitySlider.value(newVal);
    });  
  reloadSlider = createSlider(50, 1000, 800, 0)
    .position(width/5, 5*height/16);
  reloadButt = createButton(reloadSlider.value())
    .class("upgradeButton")
    // .parent("canvasContainer")
    .position(80/width*100, 5 * height/16)
    .mousePressed(()=>{
      //nothing yet
      let newVal = reloadSlider.value();
      newVal -= 25;
      reloadSlider.value(newVal);
    }); 
  lifeSlider = createSlider(100, 10000, 1000, 0)
    .position(width/5, 7 * height/16);
  lifeButt = createButton(lifeSlider.value())
    .class("upgradeButton")
    // .parent("canvasContainer")
    .position(80/width*100, 7 * height/16)
    .mousePressed(()=>{
      //nothing yet
      let newVal = lifeSlider.value();
      newVal += 100;
      lifeSlider.value(newVal);
    }); 
  //spawn button
  spawnButt = createButton('SPAWN NEW SPHERE')
    // .style('background-color', "#55FF55")
    .class("button")
    // .parent("canvasContainer")
    .position(32/width*100, 10 * height/16)
    .mousePressed(()=>{
      if(canSpawn){
        DefaultSpawn();
      }
    });
  // spawnButt.center("horizontal");
}

function draw() {
  background(r,g,b);
  //clicker field
  fill(255-r, 255-g, 255-b);
  rect(0, 3* height/4, width, 12* height/16);

  //point text
  fill(r,g,b);
  textSize(width/8);
  text(pointTotal, width/2, 14 * height / 16);


  //upgrade text and buttons
  fill(255);
  stroke(0);
  textSize(width/15);

  text(speedTextLeft, width/5, 2*height/16);
  text(speedTextRight, 3 *  width/5, 2*height/16);
  speedButt.html(speedSlider.value());

  text(fertilityTextLeft, width/5, 4 * height/16);
  text(fertilityTextRight, 3 *  width/5, 4 * height/16);
  fertilityButt.html(fertilitySlider.value());

  text(reloadTextLeft, width/5, 6 * height/16);
  text(reloadTextRight, 3 *  width/5, 6 * height/16);
  reloadButt.html(reloadSlider.value());

  text(lifeTextLeft, width/5, 8 * height/16);
  text(lifeTextRight, 3 *  width/5, 8 * height/16);
  lifeButt.html(lifeSlider.value());

  //spawn updates
  fill(255-r, 255-g, 255-b);
  textSize(width/15);
  // noStroke();
  text("Spawn: ", width/2, 9.5* height/16);
  spawnButt.html(spawnCost);
  // console.log(spawnButt);
  // console.log(spawnButt.style);

  if(pointTotal >= spawnCost){
    canSpawn=true;
    // spawnButt.style('background-color', "33FF33");
    // console.log('yes');
  }
  else{
    canSpawn = false;
    // spawnButt.style('background-color', "555555");
    // console.log('no');

  }
}

function mousePressed(){
  if (millis() - lastClick >= clickDebounce)
  {
    if (mouseY > 3 * height/4)
    {
      pointTotal++;
      lastClick = millis();
    }
  }
}

function DefaultSpawn()
{
  spawnData = {
    // x: width/2,
    // y: height/2,
    // width: width,
    // height: height,
    r: r,
    g: g,
    b: b,
    speed: speedSlider.value(),
    fertility: fertilitySlider.value(),
    reload: reloadSlider.value(),
    life: lifeSlider.value()
  }
  socket.emit("spawn2", spawnData);
  pointTotal -= spawnCost;
  spawnCost = Math.floor(1.1*spawnCost);
}

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