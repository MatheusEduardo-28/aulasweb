const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');


const FlappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            FlappyBird.spriteX, FlappyBird.spriteY,
            FlappyBird.largura, FlappyBird.altura,
            FlappyBird.x, FlappyBird.y,
            FlappyBird.largura, FlappyBird.altura,
        )
    }
}

function loop(){
    FlappyBird.desenha()
    requestAnimationFrame(loop);
}

loop();