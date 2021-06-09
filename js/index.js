//game constants
let direction = {x:0,y:0};
const foodsound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const sound = new Audio('music.mp3');
let speed = 8.7;
let lastPaintTime= 0 ;
let snakeArr = [
    {x:13,y:15}
]
let a = 2;
let b = 16;

let food = {x: Math.round(a+ (b-a)* Math.random()),y: Math.round(a+ (b-a)* Math.random())};
let score = 0;
//game functions
function main(ctime){
    window.requestAnimationFrame(main);
   if((ctime - lastPaintTime)/1000 <1/speed){
       return;
   }
   lastPaintTime = ctime;
   gameEngine();
}

function gameEngine(){
    // updating snake array & food 
    if(isCollide(snakeArr)){
        sound.pause();
        gameOver.currentTime = 0;
        gameOver.play();
        
        inputDir = {x:0,y:0};
        alert("Game Over , press any key to play again");
        snakeArr = [ {x: Math.round(a+ (b-a)* Math.random()),y: Math.round(a+ (b-a)* Math.random())}];
        food = {x: Math.round(a+ (b-a)* Math.random()),y: Math.round(a+ (b-a)* Math.random())};
        sound.currentTime = 0;
        sound.play();
        score = 0 ;
        document.getElementById("score").innerHTML = "Score: "+ score;
   }

    // if you have eaten the foood increment the score and regenerate the food 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
       foodsound.play();
       score +=1;
       if(score> hiscoreval){
           hiscoreval = score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        highscore.innerHTML = "High Score: "+ hiscoreval;
    }
       document.getElementById("score").innerHTML = "Score: "+ score;
        let a = 2;
        let b = 16;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y+ inputDir.y});
        food = {x: Math.round(a+ (b-a)* Math.random()),y: Math.round(a+ (b-a)* Math.random())};
    } 
    // Moving the snake 
    for(let i = snakeArr.length - 2;i>=0;i--){
  
      snakeArr[i+1] = {...snakeArr[i]};

      
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    // display the snake  
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart =e.x; 
        snakeElement.style.gridRowStart =e.y;
        snakeElement.classList.add('head');
        if(index === 0){
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement); 
    });
   // Display the food 

    foodElement = document.createElement('div');
    foodElement.style.gridColumnStart =food.x; 
    foodElement.style.gridRowStart =food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement); 

}


function isCollide(snake){
    for(let index = 1; index < snakeArr.length;index++){
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
        if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0){
            return true;
        }
}

//main logic starts 
sound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval =  JSON.parse(hiscore);
    highscore.innerHTML = "High Score: "+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
  inputDir = {x:0,y:1};
  moveSound.play();
  switch(e.key){
      case "ArrowUp":
             console.log("Up");
             inputDir.x = 0;
             inputDir.y = -1;
             break;
      case "ArrowLeft":
             console.log("Left");
             inputDir.x = -1;
             inputDir.y = 0;
             break;
      case "ArrowDown":
             console.log("Down");
             inputDir.x = 0;
             inputDir.y = 1;
             break;
      case "ArrowRight":
             console.log("Right");
             inputDir.x = 1;
             inputDir.y = 0;
             break;
  }
});