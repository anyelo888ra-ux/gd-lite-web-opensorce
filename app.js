document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const streamPlayer = document.getElementById('stream-player');
  const connectionStatus = document.getElementById('connection-status');

  // GitHub Pages hosts the frontend. Render hosts the beta Android/noVNC backend.
  // Override this value with window.GDLITE_EMULATOR_URL when using another backend.
  const EMULATOR_URL =
    window.GDLITE_EMULATOR_URL ||
    'https://gd-lite-backend.onrender.com/';

  function setStatus(message, state = 'loading') {
    if (!connectionStatus) return;
    connectionStatus.textContent = message;
    connectionStatus.dataset.state = state;
  }

  function showBackendUnavailable() {
    streamPlayer.innerHTML = `
      <div class="emulator-offline">
        <h2>Android backend no disponible</h2>
        <p>La interfaz web funciona, pero el servidor Android todavía no responde.</p>
        <small>Comprueba el servicio de Render y sus logs de arranque.</small>
      </div>
    `;
    setStatus('Backend Android no disponible.', 'error');
  }

  function loadEmulator() {
    setStatus('Conectando con Android…', 'loading');
    streamPlayer.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = EMULATOR_URL;
    iframe.title = 'GDLite Android Emulator';
    iframe.allow = 'fullscreen; autoplay; keyboard';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer';
    iframe.loading = 'eager';

    iframe.addEventListener('load', () => {
      setStatus('Interfaz Android cargada.', 'ok');
      console.log('[GDLite] Android backend loaded:', EMULATOR_URL);
    });

    iframe.addEventListener('error', () => {
      setStatus('No se pudo conectar con Android.', 'error');
      console.error('[GDLite] Android backend failed:', EMULATOR_URL);
      showBackendUnavailable();
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
