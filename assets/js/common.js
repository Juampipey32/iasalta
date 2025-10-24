/**
 * Utilidades comunes para JUAMPI IA
 * Funciones compartidas entre todas las páginas
 */

/**
 * Inicializar características comunes
 */
export function initCommonFeatures() {
  // Inicializar tooltips
  initTooltips();

  // Inicializar lazy loading de imágenes
  initLazyLoading();

  // Inicializar animaciones de scroll
  initScrollAnimations();

  // Inicializar service worker si está disponible
  initServiceWorker();
}

/**
 * Inicializar tooltips
 */
function initTooltips() {
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-tooltip]');
    if (target && !target._tooltip) {
      createTooltip(target);
    }
  });
}

function createTooltip(element) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = element.dataset.tooltip;
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0, 255, 255, 0.9);
    color: #000;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    z-index: 1000;
    pointer-events: none;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  document.body.appendChild(tooltip);

  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

  // Mostrar con fade in
  requestAnimationFrame(() => {
    tooltip.style.opacity = '1';
  });

  element._tooltip = tooltip;

  element.addEventListener('mouseleave', () => {
    if (element._tooltip) {
      element._tooltip.style.opacity = '0';
      setTimeout(() => {
        if (element._tooltip) {
          element._tooltip.remove();
          delete element._tooltip;
        }
      }, 300);
    }
  });
}

/**
 * Inicializar lazy loading de imágenes
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores sin IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

/**
 * Inicializar animaciones de scroll
 */
function initScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animationObserver.observe(el);
    });
  }
}

/**
 * Inicializar Service Worker
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registrado:', registration);
        })
        .catch(error => {
          console.log('Error registrando SW:', error);
        });
    });
  }
}

/**
 * Utilidades de rendimiento
 */
export const performanceUtils = {
  /**
   * Medir tiempo de carga
   */
  measureLoadTime() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`Tiempo de carga: ${loadTime}ms`);
      return loadTime;
    }
    return null;
  },

  /**
   * Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function
   */
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

/**
 * Utilidades de accesibilidad
 */
export const accessibilityUtils = {
  /**
   * Trap focus dentro de un elemento
   */
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  },

  /**
   * Anunciar cambios para lectores de pantalla
   */
  announce(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
};