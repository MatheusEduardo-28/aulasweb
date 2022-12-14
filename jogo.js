0;
const sprites = new Image();
sprites.src = './sprites.png';
const som_punch = new Audio();
som_punch.src = './punch.wav'

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula(){
        flappyBird.velocidade = - flappyBird.pulo;
    },

    desenha(){
    contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    },
    gravidade:0.25,
    velocidade:0,
    
    atualiza(){
        if(fazColisao(flappyBird, chao, chao2)){
            som_punch.play();
            telaAtiva = TelaInicio;
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    }
}

function fazColisao(){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY){
        return true;
    }

    return false;
}

const chao ={
    spriteX: 1,
    spriteY: 613,
    largura: 227,
    altura: 109,
    x: 0,
    y: canvas.height - 109,
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
        }
}

const chao2 ={
    spriteX: 0,
    spriteY: 613,
    largura: 227,
    altura: 109,
    x: 100,
    y: canvas.height - 109,
        desenha(){
            contexto.drawImage(
                sprites,
                chao2.spriteX, chao2.spriteY,
                chao2.largura, chao2.altura,
                chao2.x, chao2.y,
                chao2.largura, chao2.altura,
            );
        }
}

const PlanoDeFundo ={
    spriteX: 390,
    spriteY: 0,
    largura:300,
    altura: 206,
    x: 0,
    y: canvas.height - 227,
        desenha(){
            contexto.drawImage(
                sprites,
                PlanoDeFundo.spriteX, PlanoDeFundo.spriteY,
                PlanoDeFundo.largura, PlanoDeFundo.altura,
                PlanoDeFundo.x, PlanoDeFundo.y,
                PlanoDeFundo.largura, PlanoDeFundo.altura,
            );
        }

}

const PlanoDeFundo2 ={
    spriteX: 390,
    spriteY: 0,
    largura:300,
    altura: 206,
    x: 50,
    y: canvas.height - 227,
        desenha(){
            contexto.drawImage(
                sprites,
                PlanoDeFundo2.spriteX, PlanoDeFundo2.spriteY,
                PlanoDeFundo2.largura, PlanoDeFundo2.altura,
                PlanoDeFundo2.x, PlanoDeFundo2.y,
                PlanoDeFundo2.largura, PlanoDeFundo2.altura,
            );
        }
}
const telainicial ={
    spriteX: 130,
    spriteY: 0,
    largura:188,
    altura: 152,
    x: 70,
    y: 70,
        desenha(){
            contexto.drawImage(
                sprites,
                telainicial.spriteX, telainicial.spriteY,
                telainicial.largura, telainicial.altura,
                telainicial.x, telainicial.y,
                telainicial.largura, telainicial.altura,
            );
        }
}

const ceu={
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.clientWidth, canvas.height)
    }
}
const TelaInicio ={
    desenha(){
        ceu.desenha();
        PlanoDeFundo.desenha();
        PlanoDeFundo2.desenha();
        chao.desenha();
        chao2.desenha();
        flappyBird.desenha();
        telainicial.desenha();
    },
    click(){
        telaAtiva = TelaJogo;
        flappyBird.pula();
    }
}

const TelaJogo ={
    desenha(){
        ceu.desenha();
        PlanoDeFundo.desenha();
        PlanoDeFundo2.desenha();
        chao.desenha();
        chao2.desenha();
        flappyBird.desenha();
        flappyBird.atualiza();
    },
    click(){
        flappyBird.pula();
    }
}
var telaAtiva = TelaInicio
function loop(){
    telaAtiva.desenha();
    requestAnimationFrame(loop);
}
function mudaTelaAtiva(){
    TelaInicio.click();
}
window.addEventListener("click", mudaTelaAtiva)
loop();
