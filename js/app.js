/* ============================================================
   LÓGICA DE LA PÁGINA — no hace falta tocar este archivo
   para cambiar recuerdos, fotos o textos (eso va en data.js)
   ============================================================ */
const state = {
  unlocked: { recuerdos:false, album:false, juegos:false },
  games: { memo:false, heart:false, puzzle:false, stars:false, safe:false }
};

function totalStops(){ return Object.keys(state.unlocked).length; }
function doneStops(){ return Object.values(state.unlocked).filter(Boolean).length; }

/* ============================================================
   UTILIDADES DE PANTALLA
   ============================================================ */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const backBtn = document.getElementById('backToCountdownBtn');
  if(backBtn){
    backBtn.style.display = (id === 'screen-splash' || id === 'screen-countdown') ? 'none' : 'flex';
  }
}

function toast(msg){
  // El popup de logros se sacó a pedido. Se deja la función vacía
  // para no romper las llamadas que ya existen en el resto del código
  // (por si más adelante quieren volver a activarlo).
}

/* ============================================================
   ESTRELLAS DE FONDO (canvas simple, sin librerías)
   ============================================================ */
function seedAtmosphere(screenId){
  const screen = document.getElementById(screenId);
  if(!screen || screen.querySelector('.tumbleweed')) return; // ya sembrado
  const tw = document.createElement('div');
  tw.className = 'tumbleweed';
  tw.textContent = '';
  tw.style.animationDelay = (Math.random()*6)+'s';
  screen.appendChild(tw);
  for(let i=0;i<7;i++){
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.left = (Math.random()*90)+'%';
    f.style.top = (40+Math.random()*45)+'%';
    f.style.animationDelay = (Math.random()*5)+'s';
    f.style.animationDuration = (5+Math.random()*3)+'s';
    screen.appendChild(f);
  }
}

