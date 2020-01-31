document.querySelector('#start-button').onclick = function() { //Start button is clicked 
  this.remove()  //removes start button
  startGame() //calls startGame
}

document.onclick = function(e){ //
  console.log(e.x, e.y)
}

const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element
canvas.width = 1000; //Set canvas width and height
canvas.height = 500
const ctx = canvas.getContext('2d'); //Get the context 

function startGame(){  
  console.log("START") 
  img.onload = function() {  //Load the car for the first time 
    ctx.drawImage(img, car.x, car.y, car.width, car.height); 
  }
  img.src = "./images/car.png";
  
  startLines()
  startObstacles()
  window.requestAnimationFrame(animate) //Starts the animation infinite loop
}

function drawBoard() {
  ctx.fillStyle = 'green'
  ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass
  ctx.fillStyle = 'grey'
  ctx.fillRect(100,0,canvas.width-200, canvas.height) //draws the road
  ctx.fillStyle = 'white'
  ctx.fillRect(100,0,7, canvas.height)
  ctx.fillStyle = 'white'
  ctx.fillRect(canvas.width-108,0,7, canvas.width)
}

let lines = [] // Collection of lines
let obstacles = [] // Collection of obstacles

function startLines() {
  setInterval(() => {
    let line = { // Create new line object
      x: canvas.width/2 -5,
      y:0,
      width: 10,
      height: 20,
      color: "#"+((1<<24)*Math.random()|0).toString(16)
    }
    lines.push(line)
    // obstacles.push(obstacle)
  }, 500);
}

function startObstacles() {
  setInterval(() => {
    let obstacle = { // Create new obstacle object
      x: Math.random() * canvas.width,
      y: 0,
      width: Math.random() * 300 + 50,
      height: 40,
      direction: Math.random() >= 0.5
    }
    obstacles.push(obstacle)
  }, 1000);
}

function drawLine() {
  ctx.fillStyle = 'white';
  lines.forEach((line)=> {
    ctx.fillStyle = line.color;
    ctx.fillRect(line.x, line.y++, line.width, line.height);
  })
}

function drawObstacle() {
  ctx.fillStyle = 'red';
  obstacles.forEach((obs) => {
    if(obs.direction){
    ctx.fillRect(obs.x++, obs.y+=3, obs.width, obs.height)
    }
    else {
    ctx.fillRect(obs.x--, obs.y+=3, obs.width, obs.height)
   }
  })
}

let car = {  //Car object - also can be converted to a Class 
  x:canvas.width/2-25,
  y:canvas.height/2,
  width: 50,
  height: 80
}


function drawCar() {
  ctx.drawImage(img, car.x, car.y, car.width, car.height); //draws the car depending on the coords in the obj above 
}

document.onkeydown = function(e) { //controls -- up down left and right ... 
  switch (e.keyCode) { //changes the car object 
    case 38: if(car.y >= 10) {car.y-=20}; console.log('up',); break;
    case 40: if(car.y <= canvas.height - car.height - 10) {car.y+=20};  console.log('down',); break;
    case 37: if(car.x >= 10)  {car.x-=20};  console.log('left',); break;
    case 39: if(car.x <= canvas.width - car.width - 10) {car.x+=20}; console.log('right'); break;
  }
}


function collision() {
  obstacles.forEach((obs) => {
      if (obs.x < car.x + car.width &&
        obs.x + obs.width > car.x &&
        obs.y < car.y + car.height &&
        obs.y + obs.height > car.y) {
         // collision detected!
         console.log('game over')
       }
  })
}

function animate(){
  let loop = window.requestAnimationFrame(animate) //continues the loop
  ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
  drawBoard()  //redraws the board over and over and over again
  drawLine() // draws the line
  drawCar()   //redraws the car over and over and over again
  drawObstacle() // draws the obstacle
  collision()
}

