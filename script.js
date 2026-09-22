/* =========================================================
   🌻 FLORES AMARILLAS — JAVASCRIPT COMPLETO Y COMPATIBLE
========================================================= */
(() => {
  "use strict";

  const CONFIG = {
    pageTitle: "Feliz Día de las Flores Amarillas 🌻",
    introTitle: "Feliz Día de las<br>Flores Amarillas",
    introText: "Preparé algo especial para ti",

    messageTitle:
      "Feliz Día de las<br><strong>Flores Amarillas</strong> 🌻",

    messageBody:
      "Que este pequeño detalle te recuerde lo especial que eres.",

    footer: "Hecho especialmente para ti ✨",

    flowerCount: 22,
    petalCount: 45,
    fireflyCount: 55,
    dustCount: 65,
    heartCount: 130,

    galaxyMessages: [
      "Para ti 💛",
      "Eres mi pequeño universo ✨",
      "Contigo todo brilla 💛",
      "Siempre florecerá algo bonito 🌼",
      "Que nunca falten sonrisas 🌻",
      "Un detalle hecho con cariño ✨",
      "Gracias por existir 💛",
      "Qué bonito coincidir contigo 🌼",
      "Siempre hay algo bonito 🌻",
      "Para hacerte sonreír ✨"
    ]
  };

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const rand = (min, max) =>
    Math.random() * (max - min) + min;

  const els = {
    scene: $("#scene"),
    intro: $("#intro"),
    garden: $("#garden"),
    openBtn: $("#openBtn"),
    replayBtn: $("#replayBtn"),

    flowers: $("#flowers"),
    petals: $("#petals"),
    fireflies: $("#fireflies"),
    goldDust: $("#goldDust"),
    particleHeart: $("#particleHeart"),

    galaxyScene: $("#galaxyScene"),
    galaxyHint: $("#galaxyHint"),

    letterBtn: $("#letterBtn"),
    letterOverlay: $("#letterOverlay"),
    closeLetter: $("#closeLetter"),

    introTitle: $("#introTitle"),
    introText: $("#introText"),
    messageTitle: $("#messageTitle"),
    messageBody: $("#messageBody"),
    footerNote: $("#footerNote")
  };

  let started = false;

  let galaxyAngle = 0;

  let pointerId = null;
  let pointerStartX = 0;
  let angleStart = 0;

  let hintTimer = null;

  /* =========================================================
     CONFIGURACIÓN DE TEXTOS
  ========================================================= */

  function applyConfig() {
    document.title = CONFIG.pageTitle;

    if (els.introTitle) {
      els.introTitle.innerHTML = CONFIG.introTitle;
    }

    if (els.introText) {
      els.introText.textContent = CONFIG.introText;
    }

    if (els.messageTitle) {
      els.messageTitle.innerHTML = CONFIG.messageTitle;
    }

    if (els.messageBody) {
      els.messageBody.textContent = CONFIG.messageBody;
    }

    if (els.footerNote) {
      els.footerNote.textContent = CONFIG.footer;
    }

    const texts = $$(".galaxy-orbit-text");

    texts.forEach((node, index) => {
      node.textContent =
        CONFIG.galaxyMessages[
          index % CONFIG.galaxyMessages.length
        ];
    });
  }

  /* =========================================================
     LIMPIAR ELEMENTOS GENERADOS
  ========================================================= */

  function clearGenerated() {
    [
      els.flowers,
      els.petals,
      els.fireflies,
      els.goldDust,
      els.particleHeart
    ].forEach(element => {
      if (element) {
        element.replaceChildren();
      }
    });
  }

  /* =========================================================
     FLORES
  ========================================================= */

  function buildFlowers() {
    if (!els.flowers) return;

    const fragment =
      document.createDocumentFragment();

    for (let i = 0; i < CONFIG.flowerCount; i++) {
      const flower =
        document.createElement("div");

      flower.className = "flower";

      flower.style.setProperty(
        "--left",
        `${rand(2, 98)}%`
      );

      flower.style.setProperty(
        "--bottom",
        `${rand(1, 16)}%`
      );

      flower.style.setProperty(
        "--size",
        `${rand(28, 58)}px`
      );

      flower.style.setProperty(
        "--sway",
        `${rand(2.8, 5.5)}s`
      );

      flower.style.setProperty(
        "--delay",
        `${rand(-5, 0)}s`
      );

      const stem =
        document.createElement("div");

      stem.className = "stem";

      const leftLeaf =
        document.createElement("div");

      leftLeaf.className = "leaf left";

      const rightLeaf =
        document.createElement("div");

      rightLeaf.className = "leaf right";

      const head =
        document.createElement("div");

      head.className = "head";

      for (let p = 0; p < 8; p++) {
        const petal =
          document.createElement("i");

        petal.className = "petal";

        head.appendChild(petal);
      }

      const center =
        document.createElement("i");

      center.className = "center";

      head.appendChild(center);

      flower.append(
        stem,
        leftLeaf,
        rightLeaf,
        head
      );

      fragment.appendChild(flower);
    }

    els.flowers.appendChild(fragment);
  }

  /* =========================================================
     PÉTALOS VOLANDO
  ========================================================= */

  function buildPetals() {
    if (!els.petals) return;

    const fragment =
      document.createDocumentFragment();

    for (let i = 0; i < CONFIG.petalCount; i++) {
      const petal =
        document.createElement("i");

      petal.className = "petal-float";

      petal.style.setProperty(
        "--left",
        `${rand(-5, 100)}%`
      );

      petal.style.setProperty(
        "--top",
        `${rand(-30, 40)}%`
      );

      petal.style.setProperty(
        "--size",
        `${rand(7, 16)}px`
      );

      petal.style.setProperty(
        "--duration",
        `${rand(9, 17)}s`
      );

      petal.style.setProperty(
        "--delay",
        `${rand(-18, 0)}s`
      );

      petal.style.setProperty(
        "--drift",
        `${rand(-120, 120)}px`
      );

      fragment.appendChild(petal);
    }

    els.petals.appendChild(fragment);
  }

  /* =========================================================
     LUCIÉRNAGAS
  ========================================================= */

  function buildFireflies() {
    if (!els.fireflies) return;

    const fragment =
      document.createDocumentFragment();

    for (let i = 0; i < CONFIG.fireflyCount; i++) {
      const fly =
        document.createElement("i");

      fly.className = "firefly";

      fly.style.setProperty(
        "--left",
        `${rand(3, 97)}%`
      );

      fly.style.setProperty(
        "--top",
        `${rand(15, 88)}%`
      );

      fly.style.setProperty(
        "--dx",
        `${rand(-35, 35)}px`
      );

      fly.style.setProperty(
        "--dy",
        `${rand(-30, 30)}px`
      );

      fly.style.setProperty(
        "--duration",
        `${rand(2.5, 6)}s`
      );

      fly.style.setProperty(
        "--delay",
        `${rand(-6, 0)}s`
      );

      fragment.appendChild(fly);
    }

    els.fireflies.appendChild(fragment);
  }

  /* =========================================================
     POLVO DORADO
  ========================================================= */

  function buildDust() {
    if (!els.goldDust) return;

    const fragment =
      document.createDocumentFragment();

    for (let i = 0; i < CONFIG.dustCount; i++) {
      const dot =
        document.createElement("i");

      dot.className = "dust";

      dot.style.left =
        `${rand(0, 100)}%`;

      dot.style.top =
        `${rand(0, 100)}%`;

      dot.style.setProperty(
        "--drift",
        `${rand(-20, 20)}px`
      );

      dot.style.setProperty(
        "--duration",
        `${rand(2, 6)}s`
      );

      dot.style.setProperty(
        "--delay",
        `${rand(-6, 0)}s`
      );

      fragment.appendChild(dot);
    }

    els.goldDust.appendChild(fragment);
  }

  /* =========================================================
     CORAZÓN DE PARTÍCULAS
  ========================================================= */

  function buildHeart() {
    if (!els.particleHeart) return;

    const fragment =
      document.createDocumentFragment();

    for (let i = 0; i < CONFIG.heartCount; i++) {
      const t =
        rand(0, Math.PI * 2);

      const scale =
        rand(0.35, 0.95);

      const x =
        16 *
        Math.pow(Math.sin(t), 3) *
        scale;

      const y =
        -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        ) *
        scale;

      const dot =
        document.createElement("i");

      dot.className = "heart-dot";

      dot.style.left =
        `${50 + x}%`;

      dot.style.top =
        `${50 + y}%`;

      dot.style.setProperty(
        "--delay",
        `${rand(-2.5, 0)}s`
      );

      fragment.appendChild(dot);
    }

    els.particleHeart.appendChild(fragment);
  }

  /* =========================================================
     CONSTRUIR TODA LA ESCENA
  ========================================================= */

  function buildScene() {
    clearGenerated();

    buildFlowers();
    buildPetals();
    buildFireflies();
    buildDust();
    buildHeart();
  }

  /* =========================================================
     GALAXIA
  ========================================================= */

  function setGalaxyAngle(angle) {
    galaxyAngle = angle;

    if (!els.galaxyScene) return;

    els.galaxyScene.style.setProperty(
      "--galaxy-rotation",
      `${angle}deg`
    );
  }

  function nextGalaxyMessage() {
    const texts =
      $$(".galaxy-orbit-text");

    if (!texts.length) return;

    const offset =
      Math.floor(galaxyAngle / 25);

    texts.forEach((node, index) => {
      node.textContent =
        CONFIG.galaxyMessages[
          (
            index +
            offset +
            CONFIG.galaxyMessages.length
          ) %
          CONFIG.galaxyMessages.length
        ];
    });
  }

  /* =========================================================
     ARRASTRAR GALAXIA
  ========================================================= */

  function bindGalaxyDrag() {
    if (!els.galaxyScene) return;

    els.galaxyScene.addEventListener(
      "pointerdown",
      event => {
        pointerId = event.pointerId;

        pointerStartX =
          event.clientX;

        angleStart =
          galaxyAngle;

        els.galaxyScene.classList.add(
          "dragging"
        );

        els.galaxyScene.setPointerCapture?.(
          pointerId
        );
      }
    );

    els.galaxyScene.addEventListener(
      "pointermove",
      event => {
        if (
          pointerId !==
          event.pointerId
        ) {
          return;
        }

        const delta =
          event.clientX -
          pointerStartX;

        setGalaxyAngle(
          angleStart +
          delta * 0.45
        );

        nextGalaxyMessage();
      }
    );

    const endDrag = event => {
      if (
        pointerId !==
        event.pointerId
      ) {
        return;
      }

      pointerId = null;

      els.galaxyScene.classList.remove(
        "dragging"
      );
    };

    els.galaxyScene.addEventListener(
      "pointerup",
      endDrag
    );

    els.galaxyScene.addEventListener(
      "pointercancel",
      endDrag
    );

    els.galaxyScene.addEventListener(
      "lostpointercapture",
      () => {
        pointerId = null;

        els.galaxyScene.classList.remove(
          "dragging"
        );
      }
    );
  }

  /* =========================================================
     MOSTRAR JARDÍN
  ========================================================= */

  function showGarden() {
    if (started) return;

    started = true;

    buildScene();

    els.intro.classList.add("hide");

    els.garden.classList.add("show");

    els.garden.setAttribute(
      "aria-hidden",
      "false"
    );

    clearTimeout(hintTimer);

    hintTimer =
      window.setTimeout(() => {
        if (els.galaxyHint) {
          els.galaxyHint.style.opacity =
            "0";
        }
      }, 5000);
  }

  /* =========================================================
     VER DE NUEVO
  ========================================================= */

  function replay() {
    started = false;

    closeLetter();

    clearTimeout(hintTimer);

    if (els.galaxyHint) {
      els.galaxyHint.style.opacity = "";
    }

    els.garden.classList.remove("show");

    els.garden.setAttribute(
      "aria-hidden",
      "true"
    );

    els.intro.classList.remove("hide");

    setGalaxyAngle(0);

    nextGalaxyMessage();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /* =========================================================
     CARTA
  ========================================================= */

  function openLetter() {
    if (!els.letterOverlay) return;

    els.letterOverlay.classList.add(
      "open"
    );

    els.letterOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

    if (els.closeLetter) {
      els.closeLetter.focus();
    }
  }

  function closeLetter() {
    if (!els.letterOverlay) return;

    els.letterOverlay.classList.remove(
      "open"
    );

    els.letterOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";
  }

  /* =========================================================
     EVENTOS
  ========================================================= */

  function bindEvents() {
    els.openBtn?.addEventListener(
      "click",
      showGarden
    );

    els.replayBtn?.addEventListener(
      "click",
      replay
    );

    els.letterBtn?.addEventListener(
      "click",
      openLetter
    );

    els.closeLetter?.addEventListener(
      "click",
      closeLetter
    );

    els.letterOverlay?.addEventListener(
      "click",
      event => {
        if (
          event.target ===
          els.letterOverlay
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

    bindGalaxyDrag();
  }

  /* =========================================================
     INICIAR
  ========================================================= */

  applyConfig();
  bindEvents();

})();
