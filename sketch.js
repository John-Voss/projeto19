var fundo1, fundo_image1, fundo2, fundo_image2, fundo3, fundo_image3, solo_invis, solo_invis2;
var jogador1, jogador_image1, jogador1_ataque, jogador2, jogador_image2, jogador2_ataque, jogador3, jogador_image3, jogador3_ataque, inimigo, inimigo_image, inimigo2, inimigo2_image, inimigo3, inimigo3_image;
var etapaJogo = 'INICIO';
var pontuacao = 0, pontuacao2 = 0;
var flecha, flecha_image, tiro, tiro_image;
var opcao1, opcao2, opcao3, opcao1_image, opcao2_image, opcao3_image;
var grupoInimigo, grupoInimigo2, grupoInimigo3, grupoFlecha, grupoTiro;

function preload(){
  fundo_image1 = loadImage('fundo_space.png');
  fundo_image2 = loadImage('fundo2.png');
  fundo_image3 = loadImage('fundo3.png');
  jogador_image1 = loadAnimation('caminhada2-2.png', 'caminhada1-1.png');
  jogador1_ataque = loadImage('opcao1.png');
  flecha_image = loadImage('aram1.png');
  jogador_image2 = loadAnimation('caminhada3.png', 'caminhada4.png');
  jogador2_ataque = loadImage('opcao2.png');
  tiro_image = loadImage('arma2.png');
  jogador_image3 = loadAnimation('caminhada5.png', 'caminhada6.png');
  jogador3_ataque = loadImage('ataque3.png');
  opcao1_image = loadImage('opcao1.png');
  opcao2_image = loadImage('opcao2.png');
  opcao3_image = loadImage('opcao3.png');
  inimigo_image = loadAnimation('inimigo.png', 'inimigo2-2.png');
  inimigo2_image = loadImage('inimigo2-1.png');
  inimigo3_image = loadImage('inimigo3-1.png');
}

function setup() {
 createCanvas(windowWidth, windowHeight);
  fundo1 = createSprite(width/2, height/2, 20, 20);
  fundo1.addImage('fundo1_img', fundo_image1);
  fundo1.visible = false;
  fundo1.scale = 2;
  fundo2 = createSprite(width/2, height/2, 20, 20);
  fundo2.addImage('fundo2_img', fundo_image2);
  fundo2.visible = false;
  fundo2.scale = 2;
  fundo3 = createSprite(width/2, height/2, 20, 20);
  fundo3.addImage('fundo3_img', fundo_image3);
  fundo3.visible = false;
  fundo3.scale = 2;
  solo_invis = createSprite(width - 1200 , height - 20, 800, 10);
  solo_invis.visible = false;
  solo_invis2 = createSprite(width - 1200, height  - 180, 800, 10);
  solo_invis2.visible = false;
  jogador1 = createSprite(width - 1200, height - 100, 20, 50);
  jogador1.addAnimation('player_img', jogador_image1);
  jogador1.addImage('player_ataque', jogador1_ataque);
  jogador1.visible = false;
  jogador2 = createSprite(width - 1200, height - 100, 20, 50);
  jogador2.addAnimation('player2_img', jogador_image2);
  jogador2.addImage('player_ataque2', jogador2_ataque);
  jogador2.scale = 1.5;
  jogador2.visible = false;
  jogador2.setCollider('circle', 5, 5, 25);
  jogador3 = createSprite(width - 1200, height - 200, 20, 50);
  jogador3.addAnimation('player_img3', jogador_image3);
  jogador3.addImage('player_ataque3', jogador3_ataque);
  jogador3.visible  = false;
  jogador3.scale = 0.8;
  opcao1 = createSprite(width/2 - 150, height/2, 100, 100);
  opcao1.addImage('opcao1_img', opcao1_image);
  opcao2 = createSprite(width/2, height/2, 100, 100);
  opcao2.addImage('opcao2_img', opcao2_image);
  opcao2.scale = 2;
  opcao3 = createSprite(width/2 + 150, height/2, 100, 100);
  opcao3.addImage('opcao3_img', opcao3_image);
  
  grupoInimigo = new Group();
  grupoInimigo2 = new Group();
  grupoInimigo3 = new Group();
  grupoFlecha = new Group();
  grupoTiro = new Group();
}

