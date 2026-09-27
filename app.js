document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const streamPlayer = document.getElementById('stream-player');
  const connectionStatus = document.getElementById('connection-status');

  // GitHub Pages only hosts the frontend. A real Android streaming backend
  // can be supplied with window.GDLITE_EMULATOR_URL.
  const EMULATOR_URL = window.GDLITE_EMULATOR_URL || './emulator/';

  function setStatus(message, state = 'loading') {
    if (!connectionStatus) return;
    connectionStatus.textContent = message;
    connectionStatus.dataset.state = state;
  }

  function showBackendPlaceholder() {
    streamPlayer.innerHTML = `
      <div class="emulator-offline">
        <h2>Android emulator no disponible</h2>
        <p>La página web está funcionando, pero todavía no hay un servidor Android conectado.</p>
        <small>La ruta de prueba está disponible mientras configuramos el backend de streaming.</small>
      </div>
    `;

    setStatus('Esperando servidor Android…', 'error');
    console.warn('[GDLite] No Android streaming endpoint configured.');
  }

  function loadEmulator() {
    setStatus('Conectando con Android…', 'loading');
    streamPlayer.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = EMULATOR_URL;
    iframe.title = 'GDLite Android';
    iframe.allow = 'fullscreen; autoplay';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer';
    iframe.loading = 'eager';

    iframe.addEventListener('load', () => {
      setStatus('Interfaz de Android cargada.', 'ok');
      console.log('[GDLite] Android endpoint loaded:', EMULATOR_URL);
    });

    iframe.addEventListener('error', () => {
      setStatus('No se pudo conectar con Android.', 'error');
      console.error('[GDLite] Android endpoint failed:', EMULATOR_URL);
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
