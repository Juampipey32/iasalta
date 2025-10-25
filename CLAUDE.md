# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**JUAMPI IA** is a hybrid AI news portal that combines ultra-fast performance (Bolt principles) with modern design systems (Lovable principles). It's a production-optimized Spanish-language website focused on artificial intelligence news, applications, and educational content.

### Key Architecture

- **Static Site**: Pure HTML/CSS/JavaScript with no build dependencies
- **Performance-First**: Sub-1 second load times with 90% CSS optimization
- **Bolt/Lovable Hybrid**: Fast loading + modern design system
- **News Portal**: AI-focused content with multiple categories
- **Production Ready**: A+ security rating, WCAG 2.1 AA compliance

## Development Commands

### File Operations
```bash
# No build process required - static files
# Edit HTML/CSS/JS directly
# Use minified versions for production:
#   bolt-lovable-styles.min.css (12.8KB production)
#   bolt-lovable-styles.css (140KB development)
```

### Local Development
```bash
# Serve locally (any static server)
python -m http.server 8000
# or
npx serve .
# then visit http://localhost:8000
```

### Validation & Testing
```bash
# Validate HTML
# Use online validators or browser dev tools

# Check performance
# Use Chrome Lighthouse extension
# Target: 95+ performance score

# Test accessibility
# Use axe DevTools extension
# WCAG 2.1 AA compliance required
```

### Production Deployment
```bash
# Files to deploy:
- index.html (and all HTML pages)
- bolt-lovable-styles.min.css
- assets/ (images, JS files)
- .htaccess (for Apache servers)
- manifest.json
- sitemap.xml
```

## File Structure & Architecture

### Core Files
- **`index.html`**: Main homepage with critical CSS inline
- **`bolt-lovable-styles.css`**: Development CSS (140KB)
- **`bolt-lovable-styles.min.css`**: Production CSS (12.8KB)
- **`.htaccess`**: Server configuration for security/performance
- **`manifest.json`**: PWA configuration

### Content Pages
- **`ia-positiva.html`**: Positive AI applications and news
- **`lo-basico-ia.html`**: Basic AI concepts and education
- **`contacto.html`**: Contact form and information
- **`articulos-valor-positivo.html`**: Featured articles collection
- **`404.html`**: Custom error page

### Assets Organization
```
assets/
├── images/           # Site images and graphics
├── js/              # JavaScript modules
│   ├── main.js       # Site data and configuration
│   ├── config.js     # Theme and app configuration
│   ├── common.js     # Shared utilities
│   └── mobile-menu-unificado.js  # Mobile navigation
├── minified/         # Minified production JS
└── *.json           # Content data files
```

## Configuration System

### Site Data (`assets/js/main.js`)
Contains all site content including:
- `featuredArticles`: Homepage articles
- `iaPositiva`: Positive AI content
- Category-based content organization

### Theme Configuration (`assets/js/config.js`)
Central configuration for:
- Colors and design tokens
- Animation settings
- Social media links
- Error handling
- Utility functions

### Design Tokens
```css
:root {
  --primary-500: #3b82f6;    /* Main brand color */
  --secondary-500: #0ea5e9;  /* Secondary accent */
  --accent-500: #d946ef;     /* Vibrant accent */
  --dark-gradient: linear-gradient(135deg, #0a0e27 0%, #151933 50%, #1a1f3a 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
}
```

## Performance Optimizations

### Critical CSS
- Above-the-fold styles inline in HTML `<head>`
- Non-critical CSS loaded asynchronously
- Hardware-accelerated animations only (`transform`, `opacity`)

### JavaScript Architecture
- **Module pattern**: Organized functionality in separate files
- **DOM caching**: Elements cached on initialization
- **Event delegation**: Efficient event handling
- **Debouncing**: Optimized scroll/resize handlers

### Image Optimization
- Native lazy loading with `loading="lazy"`
- Proper width/height attributes to prevent layout shift
- Fallback error handling for failed loads

### Security Features
- Content Security Policy (CSP) headers
- XSS protection
- Clickjacking prevention
- HTTPS enforcement via `.htaccess`

## Content Management

### Adding New Articles
Update `assets/js/main.js`:
```javascript
// Add to featuredArticles array
{
  id: unique_id,
  title: 'Article Title',
  excerpt: 'Brief description...',
  category: 'Category',
  image: 'path/to/image.jpg',
  date: 'YYYY-MM-DD',
  featured: true/false,
  link: 'page.html#anchor'
}
```

### Updating Content Sections
- Homepage articles: Modify `featuredArticles` in `main.js`
- IA positive content: Update `iaPositiva.articles` array
- New categories: Add to appropriate content arrays

### Image Management
- Store in `assets/images/`
- Use WebP format when possible
- Include proper alt text for accessibility
- Maintain consistent naming convention

## Code Style & Standards

### CSS Principles
- Use design tokens, not hard-coded values
- Mobile-first responsive design
- Hardware-accelerated animations only
- Minimal specificity in selectors
- Consistent naming conventions (BEM-style)

### JavaScript Best Practices
- Module pattern for organization
- Event delegation for performance
- Debounce expensive operations
- Cache DOM elements
- Handle errors gracefully
- Use modern ES6+ features

### Accessibility Requirements
- WCAG 2.1 AA compliance minimum
- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast minimum 4.5:1 ratio
- Focus management and skip links

## Deployment Notes

### Server Requirements
- Apache or Nginx server
- HTTPS/SSL certificate required
- Gzip/Brotli compression recommended
- Proper MIME type configuration

### Performance Targets
- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Browser Support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Graceful degradation for older browsers
- Progressive enhancement approach

## Maintenance Tasks

### Regular Updates
1. Update article content in `main.js`
2. Add new images to `assets/images/`
3. Test performance with Lighthouse
4. Validate HTML/CSS
5. Check accessibility compliance

### Performance Monitoring
- Monitor Core Web Vitals
- Check loading performance
- Validate security headers
- Test mobile responsiveness

### Content Refresh
- Update featured articles regularly
- Refresh news content
- Update dates and timestamps
- Verify all links work

## Troubleshooting

### Common Issues
- **Slow loading**: Check image sizes and CSS minification
- **Layout shift**: Ensure image dimensions are set
- **JavaScript errors**: Check browser console
- **CSS not loading**: Verify file paths and server configuration

### Debug Tools
- Chrome DevTools for performance debugging
- Lighthouse for accessibility and SEO
- Browser console for JavaScript errors
- Online HTML/CSS validators

## Security Considerations

- No server-side processing (static site)
- CSP headers implemented via `.htaccess`
- No user input processing beyond contact form
- Regular security audits recommended
- Keep dependencies updated (if any added)

---

## Key Development Principles

1. **Performance First**: Every decision prioritizes speed
2. **Accessibility Required**: WCAG 2.1 AA minimum
3. **Mobile-First**: Design for mobile, enhance for desktop
4. **Security Focused**: A+ security rating maintained
5. **Static Architecture**: No build process, direct file editing