const CONFIG = {
  pageTitle: "Una sorpresa para ti 🌼",
  introTitle: "Una pequeña sorpresa 🌼",
  introText: "Entra y mira lo que preparé para ti.",
  messageTitle: "Flores amarillas para alegrarte el día",
  messageBody: "Que cada flor represente un momento bonito, una sonrisa y un recuerdo que quieras guardar.",
  footer: "Hecho especialmente para ti ✨",
  flowerCount: 18,
  petalCount: 18,
  fireflyCount: 26
};

const $ = (id) => document.getElementById(id);

document.title = CONFIG.pageTitle;
$("introTitle").textContent = CONFIG.introTitle;
$("introText").textContent = CONFIG.introText;
$("messageTitle").textContent = CONFIG.messageTitle;
$("messageBody").textContent = CONFIG.messageBody;
$("footerNote").textContent = CONFIG.footer;

const flowers = $("flowers");
const petals = $("petals");
const fireflies = $("fireflies");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createFlower(index) {
  const el = document.createElement("div");
  el.className = "flower";

  el.style.setProperty("--left", `${rand(-4, 96)}%`);
  el.style.setProperty("--base", `${rand(0, 18)}px`);
  el.style.setProperty("--scale", rand(.45, 1.05).toFixed(2));
  el.style.setProperty("--rot", `${rand(-8, 8).toFixed(1)}deg`);
  el.style.setProperty(
    "--delay",
    `${(index * .11 + rand(0, .45)).toFixed(2)}s`
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

function createPetals() {
  for (let i = 0; i < CONFIG.petalCount; i++) {
    const el = document.createElement("i");
    el.className = "petal-float";

    el.style.setProperty("--left", `${rand(0, 100)}%`);
    el.style.setProperty("--duration", `${rand(7, 14).toFixed(1)}s`);
    el.style.setProperty("--delay", `${rand(-12, 0).toFixed(1)}s`);
    el.style.setProperty("--drift", `${rand(-140, 140).toFixed(0)}px`);

    petals.appendChild(el);
  }
}

function createFireflies() {
  for (let i = 0; i < CONFIG.fireflyCount; i++) {
    const el = document.createElement("i");
    el.className = "firefly";

    el.style.setProperty("--left", `${rand(2, 98)}%`);
    el.style.setProperty("--top", `${rand(35, 92)}%`);
    el.style.setProperty("--duration", `${rand(1.4, 3.5).toFixed(2)}s`);
    el.style.setProperty("--delay", `${rand(0, 3).toFixed(2)}s`);

    fireflies.appendChild(el);
  }
}

function buildScene() {
  flowers.innerHTML = "";
  petals.innerHTML = "";
  fireflies.innerHTML = "";

  for (let i = 0; i < CONFIG.flowerCount; i++) {
    createFlower(i);
  }

  createPetals();
  createFireflies();
}

function openSurprise() {
  $("intro").classList.add("hide");
  $("garden").classList.add("show");
  $("garden").setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    $("messageCard").scrollIntoView({
      block: "center"
    });
  }, 100);
}

function replay() {
  $("garden").classList.remove("show");
  $("intro").classList.remove("hide");
  $("garden").setAttribute("aria-hidden", "true");

  window.setTimeout(buildScene, 450);
}

$("openBtn").addEventListener("click", openSurprise);
$("replayBtn").addEventListener("click", replay);

buildScene();
