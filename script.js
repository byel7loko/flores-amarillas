/* =========================================================
   🌻 FLORES AMARILLAS
   JAVASCRIPT — GALAXIA AUTOMÁTICA + INTERACTIVA
========================================================= */

(() => {

  "use strict";


  /* =======================================================
     CONFIGURACIÓN
  ======================================================= */

  const CONFIG = {

    flowerCount: 24,

    petalCount: 55,

    fireflyCount: 60,

    dustCount: 75,

    heartCount: 130,

    galaxyMessages: [
      "Para ti 💛",
      "Mi pequeño universo ✨",
      "Todo brilla contigo",
      "Siempre algo bonito 🌼",
      "Gracias por existir",
      "Qué bonito coincidir contigo",
      "Para hacerte sonreír ✨",
      "Flores amarillas 🌻",
      "Un detalle hecho con cariño",
      "Porque te lo mereces 💛"
    ]

  };


  /* =======================================================
     SELECTORES
  ======================================================= */

  const $ = selector =>
    document.querySelector(selector);

  const $$ = selector =>
    [...document.querySelectorAll(selector)];


  const intro =
    $("#intro");

  const garden =
    $("#garden");

  const openBtn =
    $("#openBtn");

  const replayBtn =
    $("#replayBtn");

  const flowers =
    $("#flowers");

  const petals =
    $("#petals");

  const fireflies =
    $("#fireflies");

  const goldDust =
    $("#goldDust");

  const particleHeart =
    $("#particleHeart");

  const galaxy =
    $("#galaxyScene");

  const galaxyHint =
    $("#galaxyHint");

  const letterBtn =
    $("#letterBtn");

  const letterOverlay =
    $("#letterOverlay");

  const closeLetterBtn =
    $("#closeLetter");


  /* =======================================================
     ESTADO
  ======================================================= */

  let started = false;

  let dragging = false;

  let pointerId = null;

  let startX = 0;

  let manualRotation = 0;

  let lastRotation = 0;

  let messageIndex = 0;


  /* =======================================================
     UTILIDADES
  ======================================================= */

  function random(min, max) {

    return Math.random() *
      (max - min) +
      min;

  }


  function clear(element) {

    if (element) {

      element.innerHTML = "";

    }

  }


  /* =======================================================
     FLORES
  ======================================================= */

  function createFlowers() {

    if (!flowers) return;

    clear(flowers);


    const fragment =
      document.createDocumentFragment();


    for (
      let i = 0;
      i < CONFIG.flowerCount;
      i++
    ) {

      const flower =
        document.createElement("div");


      flower.className =
        "flower";


      flower.style.setProperty(
        "--left",
        `${random(1,99)}%`
      );


      flower.style.setProperty(
        "--bottom",
        `${random(1,17)}%`
      );


      flower.style.setProperty(
        "--size",
        `${random(30,62)}px`
      );


      flower.style.setProperty(
        "--sway",
        `${random(3,6)}s`
      );


      flower.style.setProperty(
        "--delay",
        `${random(-6,0)}s`
      );


      const stem =
        document.createElement("div");

      stem.className =
        "stem";


      const leafLeft =
        document.createElement("div");

      leafLeft.className =
        "leaf left";


      const leafRight =
        document.createElement("div");

      leafRight.className =
        "leaf right";


      const head =
        document.createElement("div");

      head.className =
        "head";


      for (
        let p = 0;
        p < 8;
        p++
      ) {

        const petal =
          document.createElement("i");

        petal.className =
          "petal";

        head.appendChild(petal);

      }


      const center =
        document.createElement("i");

      center.className =
        "center";


      head.appendChild(center);


      flower.append(
        stem,
        leafLeft,
        leafRight,
        head
      );


      fragment.appendChild(
        flower
      );

    }


    flowers.appendChild(
      fragment
    );

  }


  /* =======================================================
     PÉTALOS
  ======================================================= */

  function createPetals() {

    if (!petals) return;

    clear(petals);


    const fragment =
      document.createDocumentFragment();


    for (
      let i = 0;
      i < CONFIG.petalCount;
      i++
    ) {

      const petal =
        document.createElement("i");


      petal.className =
        "petal-float";


      petal.style.setProperty(
        "--left",
        `${random(-5,100)}%`
      );


      petal.style.setProperty(
        "--top",
        `${random(-30,40)}%`
      );


      petal.style.setProperty(
        "--size",
        `${random(7,17)}px`
      );


      petal.style.setProperty(
        "--duration",
        `${random(9,18)}s`
      );


      petal.style.setProperty(
        "--delay",
        `${random(-18,0)}s`
      );


      petal.style.setProperty(
        "--drift",
        `${random(-150,150)}px`
      );


      fragment.appendChild(
        petal
      );

    }


    petals.appendChild(
      fragment
    );

  }


  /* =======================================================
     LUCIÉRNAGAS
  ======================================================= */

  function createFireflies() {

    if (!fireflies) return;

    clear(fireflies);


    const fragment =
      document.createDocumentFragment();


    for (
      let i = 0;
      i < CONFIG.fireflyCount;
      i++
    ) {

      const firefly =
        document.createElement("i");


      firefly.className =
        "firefly";


      firefly.style.setProperty(
        "--left",
        `${random(2,98)}%`
      );


      firefly.style.setProperty(
        "--top",
        `${random(12,88)}%`
      );


      firefly.style.setProperty(
        "--dx",
        `${random(-45,45)}px`
      );


      firefly.style.setProperty(
        "--dy",
        `${random(-40,40)}px`
      );


      firefly.style.setProperty(
        "--duration",
        `${random(2.5,6)}s`
      );


      firefly.style.setProperty(
        "--delay",
        `${random(-6,0)}s`
      );


      fragment.appendChild(
        firefly
      );

    }


    fireflies.appendChild(
      fragment
    );

  }


  /* =======================================================
     POLVO
  ======================================================= */

  function createDust() {

    if (!goldDust) return;

    clear(goldDust);


    const fragment =
      document.createDocumentFragment();


    for (
      let i = 0;
      i < CONFIG.dustCount;
      i++
    ) {

      const dot =
        document.createElement("i");


      dot.className =
        "dust";


      dot.style.left =
        `${random(0,100)}%`;


      dot.style.top =
        `${random(0,100)}%`;


      dot.style.setProperty(
        "--drift",
        `${random(-30,30)}px`
      );


      dot.style.setProperty(
        "--duration",
        `${random(2,6)}s`
      );


      dot.style.setProperty(
        "--delay",
        `${random(-6,0)}s`
      );


      fragment.appendChild(
        dot
      );

    }


    goldDust.appendChild(
      fragment
    );

  }


  /* =======================================================
     CORAZÓN
  ======================================================= */

  function createHeart() {

    if (!particleHeart) return;

    clear(particleHeart);


    const fragment =
      document.createDocumentFragment();


    for (
      let i = 0;
      i < CONFIG.heartCount;
      i++
    ) {

      const t =
        random(0, Math.PI * 2);


      const scale =
        random(.35,1);


      const x =
        16 *
        Math.pow(
          Math.sin(t),
          3
        ) *
        scale;


      const y =
        -(
          13 * Math.cos(t) -
          5 * Math.cos(2*t) -
          2 * Math.cos(3*t) -
          Math.cos(4*t)
        ) *
        scale;


      const dot =
        document.createElement("i");


      dot.className =
        "heart-dot";


      dot.style.left =
        `${50 + x}%`;


      dot.style.top =
        `${50 + y}%`;


      dot.style.setProperty(
        "--delay",
        `${random(-2.5,0)}s`
      );


      fragment.appendChild(
        dot
      );

    }


    particleHeart.appendChild(
      fragment
    );

  }


  /* =======================================================
     CREAR ESCENA
  ======================================================= */

  function buildScene() {

    createFlowers();

    createPetals();

    createFireflies();

    createDust();

    createHeart();

  }


  /* =======================================================
     MENSAJES
  ======================================================= */

  function updateGalaxyMessages() {

    const textNodes =
      $$(".galaxy-orbit-text");


    textNodes.forEach(
      (node, index) => {

        const position =
          (
            messageIndex +
            index
          ) %
          CONFIG.galaxyMessages.length;


        node.textContent =
          CONFIG.galaxyMessages[
            position
          ];

      }
    );

  }


  /* =======================================================
     ROTACIÓN MANUAL
  ======================================================= */

  function setRotation(value) {

    manualRotation =
      value;

    if (!galaxy) return;

    galaxy.style.setProperty(
      "--galaxy-rotation",
      `${manualRotation}deg`
    );

  }


  /* =======================================================
     ARRASTRAR GALAXIA
  ======================================================= */

  function startDrag(event) {

    if (!galaxy) return;


    dragging = true;

    pointerId =
      event.pointerId;

    startX =
      event.clientX;


    lastRotation =
      manualRotation;


    galaxy.classList.add(
      "dragging"
    );


    galaxy.setPointerCapture?.(
      pointerId
    );

  }


  function moveDrag(event) {

    if (!dragging) return;

    if (
      event.pointerId !==
      pointerId
    ) {
      return;
    }


    const distance =
      event.clientX -
      startX;


    setRotation(
      lastRotation +
      distance * .55
    );


    messageIndex =
      Math.floor(
        Math.abs(
          manualRotation
        ) / 45
      ) %
      CONFIG.galaxyMessages.length;


    updateGalaxyMessages();

  }


  function endDrag() {

    dragging = false;

    pointerId = null;

    if (galaxy) {

      galaxy.classList.remove(
        "dragging"
      );

    }

  }


  /* =======================================================
     AUTOMATIZAR MENSAJES
  ======================================================= */

  function rotateMessages() {

    if (!started) return;

    if (dragging) return;


    messageIndex =
      (
        messageIndex + 1
      ) %
      CONFIG.galaxyMessages.length;


    updateGalaxyMessages();

  }


  /* =======================================================
     INICIAR EXPERIENCIA
  ======================================================= */

  function startExperience() {

    if (started) return;


    started = true;


    buildScene();


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


    if (galaxyHint) {

      galaxyHint.style.opacity =
        "1";


      window.setTimeout(
        () => {

          galaxyHint.style.opacity =
            ".25";

        },
        7000
      );

    }

  }


  /* =======================================================
     REPETIR
  ======================================================= */

  function replay() {

    closeLetter();


    started = false;


    garden.classList.remove(
      "show"
    );


    garden.setAttribute(
      "aria-hidden",
      "true"
    );


    intro.classList.remove(
      "hide"
    );


    setRotation(0);


    messageIndex = 0;


    updateGalaxyMessages();


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     CARTA
  ======================================================= */

  function openLetter() {

    if (!letterOverlay) return;


    letterOverlay.classList.add(
      "open"
    );


    letterOverlay.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";


    closeLetterBtn?.focus();

  }


  function closeLetter() {

    if (!letterOverlay) return;


    letterOverlay.classList.remove(
      "open"
    );


    letterOverlay.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";

  }


  /* =======================================================
     EVENTOS
  ======================================================= */

  openBtn?.addEventListener(
    "click",
    startExperience
  );


  replayBtn?.addEventListener(
    "click",
    replay
  );


  letterBtn?.addEventListener(
    "click",
    openLetter
  );


  closeLetterBtn?.addEventListener(
    "click",
    closeLetter
  );


  letterOverlay?.addEventListener(
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


  /* GALAXIA */

  galaxy?.addEventListener(
    "pointerdown",
    startDrag
  );


  galaxy?.addEventListener(
    "pointermove",
    moveDrag
  );


  galaxy?.addEventListener(
    "pointerup",
    endDrag
  );


  galaxy?.addEventListener(
    "pointercancel",
    endDrag
  );


  galaxy?.addEventListener(
    "lostpointercapture",
    endDrag
  );


  /* =======================================================
     CAMBIO AUTOMÁTICO DE MENSAJES
  ======================================================= */

  window.setInterval(
    rotateMessages,
    3500
  );


  /* =======================================================
     INICIALIZAR
  ======================================================= */

  updateGalaxyMessages();

})();
