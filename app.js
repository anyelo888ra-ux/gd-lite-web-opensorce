document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const streamPlayer = document.getElementById('stream-player');
  const connectionStatus = document.getElementById('connection-status');

  const EMULATOR_URL =
    window.GDLITE_EMULATOR_URL ||
    './emulator/emulator.html';

  const HEALTH_URL =
    window.GDLITE_HEALTH_URL ||
    (window.GDLITE_EMULATOR_URL
      ? new URL('/health', window.GDLITE_EMULATOR_URL).href
      : '');

  const RECONNECT_DELAY = 3000;
  let reconnectTimer = null;

  function setStatus(message, state = 'loading') {
    if (!connectionStatus) return;
    connectionStatus.textContent = message;
    connectionStatus.dataset.state = state;
  }

  async function checkHealth() {
    if (!HEALTH_URL) return true;

    try {
      const response = await fetch(HEALTH_URL, {
        method: 'GET',
        cache: 'no-store',
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return true;
    } catch (error) {
      console.warn('[GDLite] Health check failed:', error);
      return false;
    }
  }

  function showBackendUnavailable() {
    streamPlayer.innerHTML = `
      <div class="emulator-offline">
        <h2>Android backend no disponible</h2>
        <p>La interfaz web funciona, pero el servidor Android todavía no responde.</p>
        <small>Reintentando automáticamente…</small>
      </div>
    `;
    setStatus('Backend Android no disponible.', 'error');
  }

  function scheduleReconnect() {
    if (reconnectTimer) return;

    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null;
      loadEmulator();
    }, RECONNECT_DELAY);
  }

  async function loadEmulator() {
    setStatus('Comprobando Android…', 'loading');

    if (!(await checkHealth())) {
      showBackendUnavailable();
      scheduleReconnect();
      return;
    }

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
      scheduleReconnect();
    });

    streamPlayer.appendChild(iframe);
  }

  function sendInput(type, payload) {
    const frame = streamPlayer.querySelector('iframe');
    if (!frame || !frame.contentWindow) return;

    frame.contentWindow.postMessage(
      { source: 'gdlite-web', type, payload },
      '*'
    );
  }

  document.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    sendInput('keyDown', {
      key: event.key,
      code: event.code
    });
  });

  document.addEventListener('keyup', (event) => {
    sendInput('keyUp', {
      key: event.key,
      code: event.code
    });
  });

  document.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, input, textarea, select, a')) return;
    sendInput('pointerDown', {
      x: event.clientX,
      y: event.clientY,
      pointerType: event.pointerType
    });
  });

  document.addEventListener('pointerup', (event) => {
    if (event.target.closest('button, input, textarea, select, a')) return;
    sendInput('pointerUp', {
      x: event.clientX,
      y: event.clientY,
      pointerType: event.pointerType
    });
  });

  if (!btnAccept || !streamPlayer) {
    console.error('[GDLite] Missing required UI elements.');
    return;
  }

  btnAccept.addEventListener('click', () => {
    if (modal) modal.style.display = 'none';
    loadEmulator();
  });
});