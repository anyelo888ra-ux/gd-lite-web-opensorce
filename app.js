document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const streamPlayer = document.getElementById('stream-player');
  const connectionStatus = document.getElementById('connection-status');

  // Render backend used during the beta.
  const EMULATOR_URL = 'https://gd-lite-backend.onrender.com';

  function setStatus(message, state = 'loading') {
    if (!connectionStatus) return;
    connectionStatus.textContent = message;
    connectionStatus.dataset.state = state;
  }

  function loadEmulator() {
    setStatus('Conectando con el emulador…', 'loading');

    streamPlayer.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = EMULATOR_URL + '/';
    iframe.title = 'GDLite Android Emulator';
    iframe.allow = 'fullscreen; autoplay';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer';
    iframe.loading = 'eager';

    iframe.addEventListener('load', () => {
      setStatus('Interfaz del emulador cargada.', 'ok');
      console.log('[GDLite] Emulator UI loaded:', EMULATOR_URL);
    });

    streamPlayer.appendChild(iframe);
  }

  btnAccept.addEventListener('click', () => {
    modal.style.display = 'none';
    loadEmulator();
  });

  window.addEventListener('message', (event) => {
    if (event.origin === new URL(EMULATOR_URL).origin) {
      console.log('[GDLite] Message from emulator:', event.data);
    }
  });
});
