document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const streamPlayer = document.getElementById('stream-player');
  const connectionStatus = document.getElementById('connection-status');

  // The Android backend is not hosted by GitHub Pages.
  // Keep the frontend usable until an Android streaming server is configured.
  const EMULATOR_URL = window.GDLITE_EMULATOR_URL || '';

  function setStatus(message, state = 'loading') {
    if (!connectionStatus) return;
    connectionStatus.textContent = message;
    connectionStatus.dataset.state = state;
  }

  function showBackendUnavailable() {
    streamPlayer.innerHTML = `
      <div class="emulator-offline">
        <h2>Android emulator no disponible</h2>
        <p>La página web está funcionando, pero todavía no hay un servidor Android conectado.</p>
        <small>El emulador se conectará aquí cuando configuremos el backend de streaming.</small>
      </div>
    `;

    setStatus('Esperando servidor Android…', 'error');
    console.warn('[GDLite] No Android streaming endpoint configured.');
  }

  function loadEmulator() {
    if (!EMULATOR_URL) {
      showBackendUnavailable();
      return;
    }

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
    });

    streamPlayer.appendChild(iframe);
  }

  if (!btnAccept || !streamPlayer) {
    console.error('[GDLite] Missing required UI elements.');
    return;
  }

  btnAccept.addEventListener('click', () => {
    modal.style.display = 'none';
    loadEmulator();
  });
});
