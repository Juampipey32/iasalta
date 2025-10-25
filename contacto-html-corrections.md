# Correcciones Específicas para contacto.html

## Cambios Requeridos en el HTML (líneas específicas)

### 1. CORRECCIÓN GRID DE STATS (Línea 73)
**CÓDIGO ACTUAL (PROBLEMÁTICO):**
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6); max-width: 800px; margin: 0 auto;">
```

**CÓDIGO CORREGIDO:**
```html
<div class="hero-stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-6); max-width: 800px; margin: 0 auto;">
```

### 2. CORRECCIÓN GRID DE PROCESO (Línea 207)
**CÓDIGO ACTUAL (PROBLEMÁTICO):**
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-8);">
```

**CÓDIGO CORREGIDO:**
```html
<div class="contacto-proceso-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-8);">
```

### 3. CORRECCIÓN CONTENEDOR HERO (Línea 45)
**CÓDIGO ACTUAL (PROBLEMÁTICO):**
```html
<div class="hero-content" style="position: relative; z-index: 1;">
```

**CÓDIGO CORREGIDO:**
```html
<div class="hero-content" style="position: relative; z-index: 1; max-width: 100%; padding: 0 var(--space-4);">
```

### 4. CORRECCIÓN SUBTÍTULO HERO (Línea 56)
**CÓDIGO ACTUAL (PROBLEMÁTICO):**
```html
<p class="hero-subtitle" style="font-size: clamp(1.125rem, 2vw, 1.5rem); margin-bottom: var(--space-8); max-width: 700px;">
```

**CÓDIGO CORREGIDO:**
```html
<p class="hero-subtitle" style="font-size: clamp(1.125rem, 2vw, 1.5rem); margin-bottom: var(--space-8); max-width: 100%; padding: 0 var(--space-4);">
```

### 5. CORRECCIÓN GRID DE SERVICIOS (Línea 103)
**CÓDIGO ACTUAL (PROBLEMÁTICO):**
```html
<div class="news-cards-grid" style="margin-bottom: var(--space-16);">
```

**CÓDIGO CORREGIDO:**
```html
<div class="news-cards-grid" style="margin-bottom: var(--space-16); padding: 0 var(--space-4);">
```

### 6. CORRECCIÓN FORMULARIO PRINCIPAL (Línea 549)
**CÓDIGO ACTUAL (PROBLEMÁTICO):**
```html
<div class="contact-form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); max-width: 1200px; margin: 0 auto;">
```

**CÓDIGO CORREGIDO:**
```html
<div class="contact-form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); max-width: 1200px; margin: 0 auto; padding: 0 var(--space-4);">
```

### 7. CORRECCIÓN FORMULARIO COMENTARIOS (Línea 374)
**CÓDIGO ACTUAL (PROBLEMÁTICO):**
```html
<div class="modern-card fade-in" style="max-width: 600px; margin: 0 auto var(--space-16); background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(217, 70, 239, 0.1)); border: 1px solid rgba(255, 255, 255, 0.2);">
```

**CÓDIGO CORREGIDO:**
```html
<div class="modern-card fade-in" style="max-width: 100%; margin: 0 auto var(--space-16); background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(217, 70, 239, 0.1)); border: 1px solid rgba(255, 255, 255, 0.2); padding: var(--space-6) var(--space-4);">
```

### 8. CORRECCIÓN GRID DE COMENTARIOS (Línea 443)
**CÓDIGO ACTUAL (PROBLEMÁTICO):**
```html
<div id="comentariosContainer" class="news-cards-grid">
```

**CÓDIGO CORREGIDO:**
```html
<div id="comentariosContainer" class="news-cards-grid" style="padding: 0 var(--space-4);">
```

## Adiciones al HEAD del HTML

Agregar después del CSS principal:
```html
<!-- Correcciones Responsive para Contacto -->
<link rel="stylesheet" href="contacto-resp-fixes.css">
```

## Adiciones de Clases CSS para Accesibilidad Móvil

Agregar las siguientes clases a elementos específicos:

### Botones y elementos táctiles:
```html
<!-- Aumentar hit area en botones -->
<button type="submit" class="modern-button neon-button mobile-full-width">
<button type="reset" class="modern-button outline mobile-full-width">
```

### Inputs del formulario:
```html
<!-- Inputs accesibles para móvil -->
<input type="text" class="mobile-spaced" ...>
<input type="email" class="mobile-spaced" ...>
<textarea class="mobile-spaced" ...>
```

## Mejoras de Viewport y Meta Tags

Asegurar que estos meta tags estén presentes:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
<meta name="format-detection" content="telephone=no">
```

## JavaScript Adicional para Móvil

Agregar al final del body:
```html
<script>
// Mejoras táctiles adicionales para móvil
if (window.innerWidth <= 768) {
  // Prevenir zoom en inputs focus
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.fontSize = '16px';
    });
  });

  // Optimizar scroll en formularios
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('touchstart', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setTimeout(() => {
          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    });
  });
}
</script>
```