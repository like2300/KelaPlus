 
(() => {
  const prompt   = document.getElementById('installPrompt');
  const install  = document.getElementById('installBtn');
  const close    = document.getElementById('closePrompt');
  const later    = document.getElementById('laterBtn');
  const iosTip   = document.getElementById('iosTip');

  let deferredPrompt;

  // Android / Chrome
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    prompt.classList.remove('hidden');
  });

  // iOS  (quand on est en mode standalone, on ne montre pas)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (isIOS && !isStandalone) {
    prompt.classList.remove('hidden');
    iosTip.classList.remove('hidden');
    install.style.display = 'none';
  }

  // Bouton INSTALLER
  install.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') prompt.classList.add('hidden');
    }
  });

  // Fermer / Plus tard
  [close, later].forEach(btn => btn.addEventListener('click', () => prompt.classList.add('hidden')));
})(); 