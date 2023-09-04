const tuval = document.querySelector('#tuval')
const context = tuval.getContext('2d')
const width = tuval.clientWidth; //canvas genişliği
const height = tuval.clientHeight //canvas uzunluğu

const snakeWidth =15; //yılanın genişliği
const snakeHeigth = 15; //yılanın uzunluğu
let snakeX = 10  // yılanın yatay konumu
let snakeY = 10// yılanın dikey konumu
const location_ = 20 //  bulunduğu konumu
let eatX = 5 // eatin yatay konumu
let eatY = 5 //eatin dikey uzunluğu
const eatWidth =15
const eatHeight = 15
let directionX = 0; // Yılanın yatay hareket yönü
let directionY = 0; // Yılanın dikey hareket yönü
let yilanParçalari = []
let yilanuzunluğu = 3
let remainingHearts = 3; //kalp icon sayısı
const appleImage = new Image()
appleImage.src = '/images/apple.png'
const snakeImage = new Image()
snakeImage.src = '/images/head.jpg'
let point = 0;
const bodyImage = new Image()
bodyImage.src = '/images/pngegg.png'

let isSoundOn = false
const backgroundMusic = new Audio('/music/background.mp3');






class SnakePart{
 
  constructor(snakeX , snakeY){

    this.snakeX = snakeX
    this.snakeY = snakeY
  }

}



document.addEventListener('keydown' , moveSnake)


function clearToScreen(){

  context.fillStyle = "#2c786c"
  context.fillRect(0,0,width , height)
}

function snake(){
  context.drawImage(snakeImage , (snakeX * location_) , (snakeY * location_) , snakeWidth , snakeHeigth)



for (let i of yilanParçalari) {
  
  context.drawImage(bodyImage,(i.snakeX * location_), (i.snakeY * location_), snakeWidth, snakeHeigth);
}

yilanParçalari.push(new SnakePart(snakeX , snakeY))


   if(yilanuzunluğu > yilanParçalari.length){
     yilanParçalari.shift()
   }


context.drawImage(snakeImage , (snakeX * location_) , (snakeY * location_) , snakeWidth , snakeHeigth)

}

function eat(){
context.drawImage(appleImage , (eatX * location_ ) , (eatY * location_) , eatWidth , eatHeight ) 
}


function moveSnake(event){
  if (event) { 



if (event.keyCode === 38 && directionY !== 1) {
  directionX = 0; 
  directionY = -1;

  context.drawImage(snakeImage , (snakeX * location_) , (snakeY * location_) , snakeWidth , snakeHeigth)

} else if (event.keyCode === 40 && directionY !== -1) {
  
  directionX = 0;
  directionY = 1;


} else if (event.keyCode === 37 && directionX !== 1) {
  
  directionX = -1;
  directionY = 0;
} else if (event.keyCode === 39 && directionX !== -1) {
  
  directionX = 1;
  directionY = 0;
}
}

 

}


function game(){

  clearToScreen()
  snake()
  eat()
  moveSnake()

  snakeX += directionX;
  snakeY += directionY;

  moveControl()
  
  checkEat()
  
  


  setTimeout(game ,100)

}


game()


function moveControl(){

if (snakeY * location_ > height) {
  snakeY = 0;

}

else if (snakeY * location_ < 0) {
  snakeY = 19;
 
}
else if (snakeX * location_ < 0) {
  snakeX = 19;
  
}
else if (snakeX * location_ >  width) {
  snakeX = 0;
  
}
checkCollision()
}


function checkEat(){

if(snakeX === eatX && snakeY === eatY){


  eatX = Math.floor(Math.random() * location_)
  eatY = Math.floor(Math.random() * location_)

  yilanuzunluğu++
  yilanParçalari.push(new SnakePart(snakeX, snakeY));

  point++; 
  document.getElementById('puan').textContent = point;

  }
}

function checkCollision() {
  for (let i = 0; i < yilanParçalari.length; i++) {
    const parca = yilanParçalari[i];
    if (snakeX === parca.snakeX && snakeY === parca.snakeY) {
      
      healthControl()
    
      return; 
    }

  }
}



function healthControl() {

  if (remainingHearts > 0) {
    const heartId = 'health' + remainingHearts;
    const heartElement = document.getElementById(heartId);
    
    heartElement.style.color = "transparent"    
    remainingHearts--; 
  }
  else{
    document.getElementById('game-over').style.display ="block"
     document.getElementById('tuval').style.display ="none"
    document.getElementById('btn').style.display="none"


  }
}


function newGame(){
  location.reload();

}
function soundControl(){
  const volumeIcon = document.getElementById('volume-icon');
  if(isSoundOn === true){
      backgroundMusic.play();
      isSoundOn = false; 
      volumeIcon.className = 'fa-solid fa-volume-high'; 

   
  } else {
      backgroundMusic.pause();
      isSoundOn = true; 
      volumeIcon.className = 'fa-solid fa-volume-xmark'; 
  }
}

