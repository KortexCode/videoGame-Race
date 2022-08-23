
//ELEMENTS
/*Posición que separa a cada elemento*/
let elementSize;
let canvasSize;
/*Canvas*/
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
/*Player*/
const player = {x: null,
                y: null,}
/*Buttons*/
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');


//EVENTS
/*Load and Reload */
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);
/*Keys */
document.addEventListener('keydown', moveByKey);
/*Clicks*/
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function resizeCanvas(){
    //Breakpoints para el canvas
    if(window.innerWidth > 900){
        canvasSize = window.innerHeight * 0.8;   
    }
    else if(window.innerWidth > 600 && window.innerWidth < 900){     
        canvasSize = window.innerWidth * 0.6;  
    }
    else{
        canvasSize = window.innerWidth * 0.7;
    }
    //Se establece las medidas del canvas
    canvas.height = canvasSize;
    canvas.width = canvasSize;
    return  startGame();
}

function startGame(){

    elementSize = canvasSize/10.1; //10 elementos por cada mapa
    game.font = elementSize-5+'px Vernada';
    game.textAlign = 'end';
    //Se acoondiciona el mapa a una matrix 10x10
    let map = maps[1];
    const mapRow = map.trim().split('\n'); 
    map = mapRow.map( row => row.trim().split(''));
    //set renderizado
    game.clearRect(0, 0, canvasSize, canvasSize);
    //Renderizado del mapa
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize*(colIndex+1.15);
            const posY = elementSize*(rowIndex+0.88);
            game.fillText(emojis[col], posX, posY);
            if(emojis[col]=='🚧'){
                if(!player.x && !player.y){
                    player.x = posX;
                    player.y = posY;
                    console.log('playerx', player.x);
                    console.log('playery', player.y);
                    
                }
            }
        });
        game.fillText(emojis['PLAYER'], player.x, player.y);
    });

 /*    for(let i = 1; i <= 10; i++){
        for (let j = 1; j <= 10; j++) {
           
            game.fillText(emojis[map[i-1][j-1]], (elementSize)*j, (elementSize)*(i-0.18));
            
        }
        
    } */
    /*  game.fillStyle = 'Gold'; */
    
   /*  game.fillRect(0, 0, 50, 50); */
}

//MOVER JUGADOR
function moveByKey(event){
    
    event.key==="ArrowUp" ? moveUp()
    :event.key==="ArrowDown" ? moveDown()
    :event.key==="ArrowRight" ? moveRight()
    :event.key==="ArrowLeft" ? moveLeft()
    :console.log("Tecla sin funciones de movimiento");
}

function moveUp(){
    console.log('mover arriba');
    if(!(player.y < elementSize)){
        game.fillText(emojis['PLAYER'], player.x, player.y-=(elementSize));
        startGame();
    }
   
}
function moveDown(){
    console.log('mover abajo');
    
    if(!(player.y > canvasSize-elementSize)){
        game.fillText(emojis['PLAYER'], player.x, player.y+=(elementSize));
        startGame();
    }
}
function moveLeft(){
    console.log('mover izquierda')

    if(!(player.x < elementSize*2)){
        game.fillText(emojis['PLAYER'], player.x-=(elementSize), player.y);
        console.log(player.x);
        startGame();
    }
}
function moveRight(){
    console.log('mover derecha')
    
    if(!(player.x > canvasSize)){
        game.fillText(emojis['PLAYER'], player.x+=(elementSize), player.y);
        startGame();
    }
}