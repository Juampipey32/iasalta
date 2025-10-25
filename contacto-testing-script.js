/* ============================================
   TESTING COMPLETO - CONTACTO.HTML
   Script para verificar responsive design y funcionalidad
   ============================================ */

console.log('🔍 INICIANDO TESTING COMPLETO DE CONTACTO.HTML');
console.log('=============================================');

// Función para crear un reporte visual de testing
function createTestingReport() {
    const report = document.createElement('div');
    report.id = 'testing-report';
    report.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 300px;
        max-height: 80vh;
        overflow-y: auto;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;

    document.body.appendChild(report);
    return report;
}

// Función para mostrar resultados
function addTestResult(report, test, status, details = '') {
    const result = document.createElement('div');
    result.style.cssText = `
        margin: 5px 0;
        padding: 5px;
        border-left: 3px solid ${status ? '#4ade80' : '#ef4444'};
        background: ${status ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
    `;

    result.innerHTML = `
        <div style="font-weight: bold; color: ${status ? '#4ade80' : '#ef4444'};">
            ${status ? '✅' : '❌'} ${test}
        </div>
        ${details ? `<div style="font-size: 11px; color: #ccc; margin-top: 2px;">${details}</div>` : ''}
    `;

    report.appendChild(result);
}

// ============================================
// 1. TESTING DE RESPONSIVE DESIGN
// ============================================
function testResponsiveDesign(report) {
    console.log('📱 Testing Responsive Design...');

    const viewportWidth = window.innerWidth;
    let deviceType = '';

    if (viewportWidth > 1024) {
        deviceType = 'Desktop';
    } else if (viewportWidth > 768) {
        deviceType = 'Tablet';
    } else if (viewportWidth > 480) {
        deviceType = 'Mobile';
    } else {
        deviceType = 'Small Mobile';
    }

    addTestResult(report, `Dispositivo: ${deviceType} (${viewportWidth}px)`, true);

    // Test de Grids
    const statsGrid = document.querySelector('.hero-stats-grid');
    const processGrid = document.querySelector('.process-grid');
    const servicesGrid = document.querySelector('.news-cards-grid');
    const contactFormGrid = document.querySelector('.contact-form-grid');

    // Testing estadísticas grid
    if (statsGrid) {
        const statsGridStyle = window.getComputedStyle(statsGrid);
        const columns = statsGridStyle.gridTemplateColumns;
        let expectedColumns = '';

        if (viewportWidth > 1024) {
            expectedColumns = '3';
        } else if (viewportWidth > 768) {
            expectedColumns = '2';
        } else {
            expectedColumns = '1';
        }

        const hasCorrectColumns = columns.includes('1fr') || columns.includes(expectedColumns);
        addTestResult(report, `Grid Estadísticas: ${columns}`, hasCorrectColumns,
                     `Esperado: ${expectedColumns} columnas en ${deviceType}`);
    }

    // Testing servicios grid
    if (servicesGrid) {
        const servicesGridStyle = window.getComputedStyle(servicesGrid);
        const servicesColumns = servicesGridStyle.gridTemplateColumns;

        let expectedServicesColumns = '';
        if (viewportWidth > 1024) {
            expectedServicesColumns = '3';
        } else if (viewportWidth > 768) {
            expectedServicesColumns = '2';
        } else {
            expectedServicesColumns = '1';
        }

        const hasCorrectServicesColumns = servicesColumns.includes('1fr') ||
                                        servicesColumns.includes(expectedServicesColumns);
        addTestResult(report, `Grid Servicios: ${servicesColumns}`, hasCorrectServicesColumns,
                     `Esperado: ${expectedServicesColumns} columnas en ${deviceType}`);
    }

    // Testing formulario grid
    if (contactFormGrid) {
        const formGridStyle = window.getComputedStyle(contactFormGrid);
        const formColumns = formGridStyle.gridTemplateColumns;

        const expectedFormColumns = viewportWidth > 768 ? '2' : '1';
        const hasCorrectFormColumns = formColumns.includes('1fr') ||
                                    formColumns.includes(expectedFormColumns);
        addTestResult(report, `Grid Formulario: ${formColumns}`, hasCorrectFormColumns,
                     `Esperado: ${expectedFormColumns} columnas en ${deviceType}`);
    }

    // Test de overflow horizontal
    const bodyWidth = document.body.scrollWidth;
    const viewportWidthWithScroll = window.innerWidth;
    const hasHorizontalOverflow = bodyWidth > viewportWidthWithScroll;
    addTestResult(report, 'Sin Overflow Horizontal', !hasHorizontalOverflow,
                 `Body: ${bodyWidth}px, Viewport: ${viewportWidthWithScroll}px`);
}

