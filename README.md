# 🎮 GDLite Web Edition — Open Source Beta

GDLite Web Edition es un proyecto experimental que intenta ejecutar una versión de **Geometry Dash Lite para Android** desde una interfaz web. La web está pensada como frontend y el proyecto incluye configuraciones para probar un backend Android mediante Docker.

> ⚠️ **Estado actual:** beta experimental. GitHub Pages solamente sirve la interfaz web; no ejecuta Android ni el APK. La carpeta `emulator/` contiene una página placeholder para evitar errores 404 mientras no exista un backend de streaming conectado.

## 🚀 Características

- 🌐 Interfaz web estática compatible con GitHub Pages.
- 🛡️ Aviso de seguridad antes de iniciar la sesión.
- 📡 Estado de conexión del backend.
- 🖥️ Carga de un endpoint Android mediante `iframe`.
- 🧪 Ruta `/emulator/` disponible como fallback de prueba.
- 🐳 Dockerfile preparado para un entorno Android.
- 🔌 Docker Compose con Android/Redroid y un servicio de streaming.
- 📱 Soporte para proporcionar un APK externamente, sin incluirlo en el repositorio.

## 🧩 Cómo funciona

La arquitectura de la beta está separada en varias partes:

```
Navegador
   ↓
GitHub Pages
   ↓
Frontend (index.html + app.js + styles.css)
   ↓
Backend Android / streaming
   ↓
Android
   ↓
APK de GDLite
```

**Importante:** un APK por sí solo no sustituye Android. El APK necesita un entorno Android para ejecutarse.

## 📁 Estructura principal

- `index.html` — interfaz principal y aviso de seguridad.
- `styles.css` — estilos de la interfaz.
- `app.js` — conexión y carga del endpoint Android.
- `emulator/index.html` — placeholder de la ruta del emulador para evitar 404 durante la beta.
- `emulator/temp.txt` — marcador de la carpeta del emulador.
- `Dockerfile` — imagen base para el entorno Android.
- `docker-compose.yml` — configuración de Android/Redroid y streaming local.
- `render.yaml` — configuración de prueba para desplegar el backend en Render.
- `scripts/init-android.sh` — conecta con ADB, instala un APK proporcionado externamente y lo intenta iniciar.

## 🔧 Configurar un backend Android

El frontend puede utilizar una URL de backend personalizada definiendo:

```js
window.GDLITE_EMULATOR_URL = 'https://tu-backend.example';
```

Si no se define, la beta utiliza `./emulator/`, que actualmente es solamente el placeholder.

El backend debe proporcionar realmente una interfaz de Android/streaming. Crear la carpeta `emulator/` en GitHub Pages no convierte esa carpeta en un emulador.

## 📦 APK

El repositorio **no incluye ni distribuye un APK propietario**.

Para las pruebas locales, coloca un APK de Geometry Dash Lite que tengas derecho a utilizar en la ruta esperada por el script:

```
/scripts/gd-lite.apk
```

El script utiliza ADB para instalarlo en el dispositivo Android de prueba.

## 🧪 Beta y limitaciones conocidas

- El backend Android puede no estar disponible durante las pruebas.
- GitHub Pages no puede ejecutar Docker, Android ni ADB.
- Render se utiliza como entorno de prueba cuando hay un backend compatible desplegado.
- El streaming depende de la configuración y disponibilidad del backend.
- La ruta `/emulator/` es un fallback visual, no un Android real.
- El proyecto todavía necesita pruebas de extremo a extremo con un backend Android activo.

## 🤝 Cómo colaborar

1. Haz un **Fork** del repositorio.
2. Crea una rama para tu cambio:
   ```bash
   git checkout -b feature/nueva-mejora
   ```
3. Realiza tus cambios y crea un commit:
   ```bash
   git commit -m "Añade nueva funcionalidad"
   ```
4. Publica la rama:
   ```bash
   git push origin feature/nueva-mejora
   ```
5. Abre un Pull Request.

## 📜 Licencia

Este proyecto es de código abierto bajo la licencia **MIT**.
