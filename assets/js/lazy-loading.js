/**
 * Lazy Loading para imágenes y recursos pesados - JUAMPI IA
 */

class LazyLoadingManager {
    constructor() {
        this.imageObserver = null;
        this.iframeObserver = null;
        this.videoObserver = null;
        this.preloaded = new Set();
        this.intersectionOptions = {
            root: null,
            rootMargin: '50px 0px',
            threshold: 0.1
        };

        this.init();
    }

    init() {
        this.setupImageLazyLoading();
        this.setupIframeLazyLoading();
        this.setupVideoLazyLoading();
        this.setupPreloading();
        this.setupBackgroundLazyLoading();
        this.setupOptimizationStrategies();
    }

    setupImageLazyLoading() {
        // Configurar Intersection Observer para imágenes
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, this.intersectionOptions);

        // Observar todas las imágenes con lazy loading
        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        lazyImages.forEach(img => {
            // Si ya tiene loading="lazy", el navegador lo maneja
            if (!img.hasAttribute('loading') || img.getAttribute('loading') !== 'lazy') {
                this.imageObserver.observe(img);
            }
        });

        // Manejar imágenes existentes sin data-src
        this.setupExistingImages();
    }

    setupExistingImages() {
        const images = document.querySelectorAll('img:not([data-src]):not([loading="lazy"])');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !this.isInViewport(img)) {
                // Crear una copia temporal
                img.setAttribute('data-src', src);
                img.removeAttribute('src');

                // Añadir placeholder
                this.addImagePlaceholder(img);
                this.imageObserver.observe(img);
            }
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src') || img.getAttribute('src');
        if (!src || this.preloaded.has(src)) return;

        // Mostrar indicador de carga
        this.showLoadingIndicator(img);

        // Precargar imagen
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            this.hideLoadingIndicator(img);
            this.animateImageLoad(img);
            this.preloaded.add(src);
        };

        tempImg.onerror = () => {
            this.hideLoadingIndicator(img);
            this.showImageError(img);
        };

        tempImg.src = src;
    }

    setupIframeLazyLoading() {
        this.iframeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadIframe(entry.target);
                    this.iframeObserver.unobserve(entry.target);
                }
            });
        }, {
            ...this.intersectionOptions,
            threshold: 0.05 // Umbral más bajo para iframes
        });

        // Observar iframes
        const lazyIframes = document.querySelectorAll('iframe[data-src]');
        lazyIframes.forEach(iframe => {
            this.iframeObserver.observe(iframe);
        });
    }

    loadIframe(iframe) {
        const src = iframe.getAttribute('data-src');
        if (!src) return;

        iframe.src = src;
        iframe.style.opacity = '0';

        iframe.onload = () => {
            iframe.style.transition = 'opacity 0.3s ease';
            iframe.style.opacity = '1';
        };
    }

    setupVideoLazyLoading() {
        this.videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadVideo(entry.target);
                    this.videoObserver.unobserve(entry.target);
                }
            });
        }, this.intersectionOptions);

        // Observar videos
        const lazyVideos = document.querySelectorAll('video[data-poster], video[data-src]');
        lazyVideos.forEach(video => {
            this.videoObserver.observe(video);
        });
    }

    loadVideo(video) {
        const poster = video.getAttribute('data-poster');
        const sources = video.querySelectorAll('source[data-src]');

        if (poster) {
            video.poster = poster;
        }

        sources.forEach(source => {
            const src = source.getAttribute('data-src');
            if (src) {
                source.src = src;
            }
        });

        video.load();
    }

    setupPreloading() {
        // Preload critical resources
        const criticalResources = [
            'assets/css/styles.css',
            'assets/css/ux-improvements.css'
        ];

        criticalResources.forEach(resource => {
            if (resource.endsWith('.css')) {
                this.preloadCSS(resource);
            }
        });

        // Preload above-the-fold images
        this.preloadAboveTheFold();
    }

    preloadCSS(href) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = () => {
            link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
    }

    preloadAboveTheFold() {
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage && heroImage.src) {
            const tempImg = new Image();
            tempImg.src = heroImage.src;
        }
    }

    setupBackgroundLazyLoading() {
        const backgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadBackgroundImage(entry.target);
                    backgroundObserver.unobserve(entry.target);
                }
            });
        }, this.intersectionOptions);

        // Observar elementos con background lazy
        const lazyBackgrounds = document.querySelectorAll('[data-background]');
        lazyBackgrounds.forEach(element => {
            backgroundObserver.observe(element);
        });
    }

    loadBackgroundImage(element) {
        const bgImage = element.getAttribute('data-background');
        if (!bgImage) return;

        const tempImg = new Image();
        tempImg.onload = () => {
            element.style.backgroundImage = `url(${bgImage})`;
            element.style.transition = 'background-image 0.3s ease';
        };
        tempImg.src = bgImage;
    }

    setupOptimizationStrategies() {
        // Optimización para conexión lenta
        if (this.isSlowConnection()) {
            this.enableDataSaver();
        }

        // Optimización para móvil
        if (this.isMobile()) {
            this.enableMobileOptimizations();
        }

        // Configurar placeholder genérico
        this.setupPlaceholders();
    }

    isSlowConnection() {
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            return connection.saveData ||
                   connection.effectiveType.includes('2g') ||
                   connection.downlink < 1;
        }
        return false;
    }

    isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    enableDataSaver() {
        // Reducir calidad de imágenes
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                // Añadir parámetro de baja calidad
                const lowQualitySrc = this.addQualityParameter(src, 'low');
                img.setAttribute('data-src', lowQualitySrc);
            }
        });
    }

    enableMobileOptimizations() {
        // Priorizar carga de contenido
        this.setupPrioritizedLoading();
    }

    setupPrioritizedLoading() {
        const priorities = {
            'high': ['.hero-image img', '.logo-mark'],
            'medium': ['.feature-card img', '.article-card img'],
            'low': ['.footer img']
        };

        Object.entries(priorities).forEach(([priority, selectors]) => {
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (priority === 'high') {
                        this.loadImage(element);
                    } else {
                        // Añadir delay para carga diferida
                        setTimeout(() => {
                            if (this.imageObserver) {
                                this.imageObserver.observe(element);
                            }
                        }, priority === 'medium' ? 1000 : 2000);
                    }
                });
            });
        });
    }

    setupPlaceholders() {
        // Crear estilos para placeholders
        const style = document.createElement('style');
        style.textContent = `
            .lazy-placeholder {
                background: linear-gradient(90deg,
                    rgba(0, 255, 255, 0.1) 25%,
                    rgba(255, 0, 255, 0.1) 50%,
                    rgba(0, 255, 255, 0.1) 75%);
                background-size: 200% 100%;
                animation: loading-shimmer 1.5s infinite;
                border-radius: 8px;
            }

            @keyframes loading-shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }

            .img-loading {
                opacity: 0.5;
                filter: blur(2px);
                transition: opacity 0.3s ease, filter 0.3s ease;
            }

            .img-loaded {
                opacity: 1;
                filter: blur(0);
            }

            .img-error {
                filter: grayscale(100%);
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }

    addImagePlaceholder(img) {
        const width = img.getAttribute('width') || img.offsetWidth || 300;
        const height = img.getAttribute('height') || img.offsetHeight || 200;

        img.classList.add('lazy-placeholder');
        img.style.width = width + 'px';
        img.style.height = height + 'px';
        img.style.display = 'block';
    }

    showLoadingIndicator(img) {
        img.classList.add('img-loading');
    }

    hideLoadingIndicator(img) {
        img.classList.remove('img-loading');
        img.classList.remove('lazy-placeholder');
    }

    animateImageLoad(img) {
        img.classList.add('img-loaded');
    }

    showImageError(img) {
        img.classList.add('img-error');

        // Mostrar imagen de fallback o icono
        if (!img.src) {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDE0VjE5QzIxIDIwLjEgMjAuMSAyMSAxOSAyMUg1QzMuOSAyMSAzIDIwLjEgMyAxOVY1QzMgMy45IDMuOSAzIDUgM0gxOUwyMC40IDQuNEMyMC43IDQuOCAyMSA1LjMgMjEgNlY4Ikg1VjVIMTlWMTBIMjFWNTRWMTRaTTIxIDE0SDIwVjE5SDVWMTRIMjFaTTEyIDEwLjVMMTUuNSAxNEgxNC41TDEyIDE2LjVMOS41IDE0SDguNUwxMiAxMC41WiIgZmlsbD0iIzg4ODg4OCIvPgo8L3N2Zz4K';
        }
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    addQualityParameter(src, quality) {
        if (src.includes('?')) {
            return src + '&quality=' + quality;
        }
        return src + '?quality=' + quality;
    }

    // Método público para forzar carga de imágenes
    forceLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            this.loadImage(img);
        });
    }

    // Método público para limpiar observadores
    cleanup() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        if (this.iframeObserver) {
            this.iframeObserver.disconnect();
        }
        if (this.videoObserver) {
            this.videoObserver.disconnect();
        }
    }
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    const lazyLoader = new LazyLoadingManager();

    // Hacer disponible globalmente
    window.LazyLoadingManager = LazyLoadingManager;
    window.lazyLoader = lazyLoader;
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoadingManager;
}