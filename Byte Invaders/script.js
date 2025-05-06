// --- PLACARES ---------------------------------------------------
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let highStages = JSON.parse(localStorage.getItem('highStages')) || [];

function updateScoreboard() {
  const list = document.getElementById('scoreList');
  list.innerHTML = '';
  highScores.slice(0,5).forEach(({name, score}) => {
    const li = document.createElement('li');
    li.textContent = `${name} — ${score}`;
    list.appendChild(li);
  });
}
function updateStageboard() {
  const list = document.getElementById('stageList');
  list.innerHTML = '';
  highStages.slice(0,5).forEach(({name, stage}) => {
    const li = document.createElement('li');
    li.textContent = `${name} — Fase ${stage}`;
    list.appendChild(li);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  updateScoreboard();
  updateStageboard();
  document.getElementById('btnReset').onclick = () => {
    localStorage.removeItem('highScores');
    localStorage.removeItem('highStages');
    highScores = []; highStages = [];
    updateScoreboard(); updateStageboard();
  };
});

// --- PRELOAD DE SPRITES ----------------------------------------
const SPRITE_NAMES = [
  'player_ship',
  'enemy_bug','enemy_error','enemy_comment','enemy_firewall',
  'shot_single','shot_double','shot_triple',
  'boost_double','boost_triple',
  'fx_explosion','fx_explosion_boss','fx_boost_collect',
  // agora carregamos 10 variações de boss
  'boss_variation1','boss_variation2','boss_variation3','boss_variation4','boss_variation5',
  'boss_variation6','boss_variation7','boss_variation8','boss_variation9','boss_variation10',
  'background_full','hud_score'
];
const sprites = {};
let loadedCount = 0;
function startGame() { console.log('Sprites carregados. Iniciando jogo.'); gameLoop(); }

SPRITE_NAMES.forEach(name => {
  const img = new Image();
  img.src = `sprites/${name}.png`;
  img.onload = () => { if (++loadedCount === SPRITE_NAMES.length) startGame(); };
  img.onerror = () => console.error(`Erro carregando sprites/${name}.png`);
  sprites[name] = img;
});

// --- VARIÁVEIS GERAIS ------------------------------------------
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player = { x:400-48, y:600-104, width:96, height:96, speed:7 };
let targetX = player.x;
let score = 0, stage = 1, isRunning = true;
let shots = [], powerUps = [], enemies = [], explosions = [];
let shotSpeed = 7, shotType = 'single';
let enemyDir = 1, enemySpeed = 1.5, descendSpeed = 3;

const enemyTypes = [
  { type:'bug', hp:1 },{ type:'error', hp:2 },
  { type:'comment', hp:3 },{ type:'firewall', hp:4 }
];
const enemyHpByStage = (s,b) => Math.min(b + Math.floor(s/3), 6);

// --- GERAÇÃO DE FORMAÇÕES --------------------------------------
function createFormation(isBoss=false) {
  enemies = []; enemySpeed = 1.5;
  if (isBoss) {
    // índice de variação de 1 a 10
    const idx = Math.min(stage/10,10)|0;
    const spriteName = `boss_variation${idx}`;
    const hp = stage*10;
    const w = 192, h = 128;
    enemies.push({
      x:400 - w/2, y:40,
      width:w, height:h,
      alive:true, hp, maxHp:hp,
      type:spriteName
    });
    return;
  }
  const rows=4, cols=Math.min(5+Math.floor(stage/4),12);
  const sx=40, sy=40, dx=60, dy=50;
  const pool = stage<=10 ? [enemyTypes[0]] : enemyTypes;
  for (let r=0; r<rows; r++){
    for (let c=0; c<cols; c++){
      const et=pool[Math.floor(Math.random()*pool.length)];
      enemies.push({
        x: sx + c*dx, y: sy + r*dy,
        width:64, height:64,
        alive:true,
        hp: enemyHpByStage(stage, et.hp),
        type: et.type
      });
    }
  }
}
createFormation(false);

// --- DISPARO AUTOMÁTICO ---------------------------------------
function shoot() {
  if (!isRunning) return;
  const coords = {
    single:   [{x:player.x+44,y:player.y,w:8,h:16}],
    double:   [{x:player.x+16,y:player.y,w:8,h:16},{x:player.x+player.width-24,y:player.y,w:8,h:16}],
    triple:   [{x:player.x+16,y:player.y,w:8,h:16},{x:player.x+44,y:player.y,w:8,h:16},{x:player.x+player.width-24,y:player.y,w:8,h:16}]
  }[shotType];
  coords.forEach(c=>shots.push({x:c.x,y:c.y,width:c.w,height:c.h,type:shotType}));
}
setInterval(shoot,400);

// --- MOVIMENTAÇÃO via MOUSE -----------------------------------
canvas.addEventListener('mousemove',e=>{
  const r = canvas.getBoundingClientRect();
  targetX = e.clientX - r.left - player.width/2;
});

// --- UPDATE ---------------------------------------------------
function update() {
  // player
  player.x += (targetX-player.x)*0.2;
  player.x = Math.max(0, Math.min(player.x, canvas.width-player.width));

  // tiros
  shots.forEach((s,i)=>{ s.y-=shotSpeed; if(s.y<0) shots.splice(i,1); });

  // inimigos
  let descend=false;
  enemies.forEach(en=>{
    if(!en.alive)return;
    en.x += enemyDir*enemySpeed;
    if(en.x<10||en.x+en.width>canvas.width-10) descend=true;
  });
  if(descend){
    enemyDir*=-1;
    enemies.forEach(en=>en.y+=descendSpeed);
    enemySpeed+=0.3;
  }

  // colisões tiros×inimigos
  shots.forEach((s,si)=>enemies.forEach((en,ei)=>{
    if(en.alive&& s.x<en.x+en.width&&s.x+s.width>en.x&&s.y<en.y+en.height&&s.y+s.height>en.y) {
      shots.splice(si,1); en.hp--;
      if(en.hp<=0){
        en.alive=false; score+=100;
        if(Math.random()<0.1) powerUps.push({x:en.x,y:en.y,width:32,height:32,type:['double','triple'][Math.floor(Math.random()*2)]});
      }
    }
  }));

  // power-ups
  powerUps.forEach((pu,pi)=>{
    pu.y+=2;
    if(pu.y+pu.height>=canvas.height){
      explosions.push({x:pu.x,y:canvas.height-pu.height,t:0});
      powerUps.splice(pi,1); return;
    }
    if(pu.x<player.x+player.width&&pu.x+pu.width>player.x&&pu.y+pu.height>player.y){
      shotType=pu.type; powerUps.splice(pi,1);
    }
  });

  // game over
  enemies.forEach(en=>{
    if(en.alive&&en.y+en.height>player.y){
      isRunning=false;
      setTimeout(()=>{
        const name = prompt(`Game Over! Pontuação: ${score}\nDigite seu nome:`,'---')||'---';
        highScores.push({name,score});
        highScores.sort((a,b)=>b.score-a.score); highScores=highScores.slice(0,5);
        localStorage.setItem('highScores',JSON.stringify(highScores)); updateScoreboard();
        highStages.push({name,stage});
        highStages.sort((a,b)=>b.stage-a.stage); highStages=highStages.slice(0,5);
        localStorage.setItem('highStages',JSON.stringify(highStages)); updateStageboard();
      },100);
    }
  });

  // próxima fase
  if(enemies.every(en=>!en.alive)){
    stage++;
    createFormation(stage%10===0);
  }

  // explosões
  explosions.forEach((ex,i)=>{ if(++ex.t>15) explosions.splice(i,1); });
}

// --- DRAW -----------------------------------------------------
function draw() {
  // fundo
  ctx.drawImage(sprites.background_full,0,0,canvas.width,canvas.height);

  // player
  ctx.drawImage(sprites.player_ship,player.x,player.y,player.width,player.height);

  // tiros
  shots.forEach(s=>ctx.drawImage(sprites['shot_'+s.type],s.x,s.y,s.width,s.height));

  // inimigos e boss
  enemies.forEach(en=>{
    if(!en.alive)return;
    // se for boss, desenha sprite específico
    if(en.type.startsWith('boss_variation')) {
      ctx.drawImage(sprites[en.type],en.x,en.y,en.width,en.height);
      // barra de vida
      const bw=en.width, bh=8, bx=en.x, by=en.y-12, pct=en.hp/en.maxHp;
      ctx.fillStyle='#333';ctx.fillRect(bx,by,bw,bh);
      ctx.fillStyle='#f00';ctx.fillRect(bx,by,bw*pct,bh);
      ctx.strokeStyle='#000';ctx.strokeRect(bx,by,bw,bh);
    } else {
      ctx.drawImage(sprites['enemy_'+en.type],en.x,en.y,en.width,en.height);
    }
  });

  // power-ups
  powerUps.forEach(pu=>ctx.drawImage(sprites['boost_'+pu.type],pu.x,pu.y,pu.width,pu.height));

  // explosões
  explosions.forEach(ex=>{
    ctx.drawImage(sprites.fx_explosion,ex.x,ex.y,32,32);
  });

  // HUD pontos
  ctx.drawImage(sprites.hud_score,10,10,32,32);
  ctx.fillStyle='#0f0';ctx.font='18px monospace';ctx.fillText(`${score}`,50,32);

  // HUD fase
  ctx.fillText(`Fase: ${stage}`,canvas.width-120,32);
}

// --- LOOP PRINCIPAL ------------------------------------------
function gameLoop(){
  if(!isRunning) return;
  update(); draw(); requestAnimationFrame(gameLoop);
}
