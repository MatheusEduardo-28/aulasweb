0;
const sprites = new Image();
sprites.src = './sprites.png';
const som_punch = new Audio();
som_punch.src = './som.wav'

let animation_frame = 0;

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

    movimentos: [
        {spriteX: 0, spriteY: 0,}, //asa para cima
        {spriteX: 0, spriteY: 26,}, //asa no meio
        {spriteX: 0, spriteY: 52,}, //asa para baixo
        {spriteX: 0, spriteY: 26,}, //asa no meio
    ],

    gravidade:0.25,
    velocidade:0,
    
    atualiza(){
        if(fazColisao(flappyBird, chao)){
            som_punch.play();
            telaAtiva = TelaInicio;
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
        flappyBird.atualizaframe();
        },
        frameAtual: 0,
        atualizaframe(){
            if((animation_frame % 10) == 0){
                flappyBird.frameAtual = flappyBird.frameAtual + 1;
                flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
                flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
                flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
            }
        },
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
    spriteX: 0,
    spriteY: 613,
    largura: 223,
    altura: 109,
    x: 0,
    y: canvas.height - 110,
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x + chao.largura, chao.y,
                chao.largura, chao.altura,
                );
        },
        atualiza(){
            chao.x = chao.x - 1;
            chao.x = chao.x % (chao.largura/2);
        }
}

const PlanoDeFundo ={
    spriteX: 390.5,
    spriteY: 0,
    largura:275.5,
    altura: 206,
    x: 0,
    y: canvas.height - 206,
        desenha(){
            contexto.drawImage(
                sprites,
                PlanoDeFundo.spriteX, PlanoDeFundo.spriteY,
                PlanoDeFundo.largura, PlanoDeFundo.altura,
                PlanoDeFundo.x, PlanoDeFundo.y,
                PlanoDeFundo.largura, PlanoDeFundo.altura,
            );
            contexto.drawImage(
                sprites,
                PlanoDeFundo.spriteX, PlanoDeFundo.spriteY,
                PlanoDeFundo.largura, PlanoDeFundo.altura,
                PlanoDeFundo.x + PlanoDeFundo.largura, PlanoDeFundo.y,
                PlanoDeFundo.largura, PlanoDeFundo.altura,
            );
            contexto.drawImage(
                sprites,
                PlanoDeFundo.spriteX, PlanoDeFundo.spriteY,
                PlanoDeFundo.largura, PlanoDeFundo.altura,
                PlanoDeFundo.x + PlanoDeFundo.largura * 2, PlanoDeFundo.y,
                PlanoDeFundo.largura, PlanoDeFundo.altura,
            );
        },
        atualiza(){
            PlanoDeFundo.x = PlanoDeFundo.x - 0.4;
            if(PlanoDeFundo.x == -PlanoDeFundo.largura){
                PlanoDeFundo.x = 0
            }
        }
    }//

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

const ceu = {
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.clientWidth, canvas.height)
    }
}
const TelaInicio ={
    desenha(){
        ceu.desenha();
        PlanoDeFundo.desenha();
        chao.desenha();
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
        PlanoDeFundo.atualiza();
        chao.desenha();
        chao.atualiza();
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
    animation_frame = animation_frame + 1;
}
function mudaTelaAtiva(){
    TelaInicio.click();
}
window.addEventListener("click", mudaTelaAtiva)
loop();
