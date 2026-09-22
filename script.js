/* =========================================================
   🌻 FELIZ DÍA DE LAS FLORES AMARILLAS
   JAVASCRIPT COMPLETO
   GALAXIA INTERACTIVA + JARDÍN + CARTA
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CONFIG = {

  pageTitle:
    "Feliz Día de las Flores Amarillas 🌻",

  introTitle:
    "Feliz Día de las Flores Amarillas",

  introText:
    "Preparé algo especial para ti",

  messageBody:
    "Que este pequeño detalle te recuerde lo especial que eres.",

  footer:
    "Hecho especialmente para ti ✨",

  flowerCount: 22,

  petalCount: 45,

  fireflyCount: 55,

  dustCount: 90,

  heartParticleCount: 130,

  /* =========================
     GALAXIA
  ========================== */

  galaxyRotationSpeed:
    0.018,

  galaxyAutoRotate:
    true,

  galaxyMessages: [

    "Para ti 💛",

    "Eres mi pequeño universo ✨",

    "Contigo todo brilla 💛",

    "Siempre florecerá algo bonito 🌼",

    "Tú haces bonito mi mundo 🌻",

    "Un detalle hecho con cariño ✨",

    "Que nunca te falten sonrisas 💛",

    "Porque te lo mereces 🌼",

    "Gracias por existir ✨",

    "Mi pequeño universo 🌻"

  ]

};


/* =========================================================
   UTILIDADES
========================================================= */

const $ = (id) =>
  document.getElementById(id);


function rand(min, max) {

  return Math.random() *
    (max - min) +
    min;

}


/* =========================================================
   ELEMENTOS
========================================================= */

const intro =
  $("intro");

const garden =
  $("garden");

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

const galaxyScene =
  $("galaxyScene");

const letterOverlay =
  $("letterOverlay");


/* =========================================================
   ESTADO DE LA GALAXIA
========================================================= */

let galaxyRotation = 0;

let galaxyVelocity = 0;

let galaxyDragging = false;

let galaxyPointerId = null;

let galaxyLastX = 0;

let galaxyLastY = 0;

let galaxyAnimationFrame = null;

let lastGalaxyTime =
  performance.now();


/* =========================================================
   TEXTO GENERAL
========================================================= */

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


if ($("messageBody")) {

  $("messageBody").textContent =
    CONFIG.messageBody;

}


if ($("footerNote")) {

  $("footerNote").textContent =
    CONFIG.footer;

}


/* =========================================================
   CREAR GIRASOL
========================================================= */

