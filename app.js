document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const streamPlayer = document.getElementById('stream-player');

  btnAccept.addEventListener('click', () => {
    modal.style.display = 'none';

    // Pega aquí la URL que te dio Render
    const EMULATOR_URL = 'https://gd-lite-backend.onrender.com';

    // Cargar el flujo de video en el contenedor principal
    streamPlayer.innerHTML = `
      
    `;

    console.log('Transmisión de Geometry Dash Lite iniciada desde Render.');
  });
});
