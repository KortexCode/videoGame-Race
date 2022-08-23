
//ELEMENTS
/*Canvas*/
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
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
    let canvasSize;
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
    return  startGame(canvasSize);
}

function startGame(canvasSize){
    
    let elementSize;
    elementSize = canvasSize/10.1; //10 elementos por cada mapa
    game.font = elementSize-5+'px Vernada';
    game.textAlign = 'end';
    //Se acoondiciona el mapa a una matrix 10x10
    let map = maps[0];
    const mapRow = map.trim().split('\n'); 
    map = mapRow.map( row => row.trim().split(''));
    //Renderizado del mapa
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize*(colIndex+1);
            const posY = elementSize*(rowIndex+0.88);
            game.fillText(emojis[col], posX, posY);
        });
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
}
function moveDown(){
    console.log('mover abajo');
}
function moveLeft(){
    console.log('mover izquierda')
}
function moveRight(){
    console.log('mover derecha')
}