// Configuración principal para JUAMPI IA - Página de Robótica

// Configuración de la aplicación
const APP_CONFIG = {
    version: '2.0.2.5',
    name: 'JUAMPI IA',
    page: 'robotica',
    debug: false
};

// Configuración de colores y temas
const THEME_CONFIG = {
    colors: {
        primary: '#00ffff',
        secondary: '#ff00ff',
        accent: '#ffff00',
        terminalGreen: '#00ff00',
        warningRed: '#ff0000',
        bgDark: '#0a0a0a',
        bgMedium: '#1a1a1a',
        bgLight: '#2a2a2a',
        textPrimary: '#ffffff',
        textSecondary: '#b0b0b0',
        borderColor: 'rgba(0, 255, 255, 0.3)',
        glowPrimary: 'rgba(0, 255, 255, 0.5)',
        glowSecondary: 'rgba(255, 0, 255, 0.3)'
    },
    fonts: {
        digital: 'Orbitron, sans-serif',
        mono: 'Share Tech Mono, monospace',
        title: 'Russo One, sans-serif'
    },
    animations: {
        duration: {
            fast: 300,
            normal: 600,
            slow: 1000
        },
        easing: {
            easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
        }
    }
};

// Configuración de contadores animados
const COUNTERS_CONFIG = {
    robotsCount: {
        target: 3.5,
        suffix: '',
        duration: 2000,
        decimal: true
    },
    marketValue: {
        target: 250,
        suffix: '',
        duration: 2500,
        decimal: false
    },
    jobsCreated: {
        target: 85,
        suffix: '',
        duration: 1800,
        decimal: false
    },
    efficiency: {
        target: 450,
        suffix: '%',
        duration: 2200,
        decimal: false
    }
};

// Configuración de enlaces sociales
const SOCIAL_CONFIG = {
    twitter: {
        url: 'https://twitter.com/juampi_ia',
        shareUrl: 'https://twitter.com/intent/tweet?text=',
        icon: 'fab fa-twitter'
    },
    github: {
        url: 'https://github.com/juampi-ia',
        shareUrl: 'https://github.com/juampi-ia',
        icon: 'fab fa-github'
    },
    linkedin: {
        url: 'https://linkedin.com/in/juampi-ia',
        shareUrl: 'https://linkedin.com/sharing/share-offsite/?url=',
        icon: 'fab fa-linkedin'
    }
};

// Configuración de categorías de robots
const ROBOT_CATEGORIES = {
    industrial: {
        title: 'Robótica Industrial',
        description: 'Automatización de procesos manufactureros',
        icon: 'fas fa-robot',
        color: '#00ffff'
    },
    medica: {
        title: 'Robótica Médica',
        description: 'Sistemas de diagnóstico y cirugía',
        icon: 'fas fa-hospital',
        color: '#ff00ff'
    },
    autonomos: {
        title: 'Vehículos Autónomos',
        description: 'Transporte inteligente y drones',
        icon: 'fas fa-car',
        color: '#ffff00'
    },
    domestica: {
        title: 'Robótica Doméstica',
        description: 'Asistentes personales y cuidado del hogar',
        icon: 'fas fa-home',
        color: '#00ff00'
    }
};

// Configuración de efectos 3D
const EFFECTS_3D_CONFIG = {
    particles: {
        count: 1000,
        size: 2,
        opacity: 0.8,
        color: { h: 0.55, s: 1, l: 0.6 },
        rotationSpeed: { x: 0.0005, y: 0.001 }
    },
    matrix: {
        fontSize: 10,
        speed: 35,
        opacity: 0.04,
        color: '#4da6ff'
    },
    camera: {
        position: { z: 50 },
        fov: 75,
        near: 0.1,
        far: 1000
    }
};

// Configuración de animaciones
const ANIMATION_CONFIG = {
    observer: {
        threshold: 0.1,
        rootMargin: '50px'
    },
    delays: {
        stagger: 100,
        counter: 300,
        hover: 150
    },
    scroll: {
        smooth: true,
        offset: 100
    }
};

// Configuración de API y endpoints
const API_CONFIG = {
    endpoints: {
        stats: '/api/robotics/stats',
        categories: '/api/robotics/categories',
        timeline: '/api/robotics/timeline'
    },
    timeout: 10000,
    retries: 3
};

// Configuración de errores y manejo
const ERROR_CONFIG = {
    messages: {
        loadError: 'Error al cargar el contenido',
        networkError: 'Error de conexión',
        animationError: 'Error en la animación'
    },
    fallback: {
        header: true,
        counters: true,
        effects: true
    }
};

// Utilidades y helpers
const UTILS = {
    // Formatear números
    formatNumber: (num, decimals = 0) => {
        return decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString();
    },

    // Generar ID único
    generateId: (prefix = '') => {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // Validar email
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Debounce function
    debounce: (func, wait) => {
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

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Detectar dispositivo móvil
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Obtener configuración de tema
    getTheme: () => {
        return {
            ...THEME_CONFIG.colors,
            fonts: THEME_CONFIG.fonts,
            animations: THEME_CONFIG.animations
        };
    }
};

// Exportar configuraciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_CONFIG,
        THEME_CONFIG,
        COUNTERS_CONFIG,
        SOCIAL_CONFIG,
        ROBOT_CATEGORIES,
        EFFECTS_3D_CONFIG,
        ANIMATION_CONFIG,
        API_CONFIG,
        ERROR_CONFIG,
        UTILS
    };
}

// Hacer disponible globalmente
window.JUAMPI_CONFIG = {
    APP_CONFIG,
    THEME_CONFIG,
    COUNTERS_CONFIG,
    SOCIAL_CONFIG,
    ROBOT_CATEGORIES,
    EFFECTS_3D_CONFIG,
    ANIMATION_CONFIG,
    API_CONFIG,
    ERROR_CONFIG,
    UTILS
};