/**
 * Mobile Menu Manager - IA Salta
 * Manejo consistente del menú móvil en todas las páginas
 */

class IASaltaMobileMenu {
    constructor() {
        this.mobileMenuToggle = null;
        this.navMenu = null;
        this.navLinks = [];
        this.isMenuOpen = false;

        this.init();
    }

    init() {
        this.setupElements();
        if (this.mobileMenuToggle && this.navMenu) {
            this.setupEventListeners();
            this.setupActivePage();
        }
    }

    setupElements() {
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
    }

    setupEventListeners() {
        // Toggle menú móvil
        this.mobileMenuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Cerrar menú al hacer click en enlaces
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.isClickInsideMenu(e)) {
                this.closeMenu();
            }
        });

        // Manejar tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.navMenu.classList.add('active');
        this.isMenuOpen = true;

        // Cambiar icono
        const icon = this.mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }

        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';

        // Enfocar primer enlace para accesibilidad
        setTimeout(() => {
            const firstLink = this.navLinks[0];
            if (firstLink) {
                firstLink.focus();
            }
        }, 100);
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.isMenuOpen = false;

        // Restaurar icono
        const icon = this.mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        // Restaurar scroll del body
        document.body.style.overflow = '';

        // Devolver foco al botón del menú
        this.mobileMenuToggle.focus();
    }

    isClickInsideMenu(e) {
        return this.mobileMenuToggle.contains(e.target) ||
               this.navMenu.contains(e.target);
    }

    setupActivePage() {
        // Marcar página actual
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Quitar clase active de todos los enlaces
            link.classList.remove('active');

            // Agregar clase active a la página actual
            if (href === currentPage) {
                link.classList.add('active');
            }

            // Caso especial para index.html
            if (currentPage === 'index.html' && href === 'index.html') {
                link.classList.add('active');
            }
        });
    }
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    new IASaltaMobileMenu();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IASaltaMobileMenu;
}