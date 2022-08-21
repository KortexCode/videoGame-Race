const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame(){
    game.fillRect(0, 0, 0, 5);
}