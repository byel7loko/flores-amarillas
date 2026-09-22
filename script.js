const CONFIG = {

  pageTitle:
    "Feliz Día de las Flores Amarillas 🌻",

  introTitle:
    "Feliz Día de las Flores Amarillas",

  introText:
    "Preparé algo especial para ti",

  messageTitle:
    "Feliz Día de las Flores Amarillas",

  messageBody:
    "Que este pequeño detalle te recuerde lo especial que eres.",

  footer:
    "Hecho especialmente para ti ✨",

  /* Cantidades */

  flowerCount: 22,

  petalCount: 38,

  fireflyCount: 55,

  dustCount: 90,

  heartParticleCount: 130
};


/* =========================
   UTILIDADES
========================= */

const $ = (id) =>
  document.getElementById(id);


function rand(min, max) {

  return Math.random() *
    (max - min) +
    min;

}


/* =========================
   TEXTO
========================= */

document.title =
  CONFIG.pageTitle;


if ($("introTitle")) {

  $("introTitle").textContent =
    CONFIG.introTitle;

}


if ($("introText")) {

  $("introText").textContent =
    CONFIG.introText;

}


if ($("messageTitle")) {

  $("messageTitle").innerHTML =
    `Feliz Día de las<br>
     <strong>Flores Amarillas</strong> 🌻`;

}


if ($("messageBody")) {

  $("messageBody").textContent =
    CONFIG.messageBody;

}


if ($("footerNote")) {

  $("footerNote").textContent =
    CONFIG.footer;

}


/* =========================
   CONTENEDORES
========================= */

const flowers =
  $("flowers");

const petals =
  $("petals");

const fireflies =
  $("fireflies");

const goldDust =
  $("goldDust");

const particleHeart =
  $("particleHeart");


/* =========================
   CREAR GIRASOL
========================= */

function createFlower(index) {

  const el =
    document.createElement("div");


  el.className =
    "flower";


  el.style.setProperty(
    "--left",
    `${rand(-5, 96)}%`
  );


  el.style.setProperty(
    "--scale",
    rand(0.45, 1.18).toFixed(2)
  );


  el.style.setProperty(
    "--rot",
    `${rand(-8, 8).toFixed(1)}deg`
  );


  el.style.setProperty(
    "--delay",
    `${(
      index * 0.08 +
      rand(0, 0.7)
    ).toFixed(2)}s`
  );


  /*
    Algunos girasoles serán más grandes
    para que se parezca más a la referencia.
  */

  if (index === 0) {

    el.classList.add("flower-big");

    el.style.setProperty(
      "--left",
      "13%"
    );

    el.style.setProperty(
      "--scale",
      "1.35"
    );

  }


  if (index === 1) {

    el.classList.add("flower-big");

    el.style.setProperty(
      "--left",
      "78%"
    );

    el.style.setProperty(
      "--scale",
      "1.20"
    );

  }


  el.innerHTML = `

    <div class="stem"></div>

    <div class="leaf left"></div>

    <div class="leaf right"></div>

    <div class="head">

      ${Array.from(
        { length: 12 },
        () => `<i class="petal"></i>`
      ).join("")}

      <b class="center"></b>

    </div>

  `;


  flowers.appendChild(el);

}


/* =========================
   PÉTALOS
========================= */

function createPetals() {

  for (
    let i = 0;
    i < CONFIG.petalCount;
    i++
  ) {

    const el =
      document.createElement("i");


    el.className =
      "petal-float";


    el.style.setProperty(
      "--left",
      `${rand(0, 100)}%`
    );


    el.style.setProperty(
      "--duration",
      `${rand(8, 16).toFixed(1)}s`
    );


    el.style.setProperty(
      "--delay",
      `${rand(-15, 0).toFixed(1)}s`
    );


    el.style.setProperty(
      "--drift",
      `${rand(-160, 160).toFixed(0)}px`
    );


    el.style.setProperty(
      "--size",
      `${rand(8, 16).toFixed(0)}px`
    );


    petals.appendChild(el);

  }

}


/* =========================
   LUCIÉRNAGAS
========================= */

function createFireflies() {

  for (
    let i = 0;
    i < CONFIG.fireflyCount;
    i++
  ) {

    const el =
      document.createElement("i");


    el.className =
      "firefly";


    el.style.setProperty(
      "--left",
      `${rand(2, 98)}%`
    );


    el.style.setProperty(
      "--top",
      `${rand(18, 94)}%`
    );


    el.style.setProperty(
      "--duration",
      `${rand(1.4, 3.8).toFixed(2)}s`
    );


    el.style.setProperty(
      "--delay",
      `${rand(0, 3).toFixed(2)}s`
    );


    fireflies.appendChild(el);

  }

}