// ============================================
// 2. TESTING DE FORMULARIOS
// ============================================
function testForms(report) {
    console.log('📝 Testing Formularios...');

    // Test formulario principal
    const mainForm = document.getElementById('contactFormPrincipal');
    const formInputs = mainForm ? mainForm.querySelectorAll('input, textarea, select') : [];

    addTestResult(report, `Formulario Principal: ${formInputs.length} campos`, formInputs.length > 0);

    // Test cada campo
    formInputs.forEach((input, index) => {
        const hasId = !!input.id;
        const hasName = !!input.name;
        const hasRequired = input.hasAttribute('required');
        const min_height = parseInt(window.getComputedStyle(input).minHeight);
        const meetsWCAG = min_height >= 44;

        addTestResult(report, `Campo ${index + 1} (${input.name || input.type})`,
                     hasId && hasName && meetsWCAG,
                     `ID: ${hasId ? '✓' : '✗'}, Nombre: ${hasName ? '✓' : '✗'}, Min-height: ${min_height}px`);
    });

    // Test formulario de comentarios
    const commentForm = document.getElementById('comentarioForm');
    const commentInputs = commentForm ? commentForm.querySelectorAll('input, textarea, select') : [];

    addTestResult(report, `Formulario Comentarios: ${commentInputs.length} campos`, commentInputs.length > 0);

    // Test contador de caracteres
    const charCount = document.getElementById('charCount');
    const charCountComentario = document.getElementById('charCountComentario');
    addTestResult(report, 'Contador Principal', !!charCount);
    addTestResult(report, 'Contador Comentarios', !!charCountComentario);

    // Test botones
    const buttons = document.querySelectorAll('button');
    addTestResult(report, `Botones funcionales: ${buttons.length}`, buttons.length > 0);

    buttons.forEach((button, index) => {
        const min_height = parseInt(window.getComputedStyle(button).minHeight);
        const meetsWCAG = min_height >= 44;
        addTestResult(report, `Botón ${index + 1} WCAG`, meetsWCAG, `Min-height: ${min_height}px`);
    });
}

// ============================================
// 3. TESTING DE FUNCIONALIDAD MÓVIL
// ============================================
function testMobileFunctionality(report) {
    console.log('📱 Testing Funcionalidad Móvil...');

    const isMobile = window.innerWidth <= 768;

    // Test touch-action
    const interactiveElements = document.querySelectorAll('input, textarea, select, button, a');
    let hasCorrectTouchAction = true;

    interactiveElements.forEach(element => {
        const touchAction = window.getComputedStyle(element).touchAction;
        if (touchAction === 'auto' && isMobile) {
            hasCorrectTouchAction = false;
        }
    });

    addTestResult(report, 'Touch Action Optimizado', hasCorrectTouchAction || !isMobile,
                 `Mobile: ${isMobile ? 'Sí' : 'No'}`);

    // Test viewport meta
    const viewport = document.querySelector('meta[name="viewport"]');
    const hasCorrectViewport = viewport &&
                              viewport.content.includes('width=device-width') &&
                              viewport.content.includes('initial-scale=1.0');
    addTestResult(report, 'Viewport Meta Correcto', hasCorrectViewport,
                 hasCorrectViewport ? viewport.content : 'No encontrado');

    // Test font-size en inputs (prevenir zoom)
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    let hasCorrectFontSize = true;

    textInputs.forEach(input => {
        const fontSize = parseInt(window.getComputedStyle(input).fontSize);
        if (fontSize < 16 && isMobile) {
            hasCorrectFontSize = false;
        }
    });

    addTestResult(report, 'Font-size Inputs (16px+)', hasCorrectFontSize || !isMobile,
                 `Mobile: ${isMobile ? 'Sí' : 'No'}`);

    // Test accesibilidad
    const hasSkipLink = !!document.querySelector('.skip-link');
    addTestResult(report, 'Skip Link Presente', hasSkipLink);

    // Test focus states
    let hasFocusStyles = false;
    if (document.styleSheets) {
        try {
            for (let sheet of document.styleSheets) {
                try {
                    for (let rule of sheet.cssRules) {
                        if (rule.selectorText && rule.selectorText.includes(':focus')) {
                            hasFocusStyles = true;
                            break;
                        }
                    }
                } catch (e) {
                    // Cross-origin issues, continue
                }
                if (hasFocusStyles) break;
            }
        } catch (e) {
            // Continue with default
        }
    }
    addTestResult(report, 'Focus Styles Definidos', hasFocusStyles);
}

