const PASSWORD = "You are mine";
const BIRTHDAY = new Date("2026-10-11T00:00:00+06:00");
const LETTER = `Suchona,

Happy Birthday, my love. ♥

Today is about you — the girl who somehow became one of the softest, brightest parts of my world.

If I could be there right now, I would want the simplest things: to see your smile up close, hand you flowers, hear you laugh without a screen between us, and spend the day making you feel as special as you actually are.

Since I can't fold distance into a little box and put it beside your birthday cake, I made you this instead.

Every photograph here is a tiny piece of our story. Every line is something I wish I could say while looking into your eyes.

There are days when I miss you in ordinary places — during a random song, a quiet evening, a beautiful view, or when something happens and my first thought is, “I wish Suchona were here.”

But I also love that our story has taught me something beautiful: distance can be frustrating, but it can never make a meaningful person mean less.

You are still you.
I am still me.
And there is still an “us” worth celebrating.

So my birthday wish for you is not only that you become happier, more successful, or more confident — although I want all of those things for you.

I wish you peace.
I wish you courage.
I wish you beautiful surprises.
I wish you the kind of happiness that stays even after the birthday candles disappear.

And selfishly, I wish for many more photographs, many more little trips, many more conversations that go on longer than we planned, and one day… fewer kilometers between us.

Happy Birthday, Suchona.

Keep this little world somewhere safe.
Whenever you miss me, come back here.

With all the love I know how to give,

Sanjid ♥`;

const captions = [
  "A little collage. A lot of us.",
  "A day I would replay.",
  "One ordinary moment that became precious.",
  "You, exactly as I like to remember you.",
  "My favorite kind of afternoon.",
  "The quiet kind of happiness.",
  "A smile I could never get bored of.",
  "A memory made of sunshine.",
  "Just Suchona being Suchona.",
  "A soft chapter in our story.",
  "Proof that simple days can be beautiful.",
  "A frame I would keep forever.",
  "Even the scenery feels better beside you.",
  "Two people, one little universe.",
  "Another day I would choose again.",
  "Same direction. Same story."
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const audio = $("#audio");
let musicPlaying = false, letterStarted = false, audioCtx = null;

window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("done"), 450);
  renderGallery();
  renderFilmstrip();
  observeReveals();
  updateCountdown();
  setInterval(updateCountdown,1000);
  spawnParticles();
});

function renderGallery(){
  const grid = $("#galleryGrid");
  for(let i=1;i<=16;i++){
    const fig = document.createElement("figure");
    fig.className = "gallery-card reveal";
    fig.innerHTML = `<img src="assets/images/photo-${String(i).padStart(2,"0")}.png" alt="Suchona and Sanjid memory ${i}" loading="lazy"><figcaption>${captions[i-1]}</figcaption>`;
    fig.addEventListener("click", () => openLightbox(fig));
    grid.appendChild(fig);
  }
}
function renderFilmstrip(){
  const track = $("#filmtrack");
  for(let copy=0;copy<2;copy++) for(let i=1;i<=16;i++){
    const img = document.createElement("img");
    img.src = `assets/images/photo-${String(i).padStart(2,"0")}.png`;
    img.alt = `memory ${i}`; img.loading="lazy";
    track.appendChild(img);
  }
}

function unlock(){
  if($("#password").value.trim().toLowerCase() !== PASSWORD.toLowerCase()){
    $("#gateError").textContent = "Not quite. Try the three words you already know. ♥";
    beep(330,.09,.025); return;
  }
  $("#gate").classList.add("hidden"); $("#site").classList.remove("hidden"); document.body.classList.remove("locked"); window.scrollTo(0,0);
  startMusic(true); beep(523,.12,.035); setTimeout(()=>beep(659,.16,.03),90); setTimeout(()=>beep(784,.28,.028),180);
}
$("#unlock").addEventListener("click",unlock); $("#password").addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});

