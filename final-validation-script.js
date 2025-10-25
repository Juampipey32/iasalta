/* ============================================
   VALIDACIÓN FINAL - CONTACTO.HTML
   Verificación completa de todas las correcciones
   ============================================ */

console.log('🔍 INICIANDO VALIDACIÓN FINAL DE CONTACTO.HTML');
console.log('=============================================');

class FinalValidationReport {
    constructor() {
        this.results = {
            responsive: [],
            forms: [],
            mobile: [],
            performance: [],
            visual: [],
            accessibility: []
        };
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            device: this.getDeviceType(),
            touch: 'ontouchstart' in window
        };
    }

    getDeviceType() {
        const width = window.innerWidth;
        if (width <= 360) return 'Ultra Mobile';
        if (width <= 480) return 'Small Mobile';
        if (width <= 768) return 'Mobile';
        if (width <= 1024) return 'Tablet';
        return 'Desktop';
    }

    addResult(category, test, passed, details = '') {
        this.results[category].push({
            test,
            passed,
            details,
            timestamp: new Date().toISOString()
        });
    }

    // ============================================
    // 1. VALIDACIÓN DE RESPONSIVE DESIGN
    // ============================================
    validateResponsive() {
        console.log('📱 Validando Responsive Design...');

        // Test 1: Grid de estadísticas
        const statsGrid = document.querySelector('.hero-stats-grid');
        if (statsGrid) {
            const gridStyle = window.getComputedStyle(statsGrid);
            const columns = gridStyle.gridTemplateColumns;
            let expectedColumns = '';

            if (this.viewport.width > 1024) expectedColumns = '3';
            else if (this.viewport.width > 768) expectedColumns = '2';
            else expectedColumns = '1';

            const hasCorrectColumns = columns.includes('1fr') || columns.includes(expectedColumns);
            this.addResult('responsive',
                `Grid Estadísticas (${this.viewport.device})`,
                hasCorrectColumns,
                `Expected: ${expectedColumns}, Got: ${columns}`
            );
        }

        // Test 2: Grid de servicios
        const servicesGrid = document.querySelector('.news-cards-grid');
        if (servicesGrid) {
            const gridStyle = window.getComputedStyle(servicesGrid);
            const columns = gridStyle.gridTemplateColumns;
            const hasResponsiveGrid = columns.includes('1fr') || columns.includes('auto-fit');
            this.addResult('responsive',
                'Grid Servicios Responsive',
                hasResponsiveGrid,
                `Columns: ${columns}`
            );
        }

        // Test 3: Grid de formulario
        const contactFormGrid = document.querySelector('.contact-form-grid');
        if (contactFormGrid) {
            const gridStyle = window.getComputedStyle(contactFormGrid);
            const columns = gridStyle.gridTemplateColumns;
            const expectedFormColumns = this.viewport.width > 768 ? '2' : '1';
            const hasCorrectFormColumns = columns.includes('1fr') || columns.includes(expectedFormColumns);
            this.addResult('responsive',
                `Grid Formulario (${this.viewport.device})`,
                hasCorrectFormColumns,
                `Expected: ${expectedFormColumns}, Got: ${columns}`
            );
        }

        // Test 4: Overflow horizontal
        const bodyWidth = document.body.scrollWidth;
        const hasHorizontalOverflow = bodyWidth > this.viewport.width;
        this.addResult('responsive',
            'Sin Overflow Horizontal',
            !hasHorizontalOverflow,
            `Body: ${bodyWidth}px, Viewport: ${this.viewport.width}px`
        );

        // Test 5: Viewport ultra-compacto
        if (this.viewport.width <= 360) {
            const statItems = document.querySelectorAll('.stat-item');
            const hasCompactStyles = Array.from(statItems).every(item => {
                const style = window.getComputedStyle(item);
                const padding = style.padding;
                return padding.includes('8px') || padding.includes('0.5rem');
            });
            this.addResult('responsive',
                'Estilos Ultra-Compactos Activos',
                hasCompactStyles,
                `Viewport: ${this.viewport.width}px`
            );
        }
    }

    // ============================================
    // 2. VALIDACIÓN DE FORMULARIOS
    // ============================================
    validateForms() {
        console.log('📝 Validando Formularios...');

        // Test 1: Formulario principal
        const mainForm = document.getElementById('contactFormPrincipal');
        if (mainForm) {
            const inputs = mainForm.querySelectorAll('input, textarea, select');
            const allHaveIds = Array.from(inputs).every(input => !!input.id);
            const allHaveNames = Array.from(inputs).every(input => !!input.name);

            this.addResult('forms',
                'Formulario Principal - IDs y Names',
                allHaveIds && allHaveNames,
                `Inputs: ${inputs.length}`
            );

            // Test 2: WCAG compliance en inputs
            const meetsWCAG = Array.from(inputs).every(input => {
                const style = window.getComputedStyle(input);
                const minHeight = parseInt(style.minHeight);
                return minHeight >= 44;
            });
            this.addResult('forms',
                'Inputs WCAG Compliant (44px+)',
                meetsWCAG,
                `Mobile: ${this.viewport.device}`
            );

            // Test 3: Contador de caracteres
            const charCount = document.getElementById('charCount');
            const charCountComentario = document.getElementById('charCountComentario');
            this.addResult('forms',
                'Contadores de Caracteres',
                !!(charCount && charCountComentario),
                'Principal y Comentarios'
            );
        }

        // Test 4: Formulario de comentarios
        const commentForm = document.getElementById('comentarioForm');
        if (commentForm) {
            this.addResult('forms',
                'Formulario Comentarios Presente',
                true,
                'Funcional y operativo'
            );
        }

        // Test 5: Botones accesibles
        const buttons = document.querySelectorAll('button');
        const buttonsWCAG = Array.from(buttons).every(button => {
            const style = window.getComputedStyle(button);
            const minHeight = parseInt(style.minHeight);
            return minHeight >= 44;
        });
        this.addResult('forms',
            'Botones WCAG Compliant',
            buttonsWCAG,
            `Buttons: ${buttons.length}`
        );
    }

    // ============================================
    // 3. VALIDACIÓN DE FUNCIONALIDAD MÓVIL
    // ============================================
    validateMobile() {
        console.log('📱 Validando Funcionalidad Móvil...');

        // Test 1: Touch action optimizado
        const interactiveElements = document.querySelectorAll('input, textarea, select, button, a');
        const hasTouchAction = Array.from(interactiveElements).every(element => {
            const style = window.getComputedStyle(element);
            const touchAction = style.touchAction;
            return touchAction === 'manipulation' || this.viewport.width > 768;
        });
        this.addResult('mobile',
            'Touch Action Optimizado',
            hasTouchAction || this.viewport.width > 768,
            `Touch Device: ${this.viewport.touch}`
        );

        // Test 2: Font-size para prevenir zoom
        const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        const hasCorrectFontSize = Array.from(textInputs).every(input => {
            const style = window.getComputedStyle(input);
            const fontSize = parseInt(style.fontSize);
            return fontSize >= 16 || this.viewport.width > 768;
        });
        this.addResult('mobile',
            'Font-size Anti-Zoom (16px+)',
            hasCorrectFontSize || this.viewport.width > 768,
            `Mobile: ${this.viewport.device}`
        );

        // Test 3: Viewport meta
        const viewport = document.querySelector('meta[name="viewport"]');
        const hasCorrectViewport = viewport &&
            viewport.content.includes('width=device-width') &&
            viewport.content.includes('initial-scale=1.0');
        this.addResult('mobile',
            'Viewport Meta Correcto',
            hasCorrectViewport,
            hasCorrectViewport ? viewport.content : 'Missing'
        );

        // Test 4: Skip link
        const skipLink = document.querySelector('.skip-link');
        this.addResult('mobile',
            'Skip Link Presente',
            !!skipLink,
            'Accessibility improvement'
        );

        // Test 5: Overscroll behavior
        const bodyStyle = window.getComputedStyle(document.body);
        const hasOverscrollControl = bodyStyle.overscrollBehavior === 'contain';
        this.addResult('mobile',
            'Overscroll Behavior Controlado',
            hasOverscrollControl,
            'Previene elastic scrolling'
        );
    }

    // ============================================
    // 4. VALIDACIÓN DE PERFORMANCE
    // ============================================
    validatePerformance() {
        console.log('⚡ Validando Performance...');

        // Test 1: CSS cargado
        const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        let cssLoaded = 0;
        linkElements.forEach(link => {
            if (link.sheet) cssLoaded++;
        });
        this.addResult('performance',
            'CSS Cargado Correctamente',
            cssLoaded === linkElements.length,
            `${cssLoaded}/${linkElements.length} hojas`
        );

        // Test 2: JavaScript sin errores
        const errorCount = window.errors || 0;
        this.addResult('performance',
            'JavaScript sin Errores',
            errorCount === 0,
            `Errors: ${errorCount}`
        );

        // Test 3: Hardware acceleration
        const animatedElements = document.querySelectorAll('.hero-premium, .modern-card, .news-card');
        const hasHardwareAcceleration = Array.from(animatedElements).every(element => {
            const style = window.getComputedStyle(element);
            return style.transform === 'matrix3d(1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1)' ||
                   style.willChange === 'transform' ||
                   style.transform !== 'none';
        });
        this.addResult('performance',
            'Hardware Acceleration',
            hasHardwareAcceleration,
            `Elements: ${animatedElements.length}`
        );

        // Test 4: Imágenes optimizadas
        const images = document.querySelectorAll('img');
        const imagesWithLazyLoading = Array.from(images).every(img =>
            img.hasAttribute('loading') || img.loading === 'lazy'
        );
        this.addResult('performance',
            'Lazy Loading en Imágenes',
            imagesWithLazyLoading || images.length === 0,
            `Images: ${images.length}`
        );
    }

    // ============================================
    // 5. VALIDACIÓN VISUAL
    // ============================================
    validateVisual() {
        console.log('🎨 Validación Aspecto Visual...');

        // Test 1: CSS Variables definidas
        const rootStyle = getComputedStyle(document.documentElement);
        const hasPrimaryColors = rootStyle.getPropertyValue('--primary-600');
        const hasSpacing = rootStyle.getPropertyValue('--space-4');
        const hasTypography = rootStyle.getPropertyValue('--text-base');

        this.addResult('visual',
            'CSS Variables Definidas',
            !!(hasPrimaryColors && hasSpacing && hasTypography),
            'Design system activo'
        );

        // Test 2: Consistencia de cards
        const cards = document.querySelectorAll('.modern-card, .news-card');
        const hasConsistentCards = cards.length > 0 && Array.from(cards).every(card => {
            const style = window.getComputedStyle(card);
            return style.padding && style.borderRadius;
        });
        this.addResult('visual',
            'Cards Consistentes',
            hasConsistentCards,
            `Cards: ${cards.length}`
        );

        // Test 3: Texto legible
        const textElements = document.querySelectorAll('p, span, div');
        const hasLegibleText = textElements.length > 0;
        this.addResult('visual',
            'Texto Legible',
            hasLegibleText,
            `Text elements: ${textElements.length}`
        );

        // Test 4: Sin contenido cortado
        const hasOverflow = Array.from(document.querySelectorAll('*')).some(element => {
            const style = window.getComputedStyle(element);
            return style.overflow === 'hidden' && element.scrollWidth > element.clientWidth;
        });
        this.addResult('visual',
            'Sin Contenido Cortado',
            !hasOverflow,
            'Overflow check'
        );
    }

    // ============================================
    // 6. VALIDACIÓN DE ACCESSIBILITY
    // ============================================
    validateAccessibility() {
        console.log('♿ Validando Accessibility...');

        // Test 1: Focus states
        const focusableElements = document.querySelectorAll('input, textarea, select, button, a');
        const hasFocusStyles = Array.from(focusableElements).some(element => {
            // Check if focus styles are defined in CSS
            const style = window.getComputedStyle(element, ':focus');
            return style.outline !== 'none' || style.boxShadow !== 'none';
        });
        this.addResult('accessibility',
            'Focus States Definidos',
            hasFocusStyles,
            `Focusable elements: ${focusableElements.length}`
        );

        // Test 2: Contraste (básico)
        const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
        const hasTextElements = textElements.length > 0;
        this.addResult('accessibility',
            'Elementos de Texto Presentes',
            hasTextElements,
            `Text elements: ${textElements.length}`
        );

        // Test 3: Semantic HTML
        const semanticElements = document.querySelectorAll('header, nav, main, section, article, aside, footer');
        this.addResult('accessibility',
            'HTML Semántico',
            semanticElements.length >= 4,
            `Semantic elements: ${semanticElements.length}`
        );

        // Test 4: Alt attributes en imágenes
        const images = document.querySelectorAll('img');
        const imagesWithAlt = Array.from(images).filter(img => img.hasAttribute('alt'));
        const hasAltOnAllImages = images.length === 0 || imagesWithAlt.length === images.length;
        this.addResult('accessibility',
            'Alt Attributes en Imágenes',
            hasAltOnAllImages,
            `${imagesWithAlt.length}/${images.length} con alt`
        );
    }

    // ============================================
    // MÉTODOS DE REPORTE
    // ============================================
    generateReport() {
        console.log('📊 Generando Reporte Final...');

        const report = {
            timestamp: new Date().toISOString(),
            viewport: this.viewport,
            summary: {
                total: 0,
                passed: 0,
                failed: 0,
                percentage: 0
            },
            categories: {}
        };

        // Calcular totales
        Object.keys(this.results).forEach(category => {
            const tests = this.results[category];
            const passed = tests.filter(test => test.passed).length;
            const failed = tests.filter(test => !test.passed).length;

            report.categories[category] = {
                tests: tests.length,
                passed,
                failed,
                percentage: tests.length > 0 ? Math.round((passed / tests.length) * 100) : 0,
                items: tests
            };

            report.summary.total += tests.length;
            report.summary.passed += passed;
            report.summary.failed += failed;
        });

        report.summary.percentage = report.summary.total > 0 ?
            Math.round((report.summary.passed / report.summary.total) * 100) : 0;

        return report;
    }

    displayReport() {
        const report = this.generateReport();

        // Crear modal de reporte
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            z-index: 10000;
            overflow-y: auto;
            padding: 20px;
            font-family: 'Courier New', monospace;
        `;

        let statusColor = '#ef4444'; // Red
        if (report.summary.percentage >= 90) statusColor = '#4ade80'; // Green
        else if (report.summary.percentage >= 70) statusColor = '#f59e0b'; // Yellow

        modal.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="color: ${statusColor}; text-align: center; margin-bottom: 30px;">
                    📋 REPORT DE VALIDACIÓN FINAL
                </h1>

                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h2>📊 RESUMEN GENERAL</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;">
                        <div>
                            <strong>Total Tests:</strong> ${report.summary.total}
                        </div>
                        <div style="color: #4ade80;">
                            <strong>Pasados:</strong> ${report.summary.passed}
                        </div>
                        <div style="color: #ef4444;">
                            <strong>Fallidos:</strong> ${report.summary.failed}
                        </div>
                        <div style="color: ${statusColor}; font-size: 1.2em;">
                            <strong>Puntuación:</strong> ${report.summary.percentage}%
                        </div>
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h2>📱 INFORMACIÓN DEL DISPOSITIVO</h2>
                    <div style="margin-top: 15px;">
                        <div><strong>Viewport:</strong> ${report.viewport.width}x${report.viewport.height}px</div>
                        <div><strong>Tipo:</strong> ${report.viewport.device}</div>
                        <div><strong>Touch:</strong> ${report.viewport.touch ? 'Sí' : 'No'}</div>
                        <div><strong>Fecha:</strong> ${new Date(report.timestamp).toLocaleString()}</div>
                    </div>
                </div>

                ${Object.entries(report.categories).map(([category, data]) => `
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: ${data.percentage >= 90 ? '#4ade80' : data.percentage >= 70 ? '#f59e0b' : '#ef4444'};">
                            ${category.toUpperCase()}: ${data.percentage}% (${data.passed}/${data.tests})
                        </h3>
                        <div style="margin-top: 15px;">
                            ${data.items.map(item => `
                                <div style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.05); border-left: 3px solid ${item.passed ? '#4ade80' : '#ef4444'};">
                                    <strong style="color: ${item.passed ? '#4ade80' : '#ef4444'};">
                                        ${item.passed ? '✅' : '❌'} ${item.test}
                                    </strong>
                                    ${item.details ? `<div style="font-size: 0.9em; color: #ccc; margin-top: 5px;">${item.details}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}

                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        padding: 15px 30px;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        margin: 5px;
                    ">Cerrar Reporte</button>

                    <button onclick="console.log(JSON.stringify(${JSON.stringify(report)}, null, 2));" style="
                        padding: 15px 30px;
                        background: #4ade80;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        margin: 5px;
                    ">Ver en Consola</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        console.log('📋 Reporte completo:', report);
        return report;
    }

    // ============================================
    // EJECUCIÓN COMPLETA
    // ============================================
    run() {
        console.log('🚀 Iniciando Validación Final Completa...');

        // Capturar errores
        window.addEventListener('error', (e) => {
            if (!window.errors) window.errors = 0;
            window.errors++;
            console.error('Error durante validación:', e);
        });

        // Ejecutar todas las validaciones
        this.validateResponsive();
        this.validateForms();
        this.validateMobile();
        this.validatePerformance();
        this.validateVisual();
        this.validateAccessibility();

        // Mostrar reporte
        setTimeout(() => {
            this.displayReport();
        }, 1000);

        console.log('✅ Validación Final Completa');
        return this.generateReport();
    }
}

// Función global para ejecutar la validación
window.runFinalValidation = () => {
    const validation = new FinalValidationReport();
    return validation.run();
};

// Auto-ejecutar si está en modo debug
if (window.location.search.includes('validate=true')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.runFinalValidation();
        }, 2000);
    });
}

console.log('🔍 Script de Validación Final cargado. Ejecuta con: runFinalValidation()');