function drawStars(canvasId, density=110){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize(){
    canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const stars = Array.from({length:density}, ()=>({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height*0.7,
    r: Math.random()*1.6+0.4,
    tw: Math.random()*Math.PI*2,
    speed: Math.random()*0.02+0.01,
    drift: (Math.random()-0.5)*0.012 // deriva horizontal lentísima, da sensación de profundidad
  }));
  function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(s=>{
      s.tw += s.speed;
      s.x += s.drift;
      if(s.x < -5) s.x = canvas.width+5;
      if(s.x > canvas.width+5) s.x = -5;
      const alpha = 0.4 + Math.sin(s.tw)*0.4;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,244,214,${Math.max(0,alpha)})`;
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  loop();
}
drawStars('stars', 130);

/* estrellas fugaces ocasionales, sobre la pantalla que esté activa */
function spawnShootingStar(){
  const activeScreen = document.querySelector('.screen.active');
  if(!activeScreen) return;
  const skyScreens = ['screen-splash','screen-countdown','screen-map','screen-intro'];
  if(!skyScreens.includes(activeScreen.id)) return;
  const el = document.createElement('div');
  el.className = 'shooting-star';
  const startX = 15 + Math.random()*55;
  const startY = 4 + Math.random()*22;
  const angle = 20 + Math.random()*18;
  el.style.left = startX+'%';
  el.style.top = startY+'%';
  el.style.transform = `rotate(${angle}deg)`;
  activeScreen.appendChild(el);
  const dist = 220 + Math.random()*160;
  const rad = angle*Math.PI/180;
  const dx = Math.cos(rad)*dist;
  const dy = Math.sin(rad)*dist;
  const anim = el.animate([
    { transform:`translate(0,0) rotate(${angle}deg)`, opacity:0 },
    { transform:`translate(${dx*0.12}px, ${dy*0.12}px) rotate(${angle}deg)`, opacity:1, offset:0.12 },
    { transform:`translate(${dx}px, ${dy}px) rotate(${angle}deg)`, opacity:0 }
  ], { duration: 900+Math.random()*400, easing:'ease-in' });
  anim.onfinish = ()=> el.remove();
}
function scheduleShootingStar(){
  setTimeout(()=>{
    spawnShootingStar();
    scheduleShootingStar();
  }, 9000 + Math.random()*9000);
}
scheduleShootingStar();

/* ============================================================
   PANTALLA 1: SPLASH
   ============================================================ */
window.addEventListener('load', ()=>{
  setTimeout(()=>{ document.getElementById('loadbarFill').style.width = '100%'; }, 200);
  setTimeout(()=>{
    drawStars('stars2', 90);
    seedAtmosphere('screen-countdown');
    showScreen('screen-countdown');
    startCountdown();
  }, 2600);
});

/* ============================================================
   PANTALLA 2: COUNTDOWN
   ============================================================ */
function startCountdown(){
  function tick(){
    const now = new Date();
    const diff = CONFIG.targetDate - now;
    const btn = document.getElementById('btnToIntro');
    const waitMsg = document.getElementById('waitMsg');
    if(diff <= 0){
      document.getElementById('countdownGrid').style.display='none';
      document.getElementById('cdArrived').style.display='block';
      waitMsg.textContent = '¡Hoy se desbloquea todo, incluida la sorpresa final! 🎉';
      btn.textContent = 'Entrar a ver 🤠';
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff/(1000*60*60*24));
    const h = Math.floor((diff/(1000*60*60))%24);
    const m = Math.floor((diff/(1000*60))%60);
    const s = Math.floor((diff/1000)%60);
    document.getElementById('cdDays').textContent = d;
    document.getElementById('cdHours').textContent = String(h).padStart(2,'0');
    document.getElementById('cdMins').textContent = String(m).padStart(2,'0');
    document.getElementById('cdSecs').textContent = String(s).padStart(2,'0');
  }
  tick();
  const timer = setInterval(tick, 1000);
}
document.getElementById('btnToIntro').addEventListener('click', ()=>{
  startBackgroundMusic();
  showScreen('screen-intro');
  playIntro();
});

/* ============================================================
   PANTALLA 3: INTRO CINEMATOGRÁFICA
   ============================================================ */
function playIntro(){
  drawStars('starsIntro', 70);
  const holder = document.getElementById('introLineHolder');
  const photoBig = document.getElementById('introPhotoBig');
  holder.innerHTML = '';
  photoBig.innerHTML = `<div class="frame-inner"><div class="photo-slot">📷</div></div>`;
  let i = 0;
  function next(){
    holder.innerHTML = '';
    if(i >= INTRO_LINES.length){
      buildMap();
      drawStars('stars3', 90);
      seedAtmosphere('screen-map');
      showScreen('screen-map');
      return;
    }
    const div = document.createElement('div');
    div.className = 'intro-line show';
    div.textContent = INTRO_LINES[i];
    holder.appendChild(div);

    // la foto grande cambia (con fundido) junto con cada frase
    // (usa INTRO_PHOTOS, no PHOTOS, para no spoilear las fotos que se desbloquean jugando)
    const photo = INTRO_PHOTOS[i % INTRO_PHOTOS.length];
    const rot = INTRO_PHOTO_SPOTS[i % INTRO_PHOTO_SPOTS.length].rot;
    photoBig.style.transform = `rotate(${rot}deg)`;
    if(photo && photo.src){
      const img = new Image();
      img.src = photo.src;
      img.onload = ()=>{
        photoBig.innerHTML = `<div class="frame-inner"><img src="${photo.src}"></div>`;
        requestAnimationFrame(()=> photoBig.querySelector('img').classList.add('show'));
      };
    } else {
      photoBig.innerHTML = `<div class="frame-inner"><div class="photo-slot">📷</div></div>`;
    }

    i++;
    setTimeout(next, 3200);
  }
  next();
}

/* ============================================================
   PANTALLA 4: MAPA
   ============================================================ */
function buildMap(){
  // stops grid
  const grid = document.getElementById('stopsGrid');
  grid.innerHTML = '';
  STOPS.forEach(st=>{
    const div = document.createElement('div');
    div.className = 'stop';
    div.innerHTML = `
      <div class="stop-badge" id="badge-${st.key}" onclick="openPanel('${st.key}')">${st.icon}</div>
      <div class="stop-label">${st.label}</div>
    `;
    grid.appendChild(div);
  });
  // extra: final badge (locked until all done) — centrada, debajo del Álbum
  const finalWrap = document.getElementById('finalStopWrap');
  finalWrap.innerHTML = '';
  const finalDiv = document.createElement('div');
  finalDiv.className = 'stop stop-final';
  finalDiv.innerHTML = `
    <div class="stop-badge locked" id="badge-final" onclick="tryFinal()">🏆</div>
    <div class="stop-label">Final</div>
  `;
  finalWrap.appendChild(finalDiv);

  buildPhraseTrack();
  buildTimeline();
  buildAlbum();
  buildMemoGame();
  buildHeartGame();
  buildPuzzleGame();
  buildDuckGame();
  placeEasterEgg();
  updateProgressFab();
}

function buildPhraseTrack(){
  const track = document.getElementById('phraseTrack');
  track.innerHTML = '';
  PHRASE.split('').forEach((ch,idx)=>{
    const el = document.createElement('div');
    if(ch === ' '){
      el.className = 'phrase-letter space';
    } else {
      el.className = 'phrase-letter';
      el.dataset.idx = idx;
      el.textContent = '';
    }
    track.appendChild(el);
  });
}

function revealPhraseProgress(){
  const letters = [...document.querySelectorAll('.phrase-letter:not(.space)')];
  const totalLetters = letters.length;
  const unlockedCount = doneStops();
  const totalCount = totalStops();
  const revealCount = Math.round((unlockedCount/totalCount)*totalLetters);
  letters.forEach((el,i)=>{
    const idx = parseInt(el.dataset.idx);
    if(i < revealCount){
      el.textContent = PHRASE[idx];
      el.classList.add('revealed');
    } else {
      el.textContent = '';
      el.classList.remove('revealed');
    }
  });
}

function openPanel(key){
  document.querySelectorAll('.section-panel').forEach(p=>p.classList.remove('open'));
  document.getElementById('panel-'+key).classList.add('open');
  document.getElementById('panel-'+key).scrollIntoView({behavior:'smooth', block:'center'});
  // "recuerdos" y "album" se dan por completas con solo mirarlas.
  // "juegos" necesita que realmente los termine (ver más abajo).
  // La música ya no es una misión: ahora es ambiental y arranca sola.
  const autoCompleteOnView = ['recuerdos'];
  if(autoCompleteOnView.includes(key)){
    markUnlocked(key);
  }
}
function closePanel(key){
  document.getElementById('panel-'+key).classList.remove('open');
}
function markUnlocked(key){
  if(state.unlocked[key] === false){
    state.unlocked[key] = true;
    document.getElementById('badge-'+key).classList.add('done');
    toast(`Misión desbloqueada: ${STOPS.find(s=>s.key===key).label}`);
    revealPhraseProgress();
    updateProgressFab();
    checkFinalUnlock();
  }
}
function updateProgressFab(){
  const fab = document.getElementById('progressFab');
  fab.textContent = `${doneStops()} / ${totalStops()} misiones`;
  fab.classList.add('show');
}
function checkFinalUnlock(){
  if(doneStops() === totalStops()){
    document.getElementById('badge-final').classList.remove('locked');
    if(isBirthdayYet()){
      toast('¡Completaste todas las misiones! El final está listo 🏆');
    } else {
      toast('¡Completaste todas las misiones! La sorpresa final se guarda para el 21 💛');
    }
  }
}
function tryFinal(){
  if(doneStops() < totalStops()){
    document.getElementById('finalLockMsg').textContent =
      `Te faltan ${totalStops()-doneStops()} misiones por completar antes de llegar al final...`;
    openPanel('final-lock');
  } else if(!isBirthdayYet()){
    document.getElementById('finalLockMsg').textContent =
      `¡Completaste todas las misiones! 🎉 Pero esta sorpresa se guarda para el día de tu cumple de verdad, el 21 de julio. Volvé ese día 💛`;
    openPanel('final-lock');
  } else {
    showScreen('screen-final');
    playFinalSlideshow();
    launchFireworks();
  }
}

/* ---- Timeline (Recuerdos) ---- */
function buildTimeline(){
  const list = document.getElementById('timelineList');
  list.innerHTML = '';
  MEMORIES.forEach((m,i)=>{
    const div = document.createElement('div');
    div.className = 'tl-item';
    const photoHtml = m.photo
      ? `<img src="${m.photo}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;margin-top:8px;">`
      : `<div class="photo-slot">📷 espacio para foto del recuerdo</div>`;
    div.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-content" style="cursor:pointer;">
        <div class="date">${m.date}</div>
        <div class="txt">${m.text}</div>
        ${photoHtml}
      </div>
    `;
    div.querySelector('.tl-content').addEventListener('click', ()=> openMemory(i));
    list.appendChild(div);
  });
}
function openMemory(i){
  const m = MEMORIES[i];
  const modalContent = document.querySelector('.letter-paper');
  modalContent.classList.add('letter-final');
  const photoHtml = m.photo
    ? `<img src="${m.photo}" style="width:100%;border-radius:10px;margin-bottom:18px;box-shadow:0 10px 24px rgba(0,0,0,0.35);">`
    : '';
  document.getElementById('letterModalBody').innerHTML = `
    ${photoHtml}
    <div class="from">${m.date}</div>
    <p>${m.text}</p>
  `;
  document.getElementById('letterModal').classList.add('show');
}

