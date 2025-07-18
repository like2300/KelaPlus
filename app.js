
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const navbar = document.getElementById('navbar');

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    mobileMenu.classList.toggle('hidden', !isMenuOpen);
    sidebarBackdrop.classList.toggle('hidden', !isMenuOpen);

    // Empêche de scroller le body sur téléphone quand le menu est ouvert
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    menuToggle.setAttribute('aria-expanded', isMenuOpen);
}

// ✅ Ouvre et ferme le menu mobile
menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
sidebarBackdrop.addEventListener('click', toggleMenu);

// ✅ Ferme le menu avec touche Échap
mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) toggleMenu();
});

// ✅ Ferme automatiquement si on passe en mode desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        sidebarBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// ✅ Gère l’apparition/disparition de la navbar au scroll (aussi sur mobile)
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('nav-scroll');
    } else {
        navbar.classList.remove('nav-scroll');
    }

    // Masque la navbar uniquement si menu fermé
    if (!isMenuOpen) {
        navbar.style.transform =
            window.scrollY > lastScrollY && window.scrollY > 100
                ? 'translateY(-100%)'
                : 'translateY(0)';
    }

    lastScrollY = window.scrollY;
}); 