/* =========================================================
   FLORES AMARILLAS 🌻
   SCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  /* =======================================================
     1. ELEMENTOS PRINCIPALES
  ======================================================= */

  const scene = document.getElementById("scene");
  const intro = document.getElementById("intro");
  const openBtn = document.getElementById("openBtn");
  const garden = document.getElementById("garden");

  const galaxyWrapper = document.getElementById("galaxyWrapper");
  const galaxyScene = document.getElementById("galaxyScene");
  const galaxyHint = document.getElementById("galaxyHint");

  const particleHeart = document.getElementById("particleHeart");
  const flowersContainer = document.getElementById("flowers");
  const petalsContainer = document.getElementById("petals");
  const firefliesContainer = document.getElementById("fireflies");
  const goldDust = document.getElementById("goldDust");

  const letterBtn = document.getElementById("letterBtn");
  const letterOverlay = document.getElementById("letterOverlay");
  const closeLetter = document.getElementById("closeLetter");

  const replayBtn = document.getElementById("replayBtn");

  const introTitle = document.getElementById("introTitle");
  const introText = document.getElementById("introText");
  const messageTitle = document.getElementById("messageTitle");
  const messageBody = document.getElementById("messageBody");
  const footerNote = document.getElementById("footerNote");


  /* =======================================================
     2. CONFIGURACIÓN
  ======================================================= */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let gardenStarted = false;
  let animationFrame = null;

  let galaxyRotation = 0;
  let galaxyTilt = 60;

  let velocityRotation = 0;
  let velocityTilt = 0;

  let isDragging = false;

  let startX = 0;
  let startY = 0;

  let lastX = 0;
  let lastY = 0;

  let lastMoveTime = 0;

  let hintTimer = null;

  const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches;


  /* =======================================================
     3. UTILIDADES
  ======================================================= */

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function setStyleVariable(element, name, value) {
    if (!element) return;
    element.style.setProperty(name, value);
  }


  /* =======================================================
     4. PREPARAR ESCENA
  ======================================================= */

  if (scene) {
    scene.classList.add("js-ready");
  }

  if (garden) {
    garden.setAttribute("aria-hidden", "true");
  }

  if (letterOverlay) {
    letterOverlay.setAttribute("aria-hidden", "true");
  }


  /* =======================================================
     5. EFECTO DE ESCRITURA
  ======================================================= */

  function typeText(element, text, speed = 35) {

    if (!element || reducedMotion) {
      if (element) {
        element.textContent = text;
      }
      return;
    }

    element.textContent = "";

    let index = 0;

    const timer = setInterval(() => {

      element.textContent += text.charAt(index);
      index++;

      if (index >= text.length) {
        clearInterval(timer);
      }

    }, speed);
  }


  /* =======================================================
     6. ABRIR EL JARDÍN
  ======================================================= */

  function openGarden() {

    if (gardenStarted) return;

    gardenStarted = true;

    if (intro) {
      intro.classList.add("hide");
    }

    if (garden) {
      garden.classList.add("show");
      garden.setAttribute("aria-hidden", "false");
    }

    document.body.classList.add("garden-open");

    createFlowers();
    createPetals();
    createFireflies();
    createGoldDust();

    startGalaxyAnimation();
    startHeartAnimation();

    if (messageBody && !reducedMotion) {

      const originalText =
        messageBody.textContent.trim().replace(/\s+/g, " ");

      setTimeout(() => {
        typeText(messageBody, originalText, 28);
      }, 900);
    }

    showGalaxyHint();

    setTimeout(() => {
      if (footerNote) {
        footerNote.classList.add("visible");
      }
    }, 2200);
  }


  /* =======================================================
     7. BOTÓN INICIAR
  ======================================================= */

  if (openBtn) {

    openBtn.addEventListener("click", () => {

      openBtn.classList.add("pressed");

      setTimeout(() => {
        openGarden();
      }, reducedMotion ? 0 : 450);

    });

  }


  /* =======================================================
     8. GALAXIA — ANIMACIÓN AUTOMÁTICA
  ======================================================= */

  function updateGalaxyTransform() {

    if (!galaxyScene) return;

    const viewportWidth = window.innerWidth;

    let baseTilt = viewportWidth <= 600 ? 62 : 60;

    const finalTilt =
      clamp(baseTilt + galaxyTilt - 60, 40, 82);

    galaxyScene.style.transform =
      `translate(-50%, -50%)
       rotateX(${finalTilt}deg)
       rotateZ(${galaxyRotation}deg)
       rotateY(${galaxyTilt - 60}deg)`;

  }


  function startGalaxyAnimation() {

    if (!galaxyScene) return;

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    let previousTime = performance.now();

    function animate(currentTime) {

      const delta =
        Math.min((currentTime - previousTime) / 16.6667, 3);

      previousTime = currentTime;

      if (!isDragging) {

        if (!reducedMotion) {

          /* Rotación automática */
          galaxyRotation += 0.055 * delta;

          /* Inercia después de arrastrar */
          galaxyRotation += velocityRotation * delta;
          galaxyTilt += velocityTilt * delta;

          velocityRotation *= Math.pow(0.94, delta);
          velocityTilt *= Math.pow(0.94, delta);

          galaxyTilt = clamp(
            galaxyTilt,
            45,
            75
          );

        }

      }

      updateGalaxyTransform();

      animationFrame =
        requestAnimationFrame(animate);
    }

    animationFrame =
      requestAnimationFrame(animate);
  }


  /* =======================================================
     9. GALAXIA — ARRASTRAR CON RATÓN / TÁCTIL
  ======================================================= */

  if (galaxyWrapper) {

    galaxyWrapper.style.touchAction = "none";

    galaxyWrapper.addEventListener(
      "pointerdown",
      (event) => {

        if (!gardenStarted) return;

        isDragging = true;

        startX = event.clientX;
        startY = event.clientY;

        lastX = event.clientX;
        lastY = event.clientY;

        lastMoveTime = performance.now();

        velocityRotation = 0;
        velocityTilt = 0;

        galaxyWrapper.classList.add("dragging");

        try {
          galaxyWrapper.setPointerCapture(event.pointerId);
        } catch (error) {
          /* Algunos navegadores no soportan pointer capture */
        }

        hideGalaxyHint();

        event.preventDefault();
      },
      { passive: false }
    );


    galaxyWrapper.addEventListener(
      "pointermove",
      (event) => {

        if (!isDragging) return;

        const now = performance.now();

        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;

        const elapsed =
          Math.max(now - lastMoveTime, 8);

        galaxyRotation += dx * 0.45;

        galaxyTilt += dy * 0.16;

        galaxyTilt = clamp(
          galaxyTilt,
          40,
          80
        );

        velocityRotation =
          (dx / elapsed) * 0.65;

        velocityTilt =
          (dy / elapsed) * 0.10;

        lastX = event.clientX;
        lastY = event.clientY;

        lastMoveTime = now;

        updateGalaxyTransform();

        event.preventDefault();

      },
      { passive: false }
    );


    function stopDragging(event) {

      if (!isDragging) return;

      isDragging = false;

      galaxyWrapper.classList.remove("dragging");

      try {
        galaxyWrapper.releasePointerCapture(event.pointerId);
      } catch (error) {
        /* Nada que hacer */
      }

    }


    galaxyWrapper.addEventListener(
      "pointerup",
      stopDragging
    );

    galaxyWrapper.addEventListener(
      "pointercancel",
      stopDragging
    );

    galaxyWrapper.addEventListener(
      "pointerleave",
      (event) => {

        if (
          isDragging &&
          event.pointerType === "mouse"
        ) {
          stopDragging(event);
        }

      }
    );

  }


  /* =======================================================
     10. MENSAJE DE LA GALAXIA
  ======================================================= */

  function showGalaxyHint() {

    if (!galaxyHint) return;

    clearTimeout(hintTimer);

    galaxyHint.classList.remove("hide");

    hintTimer = setTimeout(() => {
      hideGalaxyHint();
    }, 5000);
  }


  function hideGalaxyHint() {

    if (!galaxyHint) return;

    galaxyHint.classList.add("hide");
  }


  /* =======================================================
     11. CREAR GIRASOLES DEL JARDÍN
  ======================================================= */

  function createFlowers() {

    if (!flowersContainer) return;

    flowersContainer.innerHTML = "";

    const width = window.innerWidth;

    let count;

    if (width < 400) {
      count = 7;
    } else if (width < 700) {
      count = 10;
    } else if (width < 1100) {
      count = 14;
    } else {
      count = 20;
    }

    for (let i = 0; i < count; i++) {

      const flower = document.createElement("div");

      flower.className = "flower";

      const size =
        width < 500
          ? random(28, 54)
          : random(38, 76);

      const left =
        random(2, 98);

      const bottom =
        random(-2, 32);

      const sway =
        random(3.5, 7.5);

      const delay =
        random(0, 5);

      const rotation =
        random(-18, 18);

      setStyleVariable(
        flower,
        "--left",
        `${left}%`
      );

      setStyleVariable(
        flower,
        "--bottom",
        `${bottom}%`
      );

      setStyleVariable(
        flower,
        "--size",
        `${size}px`
      );

      setStyleVariable(
        flower,
        "--sway",
        `${sway}s`
      );

      setStyleVariable(
        flower,
        "--delay",
        `${delay}s`
      );

      setStyleVariable(
        flower,
        "--rotation",
        `${rotation}deg`
      );

      flower.innerHTML = `
        <div class="flower-stem"></div>
        <div class="flower-head">
          <span class="petal p1"></span>
          <span class="petal p2"></span>
          <span class="petal p3"></span>
          <span class="petal p4"></span>
          <span class="petal p5"></span>
          <span class="petal p6"></span>
          <span class="petal p7"></span>
          <span class="petal p8"></span>
          <span class="flower-center"></span>
        </div>
      `;

      flowersContainer.appendChild(flower);
    }
  }


  /* =======================================================
     12. PÉTALOS VOLANDO
  ======================================================= */

  function createPetals() {

    if (!petalsContainer) return;

    petalsContainer.innerHTML = "";

    const width = window.innerWidth;

    const count =
      width < 500 ? 18 :
      width < 900 ? 26 :
      36;

    for (let i = 0; i < count; i++) {

      const petal =
        document.createElement("span");

      petal.className = "petal-float";

      const left =
        random(-5, 105);

      const size =
        width < 500
          ? random(7, 15)
          : random(8, 19);

      const duration =
        random(7, 16);

      const delay =
        random(-16, 10);

      const drift =
        random(-180, 180);

      const rotate =
        random(0, 720);

      setStyleVariable(
        petal,
        "--left",
        `${left}%`
      );

      setStyleVariable(
        petal,
        "--size",
        `${size}px`
      );

      setStyleVariable(
        petal,
        "--duration",
        `${duration}s`
      );

      setStyleVariable(
        petal,
        "--delay",
        `${delay}s`
      );

      setStyleVariable(
        petal,
        "--drift",
        `${drift}px`
      );

      setStyleVariable(
        petal,
        "--rotate",
        `${rotate}deg`
      );

      petal.style.animationDelay =
        `${delay}s`;

      petalsContainer.appendChild(petal);
    }
  }


  /* =======================================================
     13. LUCIÉRNAGAS
  ======================================================= */

  function createFireflies() {

    if (!firefliesContainer) return;

    firefliesContainer.innerHTML = "";

    const width = window.innerWidth;

    const count =
      width < 500 ? 18 :
      width < 900 ? 28 :
      42;

    for (let i = 0; i < count; i++) {

      const firefly =
        document.createElement("span");

      firefly.className = "firefly";

      setStyleVariable(
        firefly,
        "--left",
        `${random(2, 98)}%`
      );

      setStyleVariable(
        firefly,
        "--top",
        `${random(5, 88)}%`
      );

      setStyleVariable(
        firefly,
        "--size",
        `${random(2, 6)}px`
      );

      setStyleVariable(
        firefly,
        "--duration",
        `${random(3, 8)}s`
      );

      setStyleVariable(
        firefly,
        "--delay",
        `${random(-8, 2)}s`
      );

      firefliesContainer.appendChild(firefly);
    }
  }


  /* =======================================================
     14. POLVO DORADO
  ======================================================= */

  function createGoldDust() {

    if (!goldDust) return;

    goldDust.innerHTML = "";

    const width = window.innerWidth;

    const count =
      width < 500 ? 35 :
      width < 900 ? 55 :
      80;

    for (let i = 0; i < count; i++) {

      const particle =
        document.createElement("span");

      particle.className = "dust-particle";

      setStyleVariable(
        particle,
        "--left",
        `${random(0, 100)}%`
      );

      setStyleVariable(
        particle,
        "--top",
        `${random(0, 100)}%`
      );

      setStyleVariable(
        particle,
        "--size",
        `${random(1, 4)}px`
      );

      setStyleVariable(
        particle,
        "--duration",
        `${random(4, 10)}s`
      );

      setStyleVariable(
        particle,
        "--delay",
        `${random(-10, 0)}s`
      );

      goldDust.appendChild(particle);
    }
  }


  /* =======================================================
     15. CORAZÓN / PARTÍCULAS
  ======================================================= */

  function startHeartAnimation() {

    if (!particleHeart) return;

    particleHeart.innerHTML = "";

    const symbols = [
      "💛",
      "✨",
      "🌼",
      "🌻",
      "♡"
    ];

    const count =
      reducedMotion ? 4 : 12;

    for (let i = 0; i < count; i++) {

      const item =
        document.createElement("span");

      item.textContent =
        symbols[
          randomInt(0, symbols.length - 1)
        ];

      item.style.left =
        `${random(10, 90)}%`;

      item.style.top =
        `${random(20, 80)}%`;

      item.style.animationDelay =
        `${random(-6, 0)}s`;

      item.style.animationDuration =
        `${random(4, 8)}s`;

      particleHeart.appendChild(item);
    }
  }


  /* =======================================================
     16. CARTA
  ======================================================= */

  function openLetter() {

    if (!letterOverlay) return;

    letterOverlay.classList.add("show");

    letterOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("letter-open");

    if (closeLetter) {
      setTimeout(() => {
        closeLetter.focus();
      }, 150);
    }
  }


  function closeLetterModal() {

    if (!letterOverlay) return;

    letterOverlay.classList.remove("show");

    letterOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "letter-open"
    );

    if (letterBtn) {
      setTimeout(() => {
        letterBtn.focus();
      }, 100);
    }
  }


  if (letterBtn) {

    letterBtn.addEventListener(
      "click",
      openLetter
    );

  }


  if (closeLetter) {

    closeLetter.addEventListener(
      "click",
      closeLetterModal
    );

  }


  if (letterOverlay) {

    letterOverlay.addEventListener(
      "click",
      (event) => {

        if (
          event.target === letterOverlay
        ) {
          closeLetterModal();
        }

      }
    );

  }


  /* =======================================================
     17. TECLA ESC PARA CERRAR CARTA
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        if (
          letterOverlay &&
          letterOverlay.classList.contains("show")
        ) {
          closeLetterModal();
        }

      }

    }
  );


  /* =======================================================
     18. REPLAY
  ======================================================= */

  function replay() {

    document.body.classList.remove(
      "garden-open",
      "letter-open"
    );

    closeLetterModal();

    gardenStarted = false;

    galaxyRotation = 0;
    galaxyTilt = 60;

    velocityRotation = 0;
    velocityTilt = 0;

    isDragging = false;

    if (footerNote) {
      footerNote.classList.remove("visible");
    }

    if (galaxyHint) {
      galaxyHint.classList.remove("hide");
    }

    if (garden) {
      garden.classList.remove("show");
      garden.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    if (intro) {
      intro.classList.remove("hide");
    }

    if (openBtn) {
      openBtn.classList.remove("pressed");
    }

    if (flowersContainer) {
      flowersContainer.innerHTML = "";
    }

    if (petalsContainer) {
      petalsContainer.innerHTML = "";
    }

    if (firefliesContainer) {
      firefliesContainer.innerHTML = "";
    }

    if (goldDust) {
      goldDust.innerHTML = "";
    }

    if (particleHeart) {
      particleHeart.innerHTML = "";
    }

    updateGalaxyTransform();

    window.scrollTo({
      top: 0,
      behavior: reducedMotion
        ? "auto"
        : "smooth"
    });

    setTimeout(() => {

      if (openBtn) {
        openBtn.focus();
      }

    }, 500);
  }


  if (replayBtn) {

    replayBtn.addEventListener(
      "click",
      replay
    );

  }


  /* =======================================================
     19. REDIMENSIONAR PANTALLA
  ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {

        if (!gardenStarted) return;

        createFlowers();
        createPetals();
        createFireflies();
        createGoldDust();

        updateGalaxyTransform();

      }, 250);

    }
  );


    /* =======================================================
     20. ORIENTACIÓN DEL TELÉFONO
  ======================================================= */

  window.addEventListener(
    "orientationchange",
    () => {

      setTimeout(() => {

        if (gardenStarted) {

          createFlowers();
          createPetals();
          createFireflies();
          createGoldDust();

          updateGalaxyTransform();
        }

      }, 400);

    }
  );


  /* =======================================================
     21. MOVIMIENTO SUAVE DE TEXTOS FLOTANTES
  ======================================================= */

  function prepareFloatingTexts() {

    const texts =
      document.querySelectorAll(
        ".floating-text"
      );

    texts.forEach((text, index) => {

      const delay =
        random(-8, 0);

      const duration =
        random(5, 10);

      text.style.setProperty(
        "--float-delay",
        `${delay}s`
      );

      text.style.setProperty(
        "--float-duration",
        `${duration}s`
      );

      text.style.setProperty(
        "--float-index",
        index
      );

    });
  }

  prepareFloatingTexts();


  /* =======================================================
     22. ESTRELLAS DE LA GALAXIA
  ======================================================= */

  function prepareGalaxyStars() {

    if (!galaxyScene) return;

    const stars =
      galaxyScene.querySelectorAll(
        ".floating-star"
      );

    stars.forEach((star, index) => {

      star.style.animationDelay =
        `${random(-5, 0)}s`;

      star.style.animationDuration =
        `${random(2.5, 6)}s`;

      star.style.setProperty(
        "--star-index",
        index
      );

    });
  }

  prepareGalaxyStars();


  /* =======================================================
     23. EFECTO HOVER EN GIRASOLES
  ======================================================= */

  const sunflowers =
    document.querySelectorAll(
      ".sunflower"
    );

  sunflowers.forEach((sunflower) => {

    sunflower.addEventListener(
      "pointerenter",
      () => {

        sunflower.classList.add(
          "flower-hover"
        );

      }
    );

    sunflower.addEventListener(
      "pointerleave",
      () => {

        sunflower.classList.remove(
          "flower-hover"
        );

      }
    );

  });


  /* =======================================================
     24. EVITAR SELECCIÓN DURANTE DRAG
  ======================================================= */

  if (galaxyWrapper) {

    galaxyWrapper.addEventListener(
      "selectstart",
      (event) => {

        if (isDragging) {
          event.preventDefault();
        }

      }
    );

  }


  /* =======================================================
     25. ACCESIBILIDAD
  ======================================================= */

  if (letterOverlay) {

    letterOverlay.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key !== "Tab" ||
          !letterOverlay.classList.contains("show")
        ) {
          return;
        }

        const focusable =
          letterOverlay.querySelectorAll(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
          );

        if (!focusable.length) return;

        const first = focusable[0];
        const last =
          focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {

          event.preventDefault();
          last.focus();

        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {

          event.preventDefault();
          first.focus();

        }

      }
    );

  }


  /* =======================================================
     26. TEXTO INTRODUCTORIO
  ======================================================= */

  if (introTitle) {
    introTitle.setAttribute(
      "data-ready",
      "true"
    );
  }

  if (introText) {
    introText.setAttribute(
      "data-ready",
      "true"
    );
  }


  /* =======================================================
     27. EVITAR SCROLL CUANDO SE ARRASTRA LA GALAXIA
  ======================================================= */

  document.addEventListener(
    "touchmove",
    (event) => {

      if (isDragging) {
        event.preventDefault();
      }

    },
    { passive: false }
  );


  /* =======================================================
     28. INICIALIZACIÓN
  ======================================================= */

  updateGalaxyTransform();

  if (isTouchDevice && galaxyHint) {
    galaxyHint.textContent =
      "✨ Desliza para mover la galaxia ✨";
  }


  /* =======================================================
     29. PRE-CARGA VISUAL
  ======================================================= */

  if (garden) {
    garden.style.visibility = "visible";
  }


  /* =======================================================
     30. LIMPIEZA AL SALIR
  ======================================================= */

  window.addEventListener(
    "beforeunload",
    () => {

      if (animationFrame) {
        cancelAnimationFrame(
          animationFrame
        );
      }

    }
  );

});