/* ---- Álbum: se va desbloqueando foto a foto con cada minijuego ---- */
function buildAlbum(){
  const grid = document.getElementById('albumGrid');
  grid.innerHTML = '';
  PHOTOS.forEach(p=>{
    const div = document.createElement('div');
    const isUnlocked = !p.game || state.games[p.game];
    div.className = 'album-frame' + (isUnlocked ? '' : ' locked-frame');
    if(isUnlocked){
      div.innerHTML = p.src
        ? `<img src="${p.src}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:6px;">`
        : `<div class="photo-slot">📷</div>`;
      div.innerHTML += `<div class="cap">${p.caption}</div>`;
      if(p.src){
        div.addEventListener('click', ()=> openPhotoLightbox(p.src, p.caption));
      }
    } else {
      div.innerHTML = `<div class="photo-slot locked-slot">🔒</div><div class="cap">Ganá "${GAME_LABELS[p.game]}" para desbloquear</div>`;
    }
    grid.appendChild(div);
  });
  checkAlbumComplete();
}
function checkAlbumComplete(){
  const allUnlocked = PHOTOS.every(p => !p.game || state.games[p.game]);
  if(allUnlocked){
    markUnlocked('album');
  }
}
function openPhotoLightbox(src, caption){
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption || '';
  document.getElementById('photoLightbox').classList.add('show');
}
function closeLightbox(){
  document.getElementById('photoLightbox').classList.remove('show');
}

