# 🎮 GDLite Web Edition — Open Source Beta

GDLite Web Edition es un proyecto experimental para ejecutar una versión de Geometry Dash Lite para Android desde una interfaz web. El repositorio separa el frontend estático del backend Android.

> ⚠️ Estado: beta experimental. GitHub Pages solo sirve el frontend; no ejecuta Android, Docker, ADB ni APKs.

## 🧱 Arquitectura
```
Navegador → GitHub Pages → Backend Android → Android + APK externo
                         ├─ Redroid
                         ├─ ADB
                         └─ scrcpy-web / streaming
```

## 🚀 Funciones
- 🖥️ Android accesible desde navegador mediante backend de streaming.
- 🖱️ Hooks de click/pointer.
- ⌨️ Hooks de teclado (`keydown`/`keyup`).
- 📱 Controles táctiles básicos para móvil.
- 🔌 URL configurable para el backend.
- ❤️ Health check opcional mediante `/health`.
- 📊 Panel de estado Android / ADB / streaming.
- 🔄 Reconexión automática.
- 📝 Logs del frontend y diagnóstico.
- 🧪 `scripts/diagnose-android.sh`.
- 🐳 Docker Compose reproducible.
- 📚 Documentación.
- 🔐 APK externo; no se almacena en el repositorio.

## 🖱️ Input
El frontend prepara eventos `keyDown`, `keyUp`, `pointerDown` y `pointerUp` mediante `postMessage`. El backend/streaming debe implementar la traducción real de esos eventos a Android.

## ❤️ Health API
Configura `window.GDLITE_HEALTH_URL` con la URL de `/health` del backend. Si no se configura, el frontend usa el fallback local.

## 🐳 Backend local
```bash
docker compose up -d
docker compose ps
./scripts/diagnose-android.sh
```

Dependiendo del host, Redroid/Android puede requerir permisos de contenedor y soporte de virtualización. GitHub Pages no puede ejecutar esta parte.

## 📦 APK externo
El repositorio no incluye ni distribuye un APK propietario. Para pruebas locales, proporciona un APK que tengas derecho a utilizar en `/scripts/gd-lite.apk`. El paquete puede configurarse mediante `ANDROID_PACKAGE`.

## 📁 Estructura
- `index.html` — interfaz y controles.
- `app.js` — conexión, health check, reconexión e input.
- `styles.css` — interfaz responsive.
- `docker-compose.yml` — Android + streaming local.
- `Dockerfile` — imagen experimental basada en docker-android.
- `scripts/start-gdlite.sh` — arranque experimental.
- `scripts/diagnose-android.sh` — diagnóstico.
- `scripts/init-android.sh` — instalación/inicio del APK externo.
- `emulator/` — páginas frontend de prueba.
- `render.yaml` — configuración experimental de Render.

## 🧪 Estado
La prioridad es conseguir un backend Android reproducible localmente. Después se puede evaluar un proveedor de hosting compatible.

## 🤝 Contribuir
1. Haz un fork.
2. Crea una rama.
3. Realiza el cambio.
4. Prueba localmente.
5. Abre un Pull Request describiendo el cambio.

## 📜 Licencia
Este proyecto es de código abierto bajo la licencia MIT.