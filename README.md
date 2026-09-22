# 🌼 Sorpresa de flores amarillas

Página web estática e interactiva inspirada en la idea del video de referencia: la persona entra desde un link, pulsa un botón y aparece una escena animada con flores amarillas, partículas, luciérnagas y un mensaje.

## 1. Personalizar

Abre `script.js` y modifica solamente el bloque `CONFIG` del principio:

```js
const CONFIG = {
  pageTitle: "Una sorpresa para ti 🌼",
  introTitle: "Una pequeña sorpresa 🌼",
  introText: "Entra y mira lo que preparé para ti.",
  messageTitle: "Flores amarillas para alegrarte el día",
  messageBody: "Tu mensaje personalizado aquí.",
  footer: "Hecho especialmente para ti ✨",
  flowerCount: 18,
  petalCount: 18,
  fireflyCount: 26
};
```

No necesitas instalar Node, npm ni ninguna dependencia para esta versión.

## 2. Probar en Android/Termux

Entra a la carpeta y ejecuta:

```bash
cd ~/flores_site
python -m http.server 8080
```

Después abre en el navegador:

```text
http://localhost:8080
```

Para detener el servidor: `Ctrl + C`.

## 3. Subir a GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `flores-amarillas`.
2. Sube `index.html`, `style.css`, `script.js` y `README.md`.
3. En el repositorio entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama principal (`main`) y la carpeta `/ (root)`.
6. Guarda y espera a que GitHub genere tu página.

El enlace tendrá una forma parecida a:

`https://TU-USUARIO.github.io/flores-amarillas/`

## 4. Personalización avanzada

Puedes cambiar el número de flores, pétalos y luciérnagas desde `CONFIG`.

Si después quieres añadir fotos, una carta, un botón de música o varias pantallas, se puede ampliar esta misma estructura.

## Nota

La animación es original y no necesita el video de referencia para funcionar. Si quieres usar una canción, añade solamente audio que tengas derecho a utilizar y modifica el proyecto para cargar ese archivo.