/* ---- Juegos: hub ---- */
function openGame(key){
  document.querySelectorAll('.game-area').forEach(g=>g.classList.remove('open'));
  document.getElementById('game-'+key).classList.add('open');
}
function markGameDone(key, label){
  if(!state.games[key]){
    state.games[key] = true;
    document.getElementById('st-'+key).textContent = '✔ Completado';
    toast(`¡Juego superado! ${label}`);
    // refresca la galería: puede haber una foto nueva desbloqueada por este juego
    buildAlbum();
    const unlockedPhoto = PHOTOS.find(p => p.game === key);
    if(unlockedPhoto){
      setTimeout(()=> toast('📸 Nueva foto desbloqueada en el Álbum'), 1400);
    }
  }
  // if all games done, mark 'juegos' stop as unlocked too
  if(Object.values(state.games).every(Boolean)){
    markUnlocked('juegos');
  }
}

/* ---- Memotest ---- */
function buildMemoGame(){
  const symbols = ['🌵','🤠','⭐','🐎','🌻','☀️','🥾','🔥'];
  let deck = [...symbols, ...symbols];
  deck.sort(()=>Math.random()-0.5);
  const grid = document.getElementById('memGrid');
  grid.innerHTML = '';
  let flipped = [];
  let lock = false;
  let matches = 0;
  deck.forEach((sym, idx)=>{
    const card = document.createElement('div');
    card.className = 'mem-card';
    card.dataset.sym = sym;
    card.dataset.idx = idx;
    card.textContent = '';
    card.addEventListener('click', ()=>{
      if(lock || card.classList.contains('flip') || card.classList.contains('matched')) return;
      card.classList.add('flip');
      card.textContent = sym;
      flipped.push(card);
      if(flipped.length === 2){
        lock = true;
        setTimeout(()=>{
          if(flipped[0].dataset.sym === flipped[1].dataset.sym){
            flipped.forEach(c=>c.classList.add('matched'));
            matches++;
            if(matches === symbols.length){
              markGameDone('memo','Memotest');
            }
          } else {
            flipped.forEach(c=>{ c.classList.remove('flip'); c.textContent=''; });
          }
          flipped = [];
          lock = false;
        }, 700);
      }
    });
    grid.appendChild(card);
  });
}