/* =========================
   POLVO DORADO
========================= */

function createGoldDust() {

  if (!goldDust) return;


  goldDust.innerHTML = "";


  for (
    let i = 0;
    i < CONFIG.dustCount;
    i++
  ) {

    const particle =
      document.createElement("i");


    particle.style.position =
      "absolute";


    particle.style.left =
      `${rand(0, 100)}%`;


    particle.style.top =
      `${rand(0, 100)}%`;


    const size =
      rand(1, 3.5);


    particle.style.width =
      `${size}px`;


    particle.style.height =
      `${size}px`;


    particle.style.borderRadius =
      "50%";


    particle.style.background =
      "#ffe36a";


    particle.style.boxShadow =
      "0 0 8px rgba(255,210,35,.8)";


    particle.style.opacity =
      rand(0.15, 0.8).toFixed(2);


    particle.style.animation =
      `
      dustParticle
      ${rand(3, 7).toFixed(2)}s
      ease-in-out
      ${rand(0, 5).toFixed(2)}s
      infinite alternate
      `;


    goldDust.appendChild(
      particle
    );

  }

}


/* =========================
   CORAZÓN DE PARTÍCULAS
========================= */

function createParticleHeart() {

  if (!particleHeart) return;


  particleHeart.innerHTML = "";


  const total =
    CONFIG.heartParticleCount;


  for (
    let i = 0;
    i < total;
    i++
  ) {

    const t =
      (Math.PI * 2 * i) /
      total;


    /*
      Fórmula matemática para
      dibujar un corazón.
    */

    const x =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );


    const y =
      -(
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t)
      );


    const particle =
      document.createElement("i");


    particle.className =
      "heart-dot";


    particle.style.setProperty(
      "--x",
      `${x}px`
    );


    particle.style.setProperty(
      "--y",
      `${y}px`
    );


    particle.style.setProperty(
      "--delay",
      `${rand(0, 2).toFixed(2)}s`
    );


    particle.style.setProperty(
      "--size",
      `${rand(2, 4.5).toFixed(1)}px`
    );


    particleHeart.appendChild(
      particle
    );

  }

}


/* =========================
   CONSTRUIR ESCENA
========================= */

function buildScene() {

  if (flowers)
    flowers.innerHTML = "";


  if (petals)
    petals.innerHTML = "";


  if (fireflies)
    fireflies.innerHTML = "";


  for (
    let i = 0;
    i < CONFIG.flowerCount;
    i++
  ) {

    createFlower(i);

  }


  createPetals();

  createFireflies();

  createGoldDust();

  createParticleHeart();

}


/* =========================
   ABRIR
========================= */

function openSurprise() {

  const intro =
    $("intro");

  const garden =
    $("garden");


  if (!intro || !garden)
    return;


  intro.classList.add(
    "hide"
  );


  garden.classList.add(
    "show"
  );


  garden.setAttribute(
    "aria-hidden",
    "false"
  );


  buildScene();

}


/* =========================
   CARTA
========================= */

function openLetter() {

  const overlay =
    $("letterOverlay");


  if (!overlay)
    return;


  overlay.classList.add(
    "open"
  );


  overlay.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeLetter() {

  const overlay =
    $("letterOverlay");


  if (!overlay)
    return;


  overlay.classList.remove(
    "open"
  );


  overlay.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================
   REPETIR
========================= */

function replay() {

  closeLetter();


  const intro =
    $("intro");

  const garden =
    $("garden");


  if (!intro || !garden)
    return;


  garden.classList.remove(
    "show"
  );


  intro.classList.remove(
    "hide"
  );


  garden.setAttribute(
    "aria-hidden",
    "true"
  );


  window.setTimeout(
    buildScene,
    500
  );

}


/* =========================
   EVENTOS
========================= */

if ($("openBtn")) {

  $("openBtn").addEventListener(
    "click",
    openSurprise
  );

}


if ($("replayBtn")) {

  $("replayBtn").addEventListener(
    "click",
    replay
  );

}


if ($("letterBtn")) {

  $("letterBtn").addEventListener(
    "click",
    openLetter
  );

}


if ($("closeLetter")) {

  $("closeLetter").addEventListener(
    "click",
    closeLetter
  );

}


if ($("letterOverlay")) {

  $("letterOverlay").addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        $("letterOverlay")
      ) {

        closeLetter();

      }

    }
  );

}


/* =========================
   ESC
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeLetter();

    }

  }
);


/* =========================
   INICIO
========================= */

buildScene();
