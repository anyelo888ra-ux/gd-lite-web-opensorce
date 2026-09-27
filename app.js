document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const streamPlayer = document.getElementById('stream-player');
  const connectionStatus = document.getElementById('connection-status');

  // GitHub Pages only hosts the frontend. A real Android streaming backend
  // can be supplied with window.GDLITE_EMULATOR_URL.
  // The local fallback is a real file, not a directory URL, so GitHub Pages
  // does not depend on directory-index behavior.
  const EMULATOR_URL = window.GDLITE_EMULATOR_URL || './emulator/emulator.html';

  function setStatus(message, state = 'loading') {
    if (!connectionStatus) return;
    connectionStatus.textContent = message;
    connectionStatus.dataset.state = state;
  }

  function showBackendPlaceholder() {
    streamPlayer.innerHTML = `
      <div class="emulator-offline">
        <h2>Android emulator no disponible</h2>
        <p>La ruta de prueba está disponible, pero todavía no hay un servidor Android conectado.</p>
        <small>El APK debe ejecutarse dentro de un entorno Android; GitHub Pages solo sirve esta interfaz.</small>
      </div>
    `;

    setStatus('Esperando servidor Android…', 'error');
    console.warn('[GDLite] No Android streaming endpoint configured.');
  }

  function loadEmulator() {
    setStatus('Abriendo emulador…', 'loading');
    streamPlayer.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = EMULATOR_URL;
    iframe.title = 'GDLite Android Emulator';
    iframe.allow = 'fullscreen; autoplay';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer';
    iframe.loading = 'eager';

    iframe.addEventListener('load', () => {
      setStatus('Interfaz del emulador cargada.', 'ok');
      console.log('[GDLite] Emulator endpoint loaded:', EMULATOR_URL);
    });

    iframe.addEventListener('error', () => {
      setStatus('No se pudo cargar el emulador.', 'error');
      console.error('[GDLite] Emulator endpoint failed:', EMULATOR_URL);
      showBackendPlaceholder();
    });

    streamPlayer.appendChild(iframe);
  }

  if (!btnAccept || !streamPlayer) {
    console.error('[GDLite] Missing required UI elements.');
    return;
  }

  btnAccept.addEventListener('click', () => {
    if (modal) modal.style.display = 'none';
    loadEmulator();
  });
});