/* ---- Encontrar el corazón ---- */
function buildHeartGame(){
  const field = document.getElementById('heartField');
  field.innerHTML = '';
  const decoys = ['🌵','🤠','⭐','🐎','🌻','🥾','🔥','🌙'];
  for(let i=0;i<11;i++){
    const el = document.createElement('div');
    el.className = 'decoy';
    el.textContent = decoys[Math.floor(Math.random()*decoys.length)];
    el.style.left = (Math.random()*88)+'%';
    el.style.top = (Math.random()*80)+'%';
    field.appendChild(el);
  }
  const heart = document.createElement('div');
  heart.className = 'heart-target';
  heart.textContent = '❤️';
  heart.style.left = (Math.random()*88)+'%';
  heart.style.top = (Math.random()*80)+'%';
  heart.addEventListener('click', ()=>markGameDone('heart','Encontraste el corazón'));
  field.appendChild(heart);
}

/* ---- Rompecabezas: click en una pieza y después click en el casillero donde va ---- */
function buildPuzzleGame(){
  const ROWS = 3, COLS = 3;
  const total = ROWS * COLS;
  const frame = document.getElementById('jigsawFrame');
  const tray = document.getElementById('jigsawTray');
  frame.innerHTML = '';
  tray.innerHTML = '';
  let selectedPiece = null;
  let placedCount = 0;

  // cada pieza siempre muestra el mismo recorte de la foto sin importar
  // dónde esté parada — así se arma la imagen al llevarla a su casillero.
  function pieceStyle(idx){
    const row = Math.floor(idx / COLS), col = idx % COLS;
    const posX = COLS > 1 ? (col / (COLS - 1)) * 100 : 50;
    const posY = ROWS > 1 ? (row / (ROWS - 1)) * 100 : 50;
    return `background-image:url('${PUZZLE_PHOTO}'); background-size:${COLS*100}% ${ROWS*100}%; background-position:${posX}% ${posY}%;`;
  }

  // casilleros del marco (destino de cada pieza)
  for(let i=0; i<total; i++){
    const slot = document.createElement('div');
    slot.className = 'jigsaw-slot';
    slot.dataset.slot = i;
    slot.addEventListener('click', ()=>{
      if(!selectedPiece || slot.classList.contains('filled')) return;
      const correct = Number(slot.dataset.slot) === Number(selectedPiece.dataset.piece);
      if(correct){
        slot.classList.add('filled');
        slot.appendChild(selectedPiece);
        selectedPiece.classList.remove('selected');
        selectedPiece.classList.add('placed');
        selectedPiece = null;
        placedCount++;
        if(placedCount === total){
          markGameDone('puzzle','Rompecabezas');
        }
      } else {
        slot.classList.add('wrong');
        setTimeout(()=> slot.classList.remove('wrong'), 250);
      }
    });
    frame.appendChild(slot);
  }

  // piezas sueltas, en orden mezclado (nunca ya resuelto)
  let order = [...Array(total).keys()];
  do{ order.sort(()=>Math.random()-0.5); } while(total>1 && order.every((v,i)=>v===i));

  order.forEach(idx=>{
    const piece = document.createElement('div');
    piece.className = 'jigsaw-piece';
    piece.dataset.piece = idx;
    piece.style.cssText = pieceStyle(idx);
    piece.addEventListener('click', ()=>{
      if(piece.classList.contains('placed')) return;
      tray.querySelectorAll('.jigsaw-piece').forEach(p=>p.classList.remove('selected'));
      selectedPiece = piece;
      piece.classList.add('selected');
    });
    tray.appendChild(piece);
  });
}