function createFlower(index) {

  if (!flowers)
    return;


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
    rand(.45, 1.18).toFixed(2)
  );


  el.style.setProperty(
    "--rot",
    `${rand(-8, 8).toFixed(1)}deg`
  );


  el.style.setProperty(
    "--delay",
    `${(
      index * .08 +
      rand(0, .7)
    ).toFixed(2)}s`
  );


  if (index === 0) {

    el.classList.add(
      "flower-big"
    );

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

    el.classList.add(
      "flower-big"
    );

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


/* =========================================================
   🌼 PÉTALOS
========================================================= */

function createPetals() {

  if (!petals)
    return;

  petals.innerHTML = "";

  for (
    let i = 0;
    i < CONFIG.petalCount;
    i++
  ) {

    const el =
      document.createElement("i");

    el.className =
      "petal-float";


    /*
      Algunos pétalos nacen cerca
      de las flores para dar variedad.
    */

    const fromFlower =
      Math.random() < 0.25;


    if (fromFlower) {

      el.classList.add(
        "from-flower"
      );

      el.style.setProperty(
        "--top",
        `${rand(58, 78)}%`
      );

    } else {

      el.style.setProperty(
        "--top",
        `${rand(-15, 5)}vh`
      );

    }


    /* Posición horizontal */

    el.style.setProperty(
      "--left",
      `${rand(0, 100)}%`
    );


    /* Duración */

    el.style.setProperty(
      "--duration",
      `${rand(10, 18).toFixed(1)}s`
    );


    /* Inicio aleatorio */

    el.style.setProperty(
      "--delay",
      `${rand(-18, 0).toFixed(1)}s`
    );


    /* Movimiento lateral */

    el.style.setProperty(
      "--drift",
      `${rand(-180, 180).toFixed(0)}px`
    );


    /* Tamaño */

    el.style.setProperty(
      "--size",
      `${rand(9, 17).toFixed(0)}px`
    );


    petals.appendChild(el);

  }

}

/* =========================================================
   LUCIÉRNAGAS
========================================================= */

function createFireflies() {

  if (!fireflies)
    return;


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


/* =========================================================
   POLVO DORADO
========================================================= */

function createGoldDust() {

  if (!goldDust)
    return;


  goldDust.innerHTML =
    "";


  for (
    let i = 0;
    i < CONFIG.dustCount;
    i++
  ) {

    const particle =
      document.createElement("i");


    const size =
      rand(1, 3.5);


    particle.style.position =
      "absolute";


    particle.style.left =
      `${rand(0, 100)}%`;


    particle.style.top =
      `${rand(0, 100)}%`;


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
      rand(.15, .8).toFixed(2);


    particle.style.animation =
      `
      dustParticle
      ${rand(3, 7).toFixed(2)}s
      ease-in-out
      ${rand(0, 5).toFixed(2)}s
      infinite
      alternate
      `;


    goldDust.appendChild(
      particle
    );

  }

}


/* =========================================================
   CORAZÓN DE PARTÍCULAS
========================================================= */

function createParticleHeart() {

  if (!particleHeart)
    return;


  particleHeart.innerHTML =
    "";


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
      x.toFixed(2)
    );


    particle.style.setProperty(
      "--y",
      y.toFixed(2)
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


/* =========================================================
   ESTRELLAS EXTRA DE LA GALAXIA
========================================================= */

function createGalaxyStars() {

  if (!galaxyScene)
    return;


  galaxyScene
    .querySelectorAll(
      ".generated-galaxy-star"
    )
    .forEach(
      star => star.remove()
    );


  const total =
    window.innerWidth < 600
      ? 22
      : 38;


  for (
    let i = 0;
    i < total;
    i++
  ) {

    const star =
      document.createElement("div");


    star.className =
      "floating-star generated-galaxy-star";


    star.textContent =
      Math.random() > .5
        ? "✦"
        : "·";


    star.style.left =
      `${rand(4, 96)}%`;


    star.style.top =
      `${rand(4, 96)}%`;


    star.style.animationDelay =
      `${rand(-4, 0).toFixed(2)}s`;


    star.style.fontSize =
      `${rand(.45, 1.35).toFixed(2)}rem`;


    galaxyScene.appendChild(
      star
    );

  }

}


/* =========================================================
   ACTUALIZAR MENSAJES
========================================================= */

function updateGalaxyMessages() {

  if (!galaxyScene)
    return;


  const texts =
    galaxyScene.querySelectorAll(
      ".galaxy-orbit-text"
    );


  texts.forEach(
    (text, index) => {

      if (
        CONFIG.galaxyMessages[index]
      ) {

        text.textContent =
          CONFIG.galaxyMessages[index];

      }

    }
  );

}


/* =========================================================
   CREAR ELEMENTOS EXTRA
   AL INTERACTUAR CON LA GALAXIA
========================================================= */

function createInteractionSpark(x, y) {

  if (!galaxyScene)
    return;


  const spark =
    document.createElement("span");


  spark.className =
    "floating-star interaction-spark";


  spark.textContent =
    Math.random() > .5
      ? "✦"
      : "✧";


  spark.style.position =
    "fixed";


  spark.style.left =
    `${x}px`;


  spark.style.top =
    `${y}px`;


  spark.style.zIndex =
    "50";


  spark.style.pointerEvents =
    "none";


  document.body.appendChild(
    spark
  );


  spark.animate(
    [
      {
        transform:
          "translate(-50%, -50%) scale(.5)",
        opacity: 0
      },

      {
        transform:
          "translate(-50%, -50%) scale(1.4)",
        opacity: 1
      },

      {
        transform:
          `
          translate(
            ${rand(-40, 40)}px,
            ${rand(-60, 20)}px
          )
          scale(.2)
          `,
        opacity: 0
      }
    ],
    {
      duration: 900,
      easing: "ease-out"
    }
  ).finished
    .then(() => {
      spark.remove();
    })
    .catch(() => {
      spark.remove();
    });

}


/* =========================================================
   ROTACIÓN
========================================================= */

function applyGalaxyRotation() {

  if (!galaxyScene)
    return;


  galaxyScene.style.setProperty(
    "--galaxy-rotation",
    `${galaxyRotation}deg`
  );


  const orbit1 =
    galaxyScene.querySelector(
      ".orbit-1"
    );

  const orbit2 =
    galaxyScene.querySelector(
      ".orbit-2"
    );

  const orbit3 =
    galaxyScene.querySelector(
      ".orbit-3"
    );

  const orbit4 =
    galaxyScene.querySelector(
      ".orbit-4"
    );


  if (orbit1) {

    orbit1.style.transform =
      `
      translate(-50%, -50%)
      rotate(${galaxyRotation}deg)
      `;

  }


  if (orbit2) {

    orbit2.style.transform =
      `
      translate(-50%, -50%)
      rotate(${45 + galaxyRotation * .72}deg)
      scale(.78)
      `;

  }


  if (orbit3) {

    orbit3.style.transform =
      `
      translate(-50%, -50%)
      rotate(${120 - galaxyRotation * .55}deg)
      scale(.61)
      `;

  }


  if (orbit4) {

    orbit4.style.transform =
      `
      translate(-50%, -50%)
      rotate(${210 + galaxyRotation * .38}deg)
      scale(.44)
      `;

  }

}


/* =========================================================
   ANIMACIÓN DE LA GALAXIA
========================================================= */

function animateGalaxy(time) {

  const delta =
    Math.min(
      time - lastGalaxyTime,
      40
    );


  lastGalaxyTime =
    time;


  if (!galaxyDragging) {

    if (CONFIG.galaxyAutoRotate) {

      galaxyRotation +=
        CONFIG.galaxyRotationSpeed *
        delta;

    }


    galaxyRotation +=
      galaxyVelocity;


    galaxyVelocity *= .94;


    if (
      Math.abs(galaxyVelocity) < .002
    ) {

      galaxyVelocity =
        0;

    }

  }


  applyGalaxyRotation();


  galaxyAnimationFrame =
    requestAnimationFrame(
      animateGalaxy
    );

}


/* =========================================================
   INICIAR GALAXIA
========================================================= */

function startGalaxy() {

  if (!galaxyScene)
    return;


  createGalaxyStars();

  updateGalaxyMessages();


  galaxyRotation =
    0;


  galaxyVelocity =
    0;


  lastGalaxyTime =
    performance.now();


  applyGalaxyRotation();


  if (
    !galaxyAnimationFrame
  ) {

    galaxyAnimationFrame =
      requestAnimationFrame(
        animateGalaxy
      );

  }

}


/* =========================================================
   DETENER GALAXIA
========================================================= */

function stopGalaxy() {

  if (
    galaxyAnimationFrame
  ) {

    cancelAnimationFrame(
      galaxyAnimationFrame
    );

    galaxyAnimationFrame =
      null;

  }

}


/* =========================================================
   INICIO DEL ARRASTRE
========================================================= */

function startGalaxyDrag(event) {

  if (!galaxyScene)
    return;


  galaxyDragging =
    true;


  galaxyPointerId =
    event.pointerId;


  galaxyLastX =
    event.clientX;


  galaxyLastY =
    event.clientY;


  galaxyVelocity =
    0;


  galaxyScene.classList.add(
    "dragging"
  );


  try {

    galaxyScene.setPointerCapture(
      event.pointerId
    );

  } catch (error) {
    // Compatibilidad móvil.
  }


  createInteractionSpark(
    event.clientX,
    event.clientY
  );


  event.preventDefault();

}


/* =========================================================
   MOVIMIENTO
========================================================= */

function moveGalaxyDrag(event) {

  if (!galaxyDragging)
    return;


  if (
    galaxyPointerId !==
    event.pointerId
  ) return;


  const deltaX =
    event.clientX -
    galaxyLastX;


  const deltaY =
    event.clientY -
    galaxyLastY;


  galaxyLastX =
    event.clientX;


  galaxyLastY =
    event.clientY;


  /*
    Horizontal:
    giro principal.

    Vertical:
    pequeña influencia
    para que se sienta más natural.
  */

  const movement =
    deltaX +
    deltaY * .22;


  galaxyRotation +=
    movement * .48;


  galaxyVelocity =
    movement * .20;


  applyGalaxyRotation();


  /*
    Pequeños destellos
    durante el movimiento.
  */

  if (
    Math.abs(movement) > 2 &&
    Math.random() > .82
  ) {

    createInteractionSpark(
      event.clientX,
      event.clientY
    );

  }


  event.preventDefault();

}


/* =========================================================
   TERMINAR ARRASTRE
========================================================= */

function endGalaxyDrag(event) {

  if (!galaxyDragging)
    return;


  if (
    event &&
    galaxyPointerId !==
    event.pointerId
  ) return;


  galaxyDragging =
    false;


  galaxyPointerId =
    null;


  galaxyScene.classList.remove(
    "dragging"
  );


  /*
    Limitamos la velocidad
    para evitar que salga disparada.
  */

  galaxyVelocity =
    Math.max(
      -1.8,
      Math.min(
        1.8,
        galaxyVelocity
      )
    );


  try {

    if (event) {

      galaxyScene.releasePointerCapture(
        event.pointerId
      );

    }

  } catch (error) {
    // Nada que hacer.
  }

}


/* =========================================================
   EVENTOS DE GALAXIA
========================================================= */

function setupGalaxyControls() {

  if (!galaxyScene)
    return;


  galaxyScene.addEventListener(
    "pointerdown",
    startGalaxyDrag
  );


  galaxyScene.addEventListener(
    "pointermove",
    moveGalaxyDrag,
    {
      passive: false
    }
  );


  galaxyScene.addEventListener(
    "pointerup",
    endGalaxyDrag
  );


  galaxyScene.addEventListener(
    "pointercancel",
    endGalaxyDrag
  );


  galaxyScene.addEventListener(
    "pointerleave",
    (event) => {

      if (
        galaxyDragging &&
        event.pointerType === "mouse"
      ) {

        endGalaxyDrag(event);

      }

    }
  );


  /*
    Evita que el navegador
    intente seleccionar texto
    o desplazar la página
    mientras se arrastra.
  */

  galaxyScene.addEventListener(
    "dragstart",
    event => event.preventDefault()
  );

}


/* =========================================================
   ESCENA COMPLETA
========================================================= */

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

  createGalaxyStars();

  updateGalaxyMessages();

}


/* =========================================================
   ABRIR SORPRESA
========================================================= */

function openSurprise() {

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

  startGalaxy();

}


/* =========================================================
   CARTA
========================================================= */

function openLetter() {

  if (!letterOverlay)
    return;


  letterOverlay.classList.add(
    "open"
  );


  letterOverlay.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeLetter() {

  if (!letterOverlay)
    return;


  letterOverlay.classList.remove(
    "open"
  );


  letterOverlay.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================================================
   REPETIR
========================================================= */

function replay() {

  closeLetter();

  stopGalaxy();


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


  galaxyRotation =
    0;


  galaxyVelocity =
    0;


  window.setTimeout(
    buildScene,
    500
  );

}


/* =========================================================
   BOTONES
========================================================= */

const openButton =
  $("openBtn");


const replayButton =
  $("replayBtn");


const letterButton =
  $("letterBtn");


const closeLetterButton =
  $("closeLetter");


if (openButton) {

  openButton.addEventListener(
    "click",
    openSurprise
  );

}


if (replayButton) {

  replayButton.addEventListener(
    "click",
    replay
  );

}


if (letterButton) {

  letterButton.addEventListener(
    "click",
    openLetter
  );

}


if (closeLetterButton) {

  closeLetterButton.addEventListener(
    "click",
    closeLetter
  );

}


/* =========================================================
   CERRAR CARTA AL TOCAR FUERA
========================================================= */

if (letterOverlay) {

  letterOverlay.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        letterOverlay
      ) {

        closeLetter();

      }

    }
  );

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key ===
      "Escape"
    ) {

      closeLetter();

    }

  }
);


/* =========================================================
   CAMBIO DE TAMAÑO
========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      garden &&
      garden.classList.contains("show")
    ) {

      createGalaxyStars();

    }

  }
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

setupGalaxyControls();

buildScene();
