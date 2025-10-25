# 🚀 Instrucciones para Deploy Automático a Hostinger

## Opción 1: Deploy Automático con GitHub Actions (Recomendado)

### 1. Configurar Secrets en GitHub
Ve a tu repositorio GitHub → Settings → Secrets and variables → Actions

Agrega estos secrets:

```
FTP_SERVER = ftp.your-domain.com
FTP_USERNAME = tu_usuario_hostinger
FTP_PASSWORD = tu_contraseña_ftp
SITE_URL = https://your-domain.com
```

### 2. Activar GitHub Actions
- Sube el archivo `.github/workflows/deploy-hostinger.yml`
- Ve a la pestaña "Actions" en GitHub
- Activa los workflows si están deshabilitados

### 3. Deploy Automático
Cada vez que hagas push a `main`, el deploy será automático.

---

## Opción 2: Deploy Manual con FTP/SFTP

### FileZilla (Windows/Mac/Linux)
1. Descarga e instala FileZilla: https://filezilla-project.org/
2. Conéctate con tus credenciales de Hostinger:
   - **Host**: ftp.your-domain.com
   - **Username**: tu_usuario_hostinger
   - **Password**: tu_contraseña
   - **Port**: 21 (FTP) o 22 (SFTP)

3. Arrastra todos los archivos del proyecto a la carpeta `public_html/`

### lftp (Terminal Linux/Mac)
```bash
# Instalar lftp
sudo apt-get install lftp  # Ubuntu/Debian
brew install lftp          # macOS

# Conectar y sincronizar
lftp -u tu_usuario,tu_contraseña ftp.your-domain.com
mirror --reverse --delete --verbose ./ /public_html/
quit
```

### WinSCP (Windows)
1. Descarga WinSCP: https://winscp.net/
2. Configura conexión SFTP con tus datos de Hostinger
3. Sincroniza la carpeta local con `public_html/`

---

## Opción 3: Deploy con Git en Hostinger (SSH)

Si tienes acceso SSH a tu cuenta Hostinger:

```bash
# Conectar por SSH
ssh tu_usuario@your-domain.com

# Navegar al directorio web
cd ~/public_html/

# Clonar o actualizar repositorio
git init
git remote add origin https://github.com/Juampipey32/iasalta.git
git pull origin main

# Para futuras actualizaciones
git pull origin main
```

---

## 📋 Checklist Antes del Deploy

### ✅ Archivos Críticos que deben subirse:
- `index.html` - Página principal con cumpleaños
- `contacto.html` - Contacto reparado para móvil
- `bolt-lovable-styles.css` - Estilos principales
- `contacto-responsive-fixes.css` - Fixes responsive
- `assets/js/main.js` - Datos y configuración
- `assets/images/andres-garrido-birthday.png` - Foto de Tutu
- `CLAUDE.md` - Documentación
- `.htaccess` - Configuración de servidor

### ✅ Archivos que pueden omitirse:
- `.github/` - Solo si no usas GitHub Actions
- `*.md` - Documentación (excepto README.md si lo quieres)
- `Generated Image*.png` - Imagen temporal
- `.claude/` - Configuración local

---

## 🎯 Verificación Post-Deploy

Después de subir los archivos, verifica:

1. ✅ **Página principal** carga correctamente
2. ✅ **Cumpleaños de Tutu** se muestra con foto y botón de Facebook
3. ✅ **Contacto.html** funciona bien en móvil
4. ✅ **Todos los formularios** son funcionales
5. ✅ **No hay errores 404** en imágenes o archivos
6. ✅ **Responsive design** funciona en todos los dispositivos

---

## 🔧 Troubleshooting

### Si tienes problemas de permisos:
```bash
# SSH a tu servidor
chmod 644 *.html *.css *.js
chmod 755 assets/
chmod 644 assets/*/*
```

### Si las imágenes no cargan:
- Verifica que los nombres de archivo coincidan exactamente
- Revisa que estén en la carpeta correcta `assets/images/`
- Los nombres son case-sensitive

### Si el CSS no se aplica:
- Verifica que los archivos CSS estén subidos
- Revisa las rutas en los tags `<link>`
- Limpia la caché del navegador

---

## 🚀 ¡Listo para Producir!

Una vez completado el deploy, tu sitio estará disponible en:
- **URL principal**: https://your-domain.com
- **Cumpleaños Tutu**: Listo para recibir saludos por Facebook
- **Contacto**: 100% funcional en todos los dispositivos

¡Felicidades a Tutu por su cumpleaños! 🎂👼🏆