const CONFIG = {
  pageTitle: "Feliz Día de las Flores Amarillas 🌻",

  introTitle: "Feliz Día de las Flores Amarillas",

  introText: "Preparé algo especial para ti",

  messageTitle: "Flores amarillas para alegrarte el día",

  messageBody:
    "Que este pequeño detalle te recuerde lo especial que eres.",

  footer: "Hecho especialmente para ti ✨",

  flowerCount: 24,
  petalCount: 28,
  fireflyCount: 38,
  dustCount: 35
};


const $ = (id) => document.getElementById(id);


/* =========================
   TEXTO
========================= */

document.title = CONFIG.pageTitle;

if ($("introTitle")) {
  $("introTitle").textContent = CONFIG.introTitle;
}

if ($("introText")) {
  $("introText").textContent = CONFIG.introText;
}

if ($("messageTitle")) {
  $("messageTitle").textContent = CONFIG.messageTitle;
}

if ($("messageBody")) {
  $("messageBody").textContent = CONFIG.messageBody;
}

if ($("footerNote")) {
  $("footerNote").textContent = CONFIG.footer;
}


/* =========================
   CONTENEDORES
========================= */

const flowers = $("flowers");
const petals = $("petals");
const fireflies = $("fireflies");
const goldDust = $("goldDust");


/* =========================
   RANDOM
========================= */

function rand(min, max) {
  return Math.random() * (max - min) + min;
}


/* =========================
   CREAR FLOR
========================= */

function createFlower(index) {

  const el = document.createElement("div");

  el.className = "flower";

  el.style.setProperty(
    "--left",
    `${rand(-5, 96)}%`
  );

  el.style.setProperty(
    "--base",
    `${rand(0, 18)}px`
  );

  el.style.setProperty(
    "--scale",
    rand(.38, 1.02).toFixed(2)
  );

  el.style.setProperty(
    "--rot",
    `${rand(-9, 9).toFixed(1)}deg`
  );

  el.style.setProperty(
    "--delay",
    `${(
      index * .08 +
      rand(0, .5)
    ).toFixed(2)}s`
  );


  el.innerHTML = `
    <div class="stem"></div>

    <div class="leaf left"></div>
    <div class="leaf right"></div>

    <div class="head">

      <i class="petal"></i>
      <i class="petal"></i>
      <i class="petal"></i>
      <i class="petal"></i>
      <i class="petal"></i>
      <i class="petal"></i>

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

    el.className = "petal-float";

    el.style.setProperty(
      "--left",
      `${rand(0, 100)}%`
    );

    el.style.setProperty(
      "--duration",
      `${rand(7, 15).toFixed(1)}s`
    );

    el.style.setProperty(
      "--delay",
      `${rand(-15, 0).toFixed(1)}s`
    );

    el.style.setProperty(
      "--drift",
      `${rand(-150, 150).toFixed(0)}px`
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

    el.className = "firefly";

    el.style.setProperty(
      "--left",
      `${rand(2, 98)}%`
    );

    el.style.setProperty(
      "--top",
      `${rand(22, 91)}%`
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
   POLVO EXTRA
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

    particle.style.position = "absolute";
    particle.style.left =
      `${rand(0, 100)}%`;

    particle.style.top =
      `${rand(0, 100)}%`;

    particle.style.width =
      `${rand(1, 3)}px`;

    particle.style.height =
      `${rand(1, 3)}px`;

    particle.style.borderRadius = "50%";

    particle.style.background =
      "#ffe36a";

    particle.style.boxShadow =
      "0 0 8px rgba(255,210,35,.7)";

    particle.style.opacity =
      rand(.15, .65).toFixed(2);

    particle.style.animation =
      `dustParticle ${
        rand(3, 7).toFixed(2)
      }s ease-in-out ${
        rand(0, 5).toFixed(2)
      }s infinite alternate`;

    goldDust.appendChild(particle);
  }
}


/* =========================
   CONSTRUIR ESCENA
========================= */

function buildScene() {

  if (flowers) flowers.innerHTML = "";
  if (petals) petals.innerHTML = "";
  if (fireflies) fireflies.innerHTML = "";

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
}


/* =========================
   ABRIR SORPRESA
========================= */

function openSurprise() {

  $("intro").classList.add("hide");

  $("garden").classList.add("show");

  $("garden").setAttribute(
    "aria-hidden",
    "false"
  );

  buildScene();
}


/* =========================
   REINICIAR
========================= */

function replay() {

  closeLetter();

  $("garden").classList.remove("show");

  $("intro").classList.remove("hide");

  $("garden").setAttribute(
    "aria-hidden",
    "true"
  );

  window.setTimeout(
    buildScene,
    500
  );
}


/* =========================
   CARTA
========================= */

function openLetter() {

  const overlay =
    $("letterOverlay");

  if (!overlay) return;

  overlay.classList.add("open");

  overlay.setAttribute(
    "aria-hidden",
    "false"
  );
}


function closeLetter() {

  const overlay =
    $("letterOverlay");

  if (!overlay) return;

  overlay.classList.remove("open");

  overlay.setAttribute(
    "aria-hidden",
    "true"
  );
}


/* =========================
   EVENTOS
========================= */

$("openBtn").addEventListener(
  "click",
  openSurprise
);


$("replayBtn").addEventListener(
  "click",
  replay
);


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


/* Cerrar tocando fuera de la carta */

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


/* ESC para cerrar */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeLetter();
    }

  }
);


/* =========================
   INICIAR
========================= */

buildScene();
