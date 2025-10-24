/**
 * Manejo del menú móvil y mejoras de UX para JUAMPI IA
 */

class MobileMenuManager {
    constructor() {
        this.mobileMenuBtn = null;
        this.primaryNav = null;
        this.navLinks = [];
        this.body = document.body;
        this.currentPage = this.getCurrentPage();

        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupActivePage();
        this.setupAccessibility();
    }

    setupElements() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.primaryNav = document.querySelector('.primary-nav');
        this.navLinks = document.querySelectorAll('.nav-link');
    }

    setupEventListeners() {
        // Toggle menú móvil
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Cerrar menú al hacer click en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen() && !this.isClickInsideMenu(e)) {
                this.closeMobileMenu();
            }
        });

        // Manejar escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen()) {
                this.closeMobileMenu();
            }
        });

        // Prevenir scroll cuando menú está abierto
        this.mobileMenuBtn?.addEventListener('click', () => {
            if (this.isMenuOpen()) {
                this.body.style.overflow = 'hidden';
            } else {
                this.body.style.overflow = '';
            }
        });
    }

    setupActivePage() {
        const currentPage = this.currentPage;
        this.navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    setupAccessibility() {
        // Mejorar accesibilidad de los enlaces
        this.navLinks.forEach(link => {
            link.setAttribute('role', 'menuitem');
            link.setAttribute('tabindex', '0');

            // Manejar navegación por teclado
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });

        // Configurar ARIA para el menú móvil
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.setAttribute('role', 'button');
            this.mobileMenuBtn.setAttribute('tabindex', '0');

            this.mobileMenuBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const isOpen = this.isMenuOpen();

        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenuBtn?.classList.add('active');
        this.primaryNav?.classList.add('mobile-active');
        this.mobileMenuBtn?.setAttribute('aria-expanded', 'true');
        this.body.style.overflow = 'hidden';

        // Enfocar el primer enlace del menú
        setTimeout(() => {
            const firstLink = this.navLinks[0];
            if (firstLink) {
                firstLink.focus();
            }
        }, 100);
    }

    closeMobileMenu() {
        this.mobileMenuBtn?.classList.remove('active');
        this.primaryNav?.classList.remove('mobile-active');
        this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
        this.body.style.overflow = '';

        // Devolver foco al botón del menú
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.focus();
        }
    }

    isMenuOpen() {
        return this.mobileMenuBtn?.classList.contains('active') || false;
    }

    isClickInsideMenu(e) {
        return this.mobileMenuBtn?.contains(e.target) ||
               this.primaryNav?.contains(e.target) || false;
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenuManager();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenuManager;
}