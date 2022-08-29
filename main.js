
//ELEMENTS AND VARIABLES
/*Posición que separa a cada elemento y dimensiones del canvas*/
let elementSize;
let canvasSize;
let reCanvas;

/*Canvas*/
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
/*Player*/
const player = {
    x: null,
    y: null,
    lastX : null,
    lastY : null,
}
/*Elements Position*/
const giftPosition = {
    x : null,
    y : null,
}
const elementsPositions = {
    tree : [],
    bomb : [],
}
/*Level*/
let level = 0;
let lives = 5;
/*Time*/
let timeStart;
let clearTime;
/*Record*/
let record;
/*Buttons*/
let buttonStart = false;

const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnStart = document.getElementById('btnStart');
//HTML TEXT
let textLives = document.getElementById('lives');
let textTime = document.getElementById('time');
let textRecord = document.getElementById('record');
let textMessage = document.getElementById('mensaje');
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
/*Click in button start*/
btnStart.addEventListener('click', btnGameStart); 

//RENDERIZAR TAMAÑO DEL MAPA
function resizeCanvas(){

    if(canvasSize){
        reCanvas = canvasSize;
    }
    
    //Breakpoints para el canvas
    if(window.innerWidth >= 900){
        canvasSize = window.innerHeight * 0.75;   
    }
    else if(window.innerWidth >= 800 && window.innerWidth < 900){     
        canvasSize = window.innerWidth * 0.5;  
    }
    else if(window.innerWidth >= 600 && window.innerWidth < 800){     
        canvasSize = window.innerWidth * 0.6;  
    }
    else if(window.innerWidth >= 430 && window.innerWidth < 600){     
        canvasSize = window.innerWidth * 0.8;  
    }
    else if(window.innerWidth >= 320 && window.innerWidth < 430){     
        canvasSize = window.innerHeight * 0.5;  
    }
    else{
        canvasSize = window.innerWidth * 0.8;
    }
    //Se establece las medidas del canvas
    canvas.height = canvasSize;
    canvas.width = canvasSize;
    

    
   
    return  startGame();
}
//RENDERIZAR ELEMENTOS DENTRO DEL MAPA
function startGame(){
    showLives()
    
    game.textAlign = 'end';

    elementsPositions.tree.splice(0, elementsPositions.tree.length);
    if(!timeStart){
        textTime.innerText = '⏰: 0';
    }
    if(localStorage.getItem('gameRecord')){      
        textRecord.innerText = '🏆: '+localStorage.getItem('gameRecord');       
    }
    if(!(localStorage.getItem('gameRecord'))){
        localStorage.setItem('gameRecord', 0);
        textRecord.innerText = '🏆: '+localStorage.getItem('gameRecord');
    }
    let map = maps[level];
    //Niveles terminados
    if(!map){
        gameWin();
        return;
    }
    //Se acoondiciona el mapa a una matriz 10x10
    const mapRow = map.trim().split('\n'); 
    map = mapRow.map( row => row.trim().split(''));
    //Distancia por cada elemento del canvas
    elementSize = canvasSize/(map[0].length+0.1); 
    game.font = elementSize-5+'px Vernada';

    //renderizado de mapa
    game.clearRect(0, 0, canvasSize, canvasSize);
    
    //Renderizado de los objetos del mapa
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize*(colIndex+1.14);
            const posY = elementSize*(rowIndex+0.88);
            if(!(emojis[col] == emojis['B'])){
                game.fillText(emojis[col], posX, posY);
            }
            if(emojis[col] == emojis['B']){
                game.fillText(emojis[col], posX+5, posY);
            }
            if(player.x || player.y){
                if(player.x.toFixed(2) == (elementSize*(colIndex+1.14)).toFixed(2)){
                    player.lastX = colIndex;
                }
                if(player.y.toFixed(2) == (elementSize*(rowIndex+0.88)).toFixed(2)){
                    player.lastY = rowIndex;
                }
            }
            if(emojis[col]== emojis['O']){
                if(!player.x && !player.y){
                    player.x = posX;
                    player.y = posY; 
                    
                }
                game.fillText(emojis['S'], posX+4, posY); 
            }
            if(emojis[col]==emojis['I']){
                
                giftPosition.x = posX.toFixed(2);
                giftPosition.y = posY.toFixed(2);              
            }
            if(emojis[col]==emojis['X']){
                const treePosition = [];
                treePosition.push(posX.toFixed(2));
                treePosition.push(posY.toFixed(2));
                elementsPositions.tree.push(treePosition);       
            }
            if(emojis[col]==emojis['B']){
                const bombPosition = [];
                bombPosition.push(posX.toFixed(2));
                bombPosition.push(posY.toFixed(2));
                elementsPositions.bomb.push(bombPosition);       
            }
            
        });
    });
    movePlayer();
    /*  game.fillStyle = 'Gold'; */  
   /*  game.fillRect(0, 0, 50, 50); */
}
//JUEGO TERMINADO Y RECORD
function gameWin(){
    clearInterval(clearTime);
    showRecord();
    timeStart = null;
}
function showRecord(){
    
    record = ((Date.now()-timeStart)/1000).toFixed(1);
    if(record && !(parseInt(localStorage.getItem('gameRecord')))){  
         
        localStorage.setItem('gameRecord', record);
        textRecord.innerText = '🏆: '+localStorage.getItem('gameRecord');
        textMessage.innerText = 'Ganaste 😃 y tienes un nuevo record!!'
    }  
    else if(record<parseInt(localStorage.getItem('gameRecord'))){

        localStorage.setItem('gameRecord', record);
        textRecord.innerText ='🏆: '+localStorage.getItem('gameRecord');
        textMessage.innerText = 'Ganaste 😎 y has superado tu record!!'

    }
    else{
        textMessage.innerText = 'Lo lograste 😉 pero trata de superar tu record!!'
    }
}
//POSICIONAR JUGADOR Y VERIFICAR COLISIONES
function movePlayer(){
    
    //Colisión con regalo
    const gifColisionX = giftPosition.x == player.x.toFixed(2);
    const gifColisionY = giftPosition.y == player.y.toFixed(2);
    const giftColision = gifColisionX && gifColisionY;
    if(giftColision){
        game.fillText(emojis['PLAYER'], player.x+4, player.y);
        level++;
        player.x = null;
        player.y = null;
        startGame();
    }
    if(canvasSize > reCanvas || canvasSize < reCanvas){
    
        player.y = elementSize*(player.lastY+0.88);
        player.x = elementSize*(player.lastX+1.14);
        console.log(player.x, player.y);
        game.fillText(emojis['PLAYER'], player.x+4, player.y);      
    }
    else{
       
        //Renderizado de auto
        game.fillText(emojis['PLAYER'], player.x+4, player.y);
    }
    //Colisión con árboles
    elementsPositions.tree.forEach(row => {
        
        if(row[0] == player.x.toFixed(2) && row[1] == player.y.toFixed(2)){
            game.fillText(emojis['COLLISION'], player.x, player.y);
            console.log('crash tree');
            playerFail();
            
        }      
    });
    //Colisión con bombas
    elementsPositions.bomb.forEach(row => {
        if(row[0] == player.x.toFixed(2) && row[1] == player.y.toFixed(2)){
            game.fillText(emojis['COLLISION'], player.x, player.y);
            console.log('crash bomba');
            /* textMessage.innerText = 'Las bombas quitan 2 vidas!! 😝'; */
            playerFail();
            
        }      
    });
    return;   
}
function playerFail(){
    lives--;
    if(lives==0){
        
        clearInterval(clearTime);
        timeStart = null;
        textMessage.innerText = 'Has perdido 😫, vuelve a intentarlo'
        textLives.innerText = ': 0 ';   
        buttonStart = false;
        
    } 
    if(buttonStart){
        player.x = null;
        player.y = null;
        startGame();
    }   
}
//MOSTRAR VIDAS Y TIEMPO DE CRONÓMETRO
function showLives(){
   
    const liveArray = new Array(lives).fill(emojis['H']);
    textLives.innerText = liveArray.join(' ');
    
}
function showTime(){

    textTime.innerText = '⏰: '+(((Date.now()-timeStart)/1000).toFixed(1));

}
//BOTÓN START GAME
function btnGameStart(){
    if(!timeStart){
        console.log('puso a correr')
        timeStart = Date.now();
        clearTime = setInterval(showTime, 100);
        textTime.innerText = '⏰: 0';
    }
   /*  if(lives == 0){
        console.log('entro 0');
        timeStart = null;
    } */
    /* else{
        console.log('entro 1');
        timeStart = Date.now()
    } */
    level = 0;
    lives = 5;
    player.x = null;
    player.y = null;
    player.lastX = null;
    player.lastY = null;
    buttonStart = true;
    textMessage.innerText = 'Comienza la carrera!!'
    startGame();
}
//PRESIONAR TECLAS Y MOVER JUGADOR
function moveByKey(event){
    if(buttonStart){
        event.key==="ArrowUp" ? moveUp()
        :event.key==="ArrowDown" ? moveDown()
        :event.key==="ArrowRight" ? moveRight()
        :event.key==="ArrowLeft" ? moveLeft()
        :console.log("Tecla sin funciones de movimiento");
    }
}

function moveUp(){
    if(buttonStart){
        if(!(player.y < elementSize)){
            player.y-=elementSize;
            startGame();
        }  
    } 
}
function moveDown(){
    if(buttonStart){
        if(!(player.y > canvasSize-elementSize)){
            player.y+=elementSize;
            startGame();
        }
    }     
}
function moveLeft(){
    if(buttonStart){
        if(!(player.x < elementSize*2)){
        
            player.x-=elementSize;
            startGame();
        } 
    }   
}
function moveRight(){  
    if(buttonStart){
        if(!(player.x > canvasSize)){
        
            player.x+=elementSize;  
            startGame();
        }
    }   
}
