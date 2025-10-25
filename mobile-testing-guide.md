# Guía de Testing para Móviles - Contacto.html

## Dispositivos Prioritarios para Testing

### 1. MÓVILES PEQUEÑOS (320-360px)
- **iPhone 5/5S/SE (320px x 568px)**
  - Verificar: Grid de stats → 1 columna
  - Verificar: Formulario → inputs de 100% ancho
  - Verificar: Navegación → menú hamburguesa funcional
  - Verificar: Botones → hit area mínima 44px

- **Samsung Galaxy J5 (360px x 640px)**
  - Verificar: Padding lateral → no overflow
  - Verificar: Texto → legible sin zoom
  - Verificar: Formularios → sin scroll horizontal

### 2. MÓVILES ESTÁNDAR (375-414px)
- **iPhone 12/13 (390px x 844px)**
  - Verificar: Grid de stats → 2 columnas funcionales
  - Verificar: Grid de proceso → 2 columnas óptimas
  - Verificar: Cards → espaciado adecuado
  - Verificar: Formulario → 2 columnas en modo tablet

- **Google Pixel 5 (393px x 851px)**
  - Verificar: Animaciones →流畅
  - Verificar: Botones neon → efecto visible
  - Verificar: Footer → 4 columnas → 2 columnas

### 3. TABLETS PEQUEÑAS (768px)
- **iPad Mini (768px x 1024px)**
  - Verificar: Grid de contacto → 2 columnas
  - Verificar: Grid de servicios → 2-3 columnas
  - Verificar: Formulario → inputs lado a lado
  - Verificar: Navegación → desktop o móvil según orientación

- **Samsung Galaxy Tab A (768px x 1024px)**
  - Verificar: Contenido centrado
  - Verificar: Espaciado proporcional
  - Verificar: Menú → comportamiento correcto

## Checklist de Testing por Componente

### ✅ NAVEGACIÓN
- [ ] Menú hamburguesa aparece solo en móvil (≤768px)
- [ ] Menú se abre/cierra correctamente
- [ ] Overlay oscuro funciona
- [ ] Scroll del body se bloquea con menú abierto
- [ ] Enlaces del menú son clickeables
- [ ] Cierre con tecla Escape funciona
- [ ] Cierre al hacer fuera del menú funciona

### ✅ HERO SECTION
- [ ] Título responsive (clamp function funciona)
- [ ] Subtítulo sin overflow
- [ ] Grid de stats:
  - [ ] Desktop: 3 columnas
  - [ ] Tablet: 2 columnas
  - [ ] Móvil: 1 columna
- [ ] Botones centrados y accesibles
- [ ] Sin scroll horizontal

### ✅ SECCIÓN DE SERVICIOS
- [ ] Grid de servicios:
  - [ ] Desktop: 3 columnas
  - [ ] Tablet: 2 columnas
  - [ ] Móvil: 1 columna
- [ ] Cards sin overflow
- [ ] Iconos centrados
- [ ] Texto legible
- [ ] Botones funcionales

### ✅ PROCESO DE TRABAJO
- [ ] Grid de proceso:
  - [ ] Desktop: 4 columnas
  - [ ] Tablet: 2 columnas
  - [ ] Móvil: 1 columna
- [ ] Números de paso visibles
- [ ] Iconos alineados
- [ ] Texto sin cortar

### ✅ TESTIMONIOS
- [ ] Cards de testimonios centradas
- [ ] Avatares circulares visibles
- [ ] Estrellas completas
- [ ] Texto sin overflow
- [ ] Métricas destacadas

### ✅ FORMULARIO DE COMENTARIOS
- [ ] Formulario centrado
- [ ] Inputs de 100% ancho en móvil
- [ ] Select funcional
- [ ] Textarea expansible
- [ ] Contador de caracteres funcionando
- [ ] Botón enviar accesible

### ✅ COMENTARIOS EXISTENTES
- [ ] Grid de comentarios responsive
- [ ] Cards sin overflow
- [ ] Avatares visibles
- [ ] Badges legibles
- [ ] Botones like funcionales
- [ ] Contadores de vistas

### ✅ FORMULARIO DE CONTACTO PRINCIPAL
- [ ] Grid principal:
  - [ ] Desktop: 2 columnas
  - [ ] Móvil: 1 columna
