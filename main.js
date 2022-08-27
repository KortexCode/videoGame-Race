
//ELEMENTS AND VARIABLES
/*Posición que separa a cada elemento y dimensiones del canvas*/
let elementSize;
let canvasSize;
/*Canvas*/
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
/*Player*/
const player = {
    x: null,
    y: null,
    crash : false,
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
let lives = 3;
/*Time*/
let timeStart;
let clearTime;
/*Record*/
let record;
/*Buttons*/
let buttonStart = true;
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
    elementSize = canvasSize/10.1; //10 elementos por cada linea del mapa
    game.font = elementSize-5+'px Vernada';
    game.textAlign = 'end';
    elementsPositions.tree.splice(0, elementsPositions.tree.length);

    if(localStorage.getItem('gameRecord')){      
        textRecord.innerText = '🏆: '+localStorage.getItem('gameRecord');       
    }
    if(!(localStorage.getItem('gameRecord'))){
        localStorage.setItem('gameRecord', 0);
        textRecord.innerText = '🏆: '+localStorage.getItem('gameRecord');
    }
    console.log(timeStart);
    if(!timeStart){
        console.log('entro!!');
        timeStart = Date.now();
        clearTime = setInterval(showTime, 100);
    }
 
    let map = maps[level];
    //Niveles terminados
    if(!map){
        gameWin();
        return;
    }
    //Se acoondiciona el mapa a una matrix 10x10
    const mapRow = map.trim().split('\n'); 
    map = mapRow.map( row => row.trim().split(''));
    //renderizado de mapa
    game.clearRect(0, 0, canvasSize, canvasSize);
    //Renderizado de los objetos del mapa
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const posX = elementSize*(colIndex+1.14);
            const posY = elementSize*(rowIndex+0.88);
            game.fillText(emojis[col], posX, posY);
            if(emojis[col]== emojis['O']){
                if(!player.x && !player.y){
                    player.x = posX;
                    player.y = posY; 
                    
                }
                game.fillText(emojis['S'], posX+4, posY); 
               
            }
            if(emojis[col]=='🎁'){
                
                giftPosition.x = posX.toFixed(2);
                giftPosition.y = posY.toFixed(2);              
            }
            if(emojis[col]=='🌲'){
                const treePosition = [];
                treePosition.push(posX.toFixed(2));
                treePosition.push(posY.toFixed(2));
                elementsPositions.tree.push(treePosition);       
            }
            
        });

    });
    movePlayer();
    /*  game.fillStyle = 'Gold'; */  
   /*  game.fillRect(0, 0, 50, 50); */
}
function gameWin(){
    clearInterval(clearTime);
    showRecord();
    lives = 0;
    console.log('Game Over');
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
        level++;
        console.log('Subiste de nivel!!');
        startGame();
    }
    //Renderizado de auto
    game.fillText(emojis['PLAYER'], player.x+4, player.y);

    //Colisión con árboles
    elementsPositions.tree.forEach(row => {
        if(row[0] == player.x.toFixed(2) && row[1] == player.y.toFixed(2)){
            game.fillText(emojis['COLLISION'], player.x, player.y);
            playerFail();
            
        }      
    });
    return;   
}
function playerFail(){
    lives--;
    if(lives==0){
        clearInterval(clearTime);
        textMessage.innerText = 'Has perdido 😫, vuelve a intentarlo'
        buttonStart = false;
    } 
    if(buttonStart){
        player.x = null;
        player.y = null;
        startGame();
    }   
}
function showLives(){
    const liveArray = new Array(lives).fill(emojis['H']);
    textLives.innerText = liveArray.join(' ');
}
function showTime(){

    textTime.innerText = '⏰: '+(((Date.now()-timeStart)/1000).toFixed(1));

}
function btnGameStart(){
    /* buttonStart = true; */
    console.log('presionado')
    if(lives == 0){
        timeStart = null;
    }
    else{
        timeStart = Date.now()
    }
    level = 0;
    lives = 3;
    player.x = null;
    player.y = null;
    buttonStart = true;
    textMessage.innerText = 'Comienza la carrera!!'
    startGame();
}

//PRESIONAR TECLAS Y MOVER JUGADOR
function moveByKey(event){
    if(buttonStart){

    }
    event.key==="ArrowUp" ? moveUp()
    :event.key==="ArrowDown" ? moveDown()
    :event.key==="ArrowRight" ? moveRight()
    :event.key==="ArrowLeft" ? moveLeft()
    :console.log("Tecla sin funciones de movimiento");
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
        
            let prueba = 43.95 + elementSize;
            player.x+=elementSize;  
            startGame();
        }
    }
    
}