/* ---- Atrapar estrellas ---- */
function buildStarsGameLoop(){
  const field = document.getElementById('catchField');
  let caught = 0;
  const goal = 8;
  let active = true;
  function spawn(){
    if(!active) return;
    const s = document.createElement('div');
    s.className = 'falling-star';
    s.textContent = '⭐';
    s.style.left = (Math.random()*90)+'%';
    s.style.top = '-30px';
    field.appendChild(s);
    let pos = -30;
    const fall = setInterval(()=>{
      pos += 3;
      s.style.top = pos+'px';
      if(pos > 240){
        clearInterval(fall);
        s.remove();
      }
    }, 30);
    s.addEventListener('click', ()=>{
      clearInterval(fall);
      s.remove();
      caught++;
      document.getElementById('catchScore').textContent = caught+' / '+goal;
      if(caught >= goal){
        active = false;
        markGameDone('stars','Atrapaestrellas');
      }
    });
    if(active) setTimeout(spawn, 700);
  }
  spawn();
}
// se inicia la primera vez que se abre el juego
let starsGameStarted = false;
document.addEventListener('click', (e)=>{
  if(e.target.closest('.game-card') && e.target.closest('.game-card').onclick.toString().includes("'stars'") && !starsGameStarted){
    starsGameStarted = true;
    buildStarsGameLoop();
  }
});

/* ---- Tiro al pato ---- */
function buildDuckGame(){
  const field = document.getElementById('duckField');
  const scoreEl = document.getElementById('duckScore');
  field.innerHTML = '';
  scoreEl.textContent = '0 / 3';
  let hits = 0;
  const goal = 3;
  let active = true;

  function spawnDuck(){
    if(!active) return;
    const duck = document.createElement('div');
    duck.className = 'duck';
    duck.textContent = '🦆';
    duck.style.left = (8 + Math.random()*78) + '%';
    duck.style.top = (12 + Math.random()*66) + '%';
    field.appendChild(duck);

    const escape = setTimeout(()=>{ duck.remove(); }, 1250);

    duck.addEventListener('click', ()=>{
      if(!active) return;
      clearTimeout(escape);
      duck.textContent = '💫';
      duck.style.pointerEvents = 'none';
      setTimeout(()=> duck.remove(), 180);
      hits++;
      scoreEl.textContent = hits + ' / ' + goal;
      if(hits >= goal){
        active = false;
        markGameDone('safe','Tiro al pato');
      }
    });

    if(active) setTimeout(spawnDuck, 650 + Math.random()*450);
  }
  spawnDuck();
}

/* ---- Música ambiental: arranca sola al entrar al pueblo, cambia sola
   de canción cuando llega el cumple real, y se puede silenciar con el
   botón fijo 🔊 de arriba a la derecha. ---- */
function isBirthdayYet(){
  return new Date() >= CONFIG.targetDate;
}
let currentTrackKey = null; // 'before' | 'after' | null (todavía no arrancó)
function playTrack(key){
  const audioBefore = document.getElementById('audioBefore');
  const audioAfter = document.getElementById('audioAfter');
  const toPlay = key === 'after' ? audioAfter : audioBefore;
  const toPause = key === 'after' ? audioBefore : audioAfter;
  toPause.pause();
  toPlay.currentTime = toPlay.currentTime || 0;
  toPlay.play().catch(()=>{ /* si falta el archivo o el navegador bloquea, no rompe nada */ });
  currentTrackKey = key;
}
// Se llama una sola vez, en el click de "Ir entrando al pueblo" (ese click
// es el permiso que necesita el navegador para poder reproducir audio).
function startBackgroundMusic(){
  if(currentTrackKey) return; // ya está sonando, no reiniciar
  playTrack(isBirthdayYet() ? 'after' : 'before');
  showVolumeReminder();
  document.getElementById('muteBtn').style.display = 'flex';
  // vigila en segundo plano el momento exacto en que llega el cumple real,
  // para cambiar de canción sola sin que haga falta ningún otro click
  setInterval(()=>{
    if(isBirthdayYet() && currentTrackKey !== 'after'){
      playTrack('after');
    }
  }, 1000);
}
function showVolumeReminder(){
  const el = document.getElementById('volumeReminder');
  el.classList.add('show');
  setTimeout(()=> el.classList.remove('show'), 5000);
}
function toggleMute(){
  const audioBefore = document.getElementById('audioBefore');
  const audioAfter = document.getElementById('audioAfter');
  const muted = !audioBefore.muted;
  audioBefore.muted = muted;
  audioAfter.muted = muted;
  document.getElementById('muteBtn').textContent = muted ? '🔇' : '🔊';
}