- [ ] Form rows:
  - [ ] Desktop: 2 columnas
  - [ ] Móvil: 1 columna
- [ ] Todos los inputs accesibles
- [ ] Selects funcionales
- [ ] Checkbox visible y clickeable
- [ ] Botones submit/reset funcionales
- [ ] Validación HTML5 funcionando

### ✅ FOOTER
- [ ] Grid del footer:
  - [ ] Desktop: 4 columnas
  - [ ] Tablet: 2 columnas
  - [ ] Móvil: 1 columna
- [ ] Redes sociales accesibles
- [ ] Enlaces funcionales
- [ ] Copyright centrado

## Herramientas de Testing

### 1. DEVTOOLS CHROME
```javascript
// Emulación de dispositivos
1. F12 → DevTools
2. Ctrl+Shift+M (Toggle device toolbar)
3. Seleccionar dispositivo del dropdown
4. Probar diferentes resoluciones

// Network throttling
1. Network tab → Throttling
2. Seleccionar "Slow 3G" o "Fast 3G"
3. Probar rendimiento
```

### 2. RESPONSIVE DESIGN TESTERS ONLINE
- [ ] **responsivedesignchecker.com**
- [ ] **responsivetest.net**
- [ ] **browserstack.com** (trial gratuito)

### 3. DISPOSITIVOS FÍSICOS REALES
- [ ] iPhone (iOS 14+)
- [ ] Android (Samsung, Google Pixel)
- [ ] Tablet (iPad, Android)

## Problemas Comunes a Detectar

### 🚨 OVERFLOW HORIZONTAL
```css
/* Síntomas: Scroll horizontal no deseado */
* Verificar en DevTools: Elements → Computed → overflow-x
* Buscar elementos con width > 100vw
* Revisar padding/margin que sumen más de 100vw
```

### 🚨 ZOOM NO INTENCIONADO
```css
/* Síntomas: iOS zoom en inputs */
* Verificar font-size < 16px en inputs
* Revisar viewport meta tag
* Probar input[type="text"] focus behavior
```

### 🚨 ELEMENTOS TÁCTILES PEQUEÑOS
```css
/* Síntomas: Dificultad tocar elementos */
* Medir hit area con DevTools Ruler
* Verificar min-width/min-height: 44px
* Probar con dedo en dispositivo real
```

### 🚨 PERFORMANCE
```javascript
// Síntomas: Animaciones lentas
1. Performance tab → Record
2. Interactuar con la página
3. Analizar FPS y jank
4. Buscar bloqueos largos (>50ms)
```

## Métricas de Éxito

### ✅ ACCESIBILIDAD WCAG
- [ ] Contraste mínimo 4.5:1 en texto normal
- [ ] Hit area mínima 44x44px para elementos táctiles
- [ ] Navegación por teclado funcional
- [ ] Focus indicators visibles

### ✅ PERFORMANCE
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

### ✅ USABILIDAD MÓVIL
- [ ] Sin scroll horizontal
- [ ] Texto legible sin pinch-to-zoom
- [ ] Elementos espaciados adecuadamente
- [ ] Formularios fáciles de completar

## Pasos para Implementar y Testing

### 1. IMPLEMENTACIÓN
```bash
# 1. Agregar CSS corregido
cp contacto-resp-fixes.css assets/css/

# 2. Modificar contacto.html con las correcciones
# (Ver contacto-html-corrections.md)

# 3. Probar localmente
python -m http.server 8000
# Visitar http://localhost:8000/contacto.html
```

### 2. TESTING LOCAL
```bash
# 1. Abrir en Chrome DevTools
# 2. Probar cada dispositivo prioritario
# 3. Documentar problemas encontrados
# 4. Corregir iterativamente
```

### 3. TESTING REAL
```bash
# 1. Desplegar a staging
# 2. Probar en dispositivos reales
# 3. Capturar screenshots
# 4. Validar funcionamiento completo
```

### 4. VALIDACIÓN FINAL
- [ ] Cumple todos los checklist items
- [ ] Sin errores en console
- [ ] Performance aceptable
- [ ] Accesibilidad verificada
- [ ] Cross-browser testing completado