function startMusic(fromUserGesture=false){
  audio.volume = 1.0;
  const p = audio.play();
  if(p && p.then){
    p.then(()=>{musicPlaying=true; $("#music").classList.add("playing"); $("#music").classList.remove("needs-tap"); $("#musicStatus").textContent="Our original soundtrack is playing at full player volume. ♥"})
      .catch(()=>{ $("#musicStatus").textContent="Your browser blocked autoplay. Tap Music once to start it."; $("#music").classList.add("needs-tap"); });
  }
}
function stopMusic(){ audio.pause(); musicPlaying=false; $("#music").classList.remove("playing"); $("#musicStatus").textContent="Soundtrack paused." }
function toggleMusic(){ if(musicPlaying) stopMusic(); else startMusic(true) }
$("#music").addEventListener("click",toggleMusic);
$("#heroMusic").addEventListener("click",()=>{toggleMusic(); $("#heroMusic").textContent=musicPlaying?"Soundtrack is playing ♥":"Play our soundtrack ♫"});

function audioSetup(){ if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)(); if(audioCtx.state==="suspended")audioCtx.resume(); }
function beep(freq,dur,vol){try{audioSetup();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sine";o.frequency.value=freq;g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(vol,audioCtx.currentTime+.01);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+dur+.02)}catch{}}

function observeReveals(){
  const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
  $$(".reveal").forEach(x=>io.observe(x));
}
function spawnParticles(){
  setInterval(()=>{if($("#site").classList.contains("hidden"))return;if(Math.random()>.58)return;const p=document.createElement("span");p.className="particle";p.textContent=Math.random()>.25?"♥":"✦";p.style.left=Math.random()*100+"vw";p.style.bottom="-20px";p.style.fontSize=(9+Math.random()*15)+"px";p.style.setProperty("--drift",(Math.random()*120-60)+"px");$("#particles").appendChild(p);setTimeout(()=>p.remove(),6000)},900);
}
function updateCountdown(){
  let ms=Math.max(0,BIRTHDAY.getTime()-Date.now());const d=Math.floor(ms/86400000);ms%=86400000;const h=Math.floor(ms/3600000);ms%=3600000;const m=Math.floor(ms/60000);const s=Math.floor(ms%60000/1000);
  $("#d").textContent=String(d).padStart(2,"0");$("#h").textContent=String(h).padStart(2,"0");$("#m").textContent=String(m).padStart(2,"0");$("#s").textContent=String(s).padStart(2,"0");
}

function openLightbox(fig){const img=fig.querySelector("img"),cap=fig.querySelector("figcaption");$("#lightImg").src=img.src;$("#lightCaption").textContent=cap.textContent;$("#lightbox").classList.remove("hidden");document.body.style.overflow="hidden";beep(520,.06,.015)}
function closeLightbox(){$("#lightbox").classList.add("hidden");document.body.style.overflow=""}
$("#close").addEventListener("click",closeLightbox);$("#lightbox").addEventListener("click",e=>{if(e.target.id==="lightbox")closeLightbox()});

function startLetter(){
  if(letterStarted)return;letterStarted=true;startMusic(true);const el=$("#typed");let i=0;el.textContent="";
  const tick=()=>{el.textContent=LETTER.slice(0,i++);if(i<=LETTER.length){const c=LETTER[i-1];if(i%11===0)beep(230+(i%6)*27,.03,.008);setTimeout(tick,c==="\n"?260:(c==="."||c==="!"||c==="♥"?90:14))}else{$("#musicStatus").textContent="The letter has arrived. ♥";beep(784,.28,.025)}};tick();
}
$("#startLetter").addEventListener("click",startLetter);

$("#surprise").addEventListener("click",()=>{$("#modal").classList.remove("hidden");document.body.style.overflow="hidden";for(let i=0;i<22;i++)setTimeout(()=>{const p=document.createElement("span");p.className="particle";p.textContent=i%3?"♥":"✦";p.style.left=(35+Math.random()*30)+"vw";p.style.bottom=(35+Math.random()*10)+"vh";p.style.fontSize=(12+Math.random()*22)+"px";p.style.setProperty("--drift",(Math.random()*240-120)+"px");$("#particles").appendChild(p);setTimeout(()=>p.remove(),6000)},i*70);beep(523,.12,.03);setTimeout(()=>beep(659,.15,.03),80);setTimeout(()=>beep(784,.35,.025),170)});
$("#modalClose").addEventListener("click",()=>{$("#modal").classList.add("hidden");document.body.style.overflow=""});

document.addEventListener("mousemove",e=>{$("#cursorGlow").style.left=e.clientX+"px";$("#cursorGlow").style.top=e.clientY+"px"});
