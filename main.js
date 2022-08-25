
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
/*Elements Position*/
const giftPosition = {
    x : null,
    y : null,
}

const elementsPositions = {
    tree : [],
    bomb : [],
    AllPositioned : false,
}




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

//RENDERIZAR TAMAÑO DEL MAPA
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
//RENDERIZAR ELEMENTOS DENTRO DEL MAPA
function startGame(){
   
    elementSize = canvasSize/10.1; //10 elementos por cada linea del mapa
    game.font = elementSize-5+'px Vernada';
    game.textAlign = 'end';
    //Se acoondiciona el mapa a una matrix 10x10
    let map = maps[2];
    const mapRow = map.trim().split('\n'); 
    map = mapRow.map( row => row.trim().split(''));
    //set renderizado
    game.clearRect(0, 0, canvasSize, canvasSize);
    //Renderizado del mapa
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize*(colIndex+1.14);
            const posY = elementSize*(rowIndex+0.88);
            game.fillText(emojis[col], posX, posY);
            if(emojis[col]=='🚧'){
                if(!player.x && !player.y){
                    player.x = posX;
                    player.y = posY;  
                }
            }
            if(emojis[col]=='🎁'){
                
                giftPosition.x = posX.toFixed(2);
                giftPosition.y = posY.toFixed(2);              
            }
            if(emojis[col]=='🌲'){
                const treePosition = [];
                treePosition.push(posX.toFixed(2));
                treePosition.push(posY.toFixed(2));
                if (!elementsPositions.AllPositioned){
                    elementsPositions.tree.push(treePosition);   
                }
            }
            
        });

    });
    
    elementsPositions.AllPositioned = true;
    movePlayer();
    

 /*    for(let i = 1; i <= 10; i++){
        for (let j = 1; j <= 10; j++) {
           
            game.fillText(emojis[map[i-1][j-1]], (elementSize)*j, (elementSize)*(i-0.18)); 
        }    
    } */
    /*  game.fillStyle = 'Gold'; */
    
   /*  game.fillRect(0, 0, 50, 50); */
}
console.log(elementsPositions.tree)
//POSICIONAR JUGADOR Y VERIFICAR COLISIONES
function movePlayer(){
    //Colisión con regalo
    const gifColisionX = giftPosition.x == player.x.toFixed(2);
    const gifColisionY = giftPosition.y == player.y.toFixed(2);
    const giftColision = gifColisionX && gifColisionY;
    if(giftColision){
        
        console.log('subiste de nivel');
    }
    //Renderizado de auto
    game.fillText(emojis['PLAYER'], player.x+4, player.y);

    //Colisión con árboles
    elementsPositions.tree.forEach(row => {
        if(row[0] == player.x.toFixed(2) && row[1] == player.y.toFixed(2)){
            game.fillText(emojis['COLLISION'], player.x, player.y);
        }    
    });
}

//PRESIONAR TECLAS Y MOVER JUGADOR
function moveByKey(event){
    
    event.key==="ArrowUp" ? moveUp()
    :event.key==="ArrowDown" ? moveDown()
    :event.key==="ArrowRight" ? moveRight()
    :event.key==="ArrowLeft" ? moveLeft()
    :console.log("Tecla sin funciones de movimiento");
}

function moveUp(){
    
    if(!(player.y < elementSize)){
        console.log('mover arriba');
       /*  game.fillText(emojis['PLAYER'], player.x, player.y-=(elementSize)); */
       player.y-=elementSize;
        startGame();
    }
   
}
function moveDown(){
        
    if(!(player.y > canvasSize-elementSize)){
        console.log('mover abajo');
      /*   game.fillText(emojis['PLAYER'], player.x, player.y+=(elementSize)); */
        player.y+=elementSize;
        startGame();
    }
}
function moveLeft(){
    
    if(!(player.x < elementSize*2)){
        console.log('mover izquierda');
        /* game.fillText(emojis['PLAYER'], player.x-=(elementSize), player.y); */

        player.x-=elementSize;
        startGame();
    }
}
function moveRight(){
  
    if(!(player.x > canvasSize)){
        console.log('mover derecha');
      
        let prueba = 43.95 + elementSize;
        /* game.fillText(emojis['PLAYER'], player.x+=(elementSize), player.y); */
        player.x+=elementSize;
        
        startGame();
    }
}