function draw() {
 background('darkblue');
  jogador1.collide(solo_invis);
  jogador2.collide(solo_invis);
  
  if(etapaJogo === 'INICIO') {
    fill('orange');
    textSize(20);
    stroke('orange');
    text('Escolha qual modo quer jogar:', width/2 - 150, height/2 - 200);
    jogador3.collide(solo_invis2);
    if(mousePressedOver(opcao1)) {
      etapaJogo = 'JOGAR1';
    }
    if(mousePressedOver(opcao2)) {
      etapaJogo = 'JOGAR2';
    }
    if(mousePressedOver(opcao3)) {
      etapaJogo = 'JOGAR3';
    }
  }
  if(etapaJogo === 'JOGAR1') {
    fundo1.velocityX = -(3 + (pontuacao% 150 === 0));
    if(fundo1.x < width/3 + 50) {
      fundo1.x = width/2;
    }
    fundo1.visible = true;
    inimigos();
    jogador1.visible = true;
    opcao1.visible = false;
    opcao2.visible = false;
    opcao3.visible = false;
    if(keyWentUp('enter')) {
      jogador1.changeAnimation('player_img', jogador_image1);
    }
    if(keyWentDown('enter') && jogador1.y > height - 150) {
      jogador1.changeAnimation('player_ataque',jogador1_ataque);
      flechas();
      jogador1.velocityY = -10;
    }
    if(grupoInimigo.isTouching(grupoFlecha)) {
      pontuacao += 150;
      grupoFlecha.destroyEach();
      grupoInimigo.destroyEach();
    }
    if(jogador1.isTouching(grupoInimigo)) {
      etapaJogo = 'ENCERRAR';
    }
  }
  if(etapaJogo === 'JOGAR2') {
    fundo2.velocityX = -(3 + (pontuacao% 300 === 0));
    if(fundo2.x < width/3 + 50) {
      fundo2.x = width/2;
    }
    inimigos2();
    fundo2.visible = true;
    jogador2.visible = true;
    opcao1.visible = false;
    opcao2.visible = false;
    opcao3.visible = false;
    if(keyWentUp('enter')) {
      jogador2.changeAnimation('player2_img', jogador_image2);
    }
    if(keyWentDown('enter') && jogador2.y > height - 100) {
      jogador2.changeAnimation('player_ataque2', jogador2_ataque);
      tiros();
      jogador2.velocityY = -10;
    }
    if(grupoInimigo2.isTouching(grupoTiro)) {
      grupoTiro.destroyEach();
      grupoInimigo2.destroyEach();
      pontuacao += 300;
    }
    if(jogador2.isTouching(grupoInimigo2)) {
      etapaJogo = 'ENCERRAR';
    }
  }
  if(etapaJogo === 'JOGAR3') {
    fundo3.visible = true;
    fundo3.velocityX = -(3 + (pontuacao% 100 === 0));
    if(fundo3.x < width/3 + 50) {
      fundo3.x = width/2;
    }
    inimigos3();
    jogador3.visible = true;
    opcao1.visible = false;
    opcao2.visible = false;
    opcao3.visible = false;
    pontuacao2 = pontuacao2 + (Math.round(frameRate()/60));
    if(keyWentUp('enter')) {
      jogador3.changeAnimation('player_img3', jogador_image3);
    }
    if(keyWentDown('enter') && jogador3.y > height - height + 20) {
      jogador3.changeAnimation('player_ataque3', jogador3_ataque);
      jogador3.velocityY = -10;
    }
    if(jogador3.isTouching(grupoInimigo3)) {
      etapaJogo = 'ENCERRAR';
    }
    if(jogador3.y > height + 10){
      etapaJogo = 'ENCERRAR';
    }
  }
      if(etapaJogo === 'ENCERRAR') {
        fim();
        if(keyWentDown('space')) {
          background('darkblue');
          etapaJogo = 'INICIO';
          reiniciar();
      }
    }
  jogador3.setCollider('circle', -15, -15, 35);
  
  //gravidade
  jogador1.velocityY += 0.5;
  jogador2.velocityY += 0.5;
  jogador3.velocityY += 0.5;
  
  drawSprites();
  if(etapaJogo === 'JOGAR1' || etapaJogo === 'JOGAR2') {
    fill('white');
    textSize(20);
    text('Score: '+ pontuacao, width - 1300, height/2 - 200);
  }
  if(etapaJogo === 'JOGAR3') {
    fill('white');
    textSize(20);
    text('Score: '+ pontuacao2, width - 1300, height/2 - 200);
  }
}
function inimigos() {
  if(frameCount% 200 === 0) {
    inimigo = createSprite(width + 10, height - 100, 20, 50);
    inimigo.addAnimation('inimigo_img', inimigo_image);
    inimigo.velocityX = -(3 +(pontuacao%100 === 0));
    inimigo.lifetime = width/inimigo.velocityX + 10;
    grupoInimigo.add(inimigo);
  }
}
function inimigos2() {
  if(frameCount% 200 === 0) {
    inimigo2 = createSprite(width + 10, height - 50, 20, 50);
    inimigo2.addImage('inimigo2_img', inimigo2_image);
    inimigo2.lifetime = width/inimigo2.velocityX + 10;
    inimigo2.velocityX = -(3 + (pontuacao% 100 === 0));
    grupoInimigo2.add(inimigo2);
  }
}
function inimigos3() {
  if(frameCount% 10 === 0) {
    inimigo3 = createSprite(width + 10, Math.round(random(height - height + 20, height*2)), 10, 20);
    inimigo3.addImage('inimigo3_img', inimigo3_image);
    inimigo3.velocityX = -(3 +(pontuacao% 100 === 0));
    inimigo3.lifetime = width/inimigo3.velocityX + 10;
    inimigo3.scale = 0.3;
    
    grupoInimigo3.add(inimigo3);
  }
}
function fim() {
  jogador1.visible = false;
  jogador2.visible = false;
  jogador3.visible = false;
  fundo1.velocityX = 0;
  fundo2.velocityX = 0;
  fundo3.velocityX = 0;
  fundo1.visible = false;
  fundo2.visible = false;
  fundo3.visible = false;
  grupoInimigo.setLifetimeEach(-1);
  grupoInimigo.destroyEach();
  grupoInimigo2.setLifetimeEach(-1);
  grupoInimigo2.destroyEach();
  grupoInimigo3.setLifetimeEach(-1);
  grupoInimigo3.destroyEach();
  background('black');
  fill('orange');
  stroke('orange');
  textSize(50);
  text('GAME OVER!', width/2 - 220, height/2);
  textSize(20);
  text('Aperte "espaço" para reiniciar', width/2 - 200, height/2 + 80);
}
function reiniciar() {
  opcao1.visible = true;
  opcao2.visible = true;
  opcao3.visible = true;
  pontuacao = 0;
  pontuacao2 = 0;
  jogador3.y = 200;
  jogador3.collide(solo_invis2);
}
function flechas() {
  flecha = createSprite(jogador1.x + 30, jogador1.y - 20, 100, 10);
  flecha.addImage('arrow_img', flecha_image);
  flecha.velocityX = (5 + (pontuacao%100 === 0));
  grupoFlecha.add(flecha);
}
function tiros() {
  tiro = createSprite(jogador2.x + 30, jogador2.y - 20, 100, 10);
  tiro.addImage('tiro_img', tiro_image);
  tiro.velocityX = (5 + (pontuacao%100 === 0));
  grupoTiro.add(tiro);
}