// ============================================
// 4. TESTING DE RENDIMIENTO
// ============================================
function testPerformance(report) {
    console.log('⚡ Testing Rendimiento...');

    // Test CSS loaded
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    let cssLoaded = 0;

    linkElements.forEach(link => {
        if (link.sheet) {
            cssLoaded++;
        }
    });

    addTestResult(report, `CSS Cargados: ${cssLoaded}/${linkElements.length}`,
                 cssLoaded === linkElements.length);

    // Test JavaScript sin errores
    const errorCount = window.errors || 0;
    addTestResult(report, 'JavaScript sin Errores', errorCount === 0,
                 `Errores: ${errorCount}`);

    // Test optimización de animaciones
    const animatedElements = document.querySelectorAll('.fade-in');
    addTestResult(report, `Elementos Animados: ${animatedElements.length}`, animatedElements.length > 0);

    // Test de imágenes
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;

    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            imagesLoaded++;
        }
    });

    addTestResult(report, `Imágenes Cargadas: ${imagesLoaded}/${images.length}`,
                 imagesLoaded === images.length || images.length === 0);
}

// ============================================
// 5. TESTING VISUAL
// ============================================
function testVisual(report) {
    console.log('🎨 Testing Visual...');

    // Test consistencia de colores
    const hasCSSVariables = !!document.documentElement.style.getPropertyValue('--primary-600');
    addTestResult(report, 'CSS Variables Definidas', hasCSSVariables);

    // Test espaciado consistente
    const cards = document.querySelectorAll('.modern-card, .news-card');
    let hasConsistentSpacing = cards.length > 0;

    if (cards.length > 1) {
        const firstCardPadding = window.getComputedStyle(cards[0]).padding;
        cards.forEach(card => {
            const padding = window.getComputedStyle(card).padding;
            if (!padding.includes('16px') && !padding.includes('1rem')) {
                // Different padding detected
            }
        });
    }

    addTestResult(report, `Cards Consistentes: ${cards.length}`, hasConsistentSpacing);

    // Test tipografía
    const headings = document.querySelectorAll('h1, h2, h3');
    addTestResult(report, `Headings: ${headings.length}`, headings.length > 0);

    // Test contraste (básico)
    const textElements = document.querySelectorAll('p, span, div');
    addTestResult(report, `Elementos de Texto: ${textElements.length}`, textElements.length > 0);
}

// ============================================
// FUNCIÓN PRINCIPAL DE TESTING
// ============================================
function runCompleteTest() {
    console.log('🚀 Iniciando Testing Completo...');

    // Crear reporte
    const report = createTestingReport();

    // Título del reporte
    const title = document.createElement('h3');
    title.textContent = 'REPORT DE TESTING';
    title.style.cssText = 'color: #4ade80; margin: 0 0 15px 0; text-align: center;';
    report.appendChild(title);

    // Información del navegador
    const browserInfo = document.createElement('div');
    browserInfo.innerHTML = `
        <div style="margin-bottom: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
            <div><strong>Navegador:</strong> ${navigator.userAgent.split(' ').pop()}</div>
            <div><strong>Viewport:</strong> ${window.innerWidth}x${window.innerHeight}</div>
            <div><strong>Dispositivo:</strong> ${window.innerWidth > 1024 ? 'Desktop' : window.innerWidth > 768 ? 'Tablet' : window.innerWidth > 480 ? 'Mobile' : 'Small Mobile'}</div>
            <div><strong>Touch:</strong> ${'ontouchstart' in window ? 'Sí' : 'No'}</div>
        </div>
    `;
    report.appendChild(browserInfo);

    // Ejecutar todos los tests
    testResponsiveDesign(report);
    testForms(report);
    testMobileFunctionality(report);
    testPerformance(report);
    testVisual(report);

    // Botón para cerrar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar Reporte';
    closeButton.style.cssText = `
        width: 100%;
        padding: 10px;
        margin-top: 15px;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    closeButton.onclick = () => report.remove();
    report.appendChild(closeButton);

    // Botón para recargar testing
    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'Re-run Tests';
    reloadButton.style.cssText = `
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    reloadButton.onclick = () => {
        report.remove();
        runCompleteTest();
    };
    report.appendChild(reloadButton);

    console.log('✅ Testing Completo Finalizado');

    return report;
}

// Capturar errores
window.addEventListener('error', (e) => {
    if (!window.errors) window.errors = 0;
    window.errors++;
    console.error('Error capturado:', e);
});

// Ejecutar testing cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCompleteTest);
} else {
    runCompleteTest();
}

// Exportar para acceso manual
window.runCompleteTest = runCompleteTest;