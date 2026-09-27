document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const streamPlayer = document.getElementById('stream-player');
  const connectionStatus = document.getElementById('connection-status');

  // The Android streaming endpoint is supplied by the deployment.
  // Render is no longer hard-coded here.
  const EMULATOR_URL = window.GDLITE_EMULATOR_URL || '/emulator/';

  function setStatus(message, state = 'loading') {
    if (!connectionStatus) return;
    connectionStatus.textContent = message;
    connectionStatus.dataset.state = state;
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
