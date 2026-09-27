document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('security-modal');
  const btnAccept = document.getElementById('btn-accept');
  const placeholder = document.getElementById('placeholder-text');

  btnAccept.addEventListener('click', () => {
    modal.style.display = 'none';
    placeholder.textContent = 'Cargando transmisión de GD Lite...';
    console.log('Advertencia de seguridad aceptada.');
  });
});
