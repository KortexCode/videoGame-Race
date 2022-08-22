
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

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
    let map = maps[2];
    const mapRow = map.trim().split('\n'); 
    map = mapRow.map( row => row.trim().split(''));
    console.log(map);
    
    elementSize = canvasSize/10;
   
    game.font = elementSize-5+'px Vernada';
    game.textAlign = 'end';

    console.log(map[0][2]);

    for(let i = 1; i <= 10; i++){
        for (let j = 1; j <= 10; j++) {
           
            game.fillText(emojis[map[i-1][j-1]], (elementSize)*j, (elementSize)*(i-0.18));
            
        }
        
    }
    /*  game.fillStyle = 'Gold'; */
    
   /*  game.fillRect(0, 0, 50, 50); */
}