/* ---- Easter egg escondido ---- */
function placeEasterEgg(){
  const egg = document.createElement('div');
  egg.className = 'egg-star';
  egg.textContent = '✨';
  egg.style.top = (10+Math.random()*10)+'%';
  egg.style.left = (5+Math.random()*10)+'%';
  let clicks = 0;
  egg.addEventListener('click', ()=>{
    clicks++;
    if(clicks >= 5){
      toast('🎁 Easter egg encontrado: sos la mejor amiga que existe');
      egg.remove();
    }
  });
  document.getElementById('screen-map').appendChild(egg);
}

/* ============================================================
   PANTALLA 5: FINAL
   ============================================================ */
function openFinalLetter(index){
  const letter = FINAL_LETTERS[index];
  const modalContent = document.querySelector('.letter-paper');
  modalContent.classList.add('letter-final');
  document.getElementById('letterModalBody').innerHTML = `
    <div class="from">${letter.emoji} De parte de ${letter.from}</div>
    <p>${letter.text}</p>
  `;
  document.getElementById('letterModal').classList.add('show');
}
function closeLetter(){
  document.getElementById('letterModal').classList.remove('show');
  document.querySelector('.letter-paper').classList.remove('letter-final');
}

/* Recorre las fotos del álbum una por una con un lindo cross-fade y termina
   en la foto especial (el marco de corazón) — recién ahí aparecen los
   botones de las cartas, como un pequeño "premio" al final del recorrido. */
function playFinalSlideshow(){
  const frame = document.getElementById('fsFrame');
  const wrap = document.getElementById('finalSlideshow');
  const letters = document.getElementById('finalLetters');
  frame.innerHTML = '';
  wrap.classList.remove('on-special');
  letters.classList.remove('show');

  const slides = [...PHOTOS.map(p=>p.src), FINAL_SPECIAL_PHOTO].filter(Boolean);
  let i = 0;

  function showSlide(){
    const img = document.createElement('img');
    img.src = slides[i];
    frame.appendChild(img);
    requestAnimationFrame(()=> img.classList.add('show'));
    // se queda una imagen de fondo por si tarda en cargar la siguiente
    while(frame.children.length > 2) frame.removeChild(frame.firstChild);

    const isLast = i === slides.length - 1;
    if(isLast){
      wrap.classList.add('on-special');
      setTimeout(()=> letters.classList.add('show'), 900);
      return; // se queda mostrando la foto especial
    }
    i++;
    setTimeout(showSlide, 1600);
  }
  showSlide();
}

function launchFireworks(){
  const canvas = document.getElementById('fireworks');
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  const ctx = canvas.getContext('2d');
  let particles = [];
  function burst(x,y){
    const colors = ['#f3dd8f','#c97b4a','#f7ead0','#8fa37e','#e8a288'];
    for(let i=0;i<40;i++){
      const angle = (Math.PI*2)*(i/40);
      const speed = Math.random()*3+2;
      particles.push({
        x,y,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed,
        life: 60,
        color: colors[Math.floor(Math.random()*colors.length)]
      });
    }
  }
  function loop(){
    ctx.fillStyle = 'rgba(20,10,10,0.15)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life--;
      ctx.beginPath();
      ctx.arc(p.x,p.y,2.4,0,Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(p.life/60,0);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    particles = particles.filter(p=>p.life>0);
    requestAnimationFrame(loop);
  }
  loop();
  setInterval(()=>{
    burst(Math.random()*canvas.width, Math.random()*canvas.height*0.6+40);
  }, 900);
  burst(canvas.width/2, canvas.height*0.35);
}
