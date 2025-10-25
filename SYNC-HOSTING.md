# 🚀 Guía de Sincronización: GitHub → Hosting

Esta guía explica cómo sincronizar automáticamente tu repositorio de GitHub con tu hosting en **iasalta.socialsflow.io**.

---

## 📋 Tabla de Contenidos

1. [Deployment Automático (GitHub Actions)](#-opción-1-deployment-automático-recomendado)
2. [Deployment Manual (Script)](#-opción-2-deployment-manual)
3. [Deployment con FileZilla](#-opción-3-deployment-con-filezilla)
4. [Troubleshooting](#-troubleshooting)

---

## 🤖 OPCIÓN 1: Deployment Automático (Recomendado)

### ✨ Ventajas
- ✅ **Automático**: Se despliega cada vez que haces push a `main`
- ✅ **Seguro**: Credenciales encriptadas en GitHub
- ✅ **Rápido**: 2-3 minutos por deployment
- ✅ **Historial**: Ver todos los deployments en GitHub Actions

### 📝 Configuración (Solo una vez)

#### Paso 1: Obtener credenciales FTP de tu hosting

Necesitás 3 datos de tu cPanel o panel de hosting:

1. **FTP Server**: `ftp.socialsflow.io` o `iasalta.socialsflow.io`
2. **FTP Username**: Tu usuario FTP (ej: `usuario@iasalta.socialsflow.io`)
3. **FTP Password**: Tu contraseña FTP

#### Paso 2: Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub: https://github.com/Juampipey32/iasalta
2. Click en **Settings** (Configuración)
3. En el menú izquierdo, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret** y agrega estos 3 secrets:

   **Secret 1:**
   - Name: `FTP_SERVER`
   - Value: `ftp.socialsflow.io` (o el que te dé tu hosting)

   **Secret 2:**
   - Name: `FTP_USERNAME`
   - Value: Tu usuario FTP completo

   **Secret 3:**
   - Name: `FTP_PASSWORD`
   - Value: Tu contraseña FTP

#### Paso 3: ¡Listo! 🎉

Ahora cada vez que hagas:
```bash
git push origin main
```

El sitio se desplegará automáticamente en **iasalta.socialsflow.io**

### 📊 Ver el progreso del deployment

1. Ve a tu repo en GitHub
2. Click en la pestaña **Actions**
3. Verás el deployment en progreso con logs en tiempo real

### 🔄 Deployment manual desde GitHub

Si querés deployar sin hacer push:

1. Ve a **Actions** en tu repo
2. Click en **🚀 Deploy to Production**
3. Click en **Run workflow** → **Run workflow**

---

## 💻 OPCIÓN 2: Deployment Manual (Script)

### Cuándo usar esto
- Si GitHub Actions no funciona
- Si querés más control del proceso
- Si necesitás deployar desde tu máquina local

### 🛠️ Instalación

#### En Linux/Ubuntu:
```bash
sudo apt-get update
sudo apt-get install lftp
```

#### En macOS:
```bash
brew install lftp
```

#### En Windows:
Usá WSL (Windows Subsystem for Linux) o Git Bash

### 🚀 Uso

1. **Primera vez** (configuración):
```bash
./deploy-manual.sh
```

El script te pedirá:
- FTP Server (ej: `ftp.socialsflow.io`)
- FTP Username
- FTP Password
- Remote Directory (ej: `/public_html/`)

Estos datos se guardarán en `.env.ftp` (no se subirá a GitHub por seguridad)

2. **Deployments siguientes**:
```bash
./deploy-manual.sh
```

Ya no te pedirá las credenciales, usará las guardadas.

### 📝 Qué hace el script

1. ✅ Verifica credenciales FTP
2. 📦 Prepara archivos (excluye `.git`, `node_modules`, etc.)
3. 🚀 Sube archivos al hosting vía FTP
4. 🗑️ Elimina archivos viejos del servidor
5. ✨ Muestra resultado del deployment

---

## 📁 OPCIÓN 3: Deployment con FileZilla

### Si preferís usar una interfaz gráfica:

1. **Descarga FileZilla**: https://filezilla-project.org/
2. **Conecta a tu hosting**:
   - Host: `ftp.socialsflow.io`
   - Username: Tu usuario FTP
   - Password: Tu contraseña FTP
   - Port: `21`

3. **Sube los archivos**:
   - Lado izquierdo: Tu carpeta local del repo
   - Lado derecho: `/public_html/` en el servidor
   - Arrastra los archivos que cambiaron

### ⚠️ NO subir estos archivos:
- `.git/` (carpeta)
- `.github/` (carpeta)
- `node_modules/` (carpeta)
- `.gitignore`
- `.ftpignore`
- `*.md` (archivos markdown)
- `deploy-manual.sh`
- `.env.ftp`

---

## 📦 Archivos que SÍ debes subir

```
✅ index.html
✅ ia-positiva.html
✅ articulos-valor-positivo.html
✅ lo-basico-ia.html
✅ contacto.html
✅ 404.html
✅ bolt-lovable-styles.css
✅ bolt-lovable-styles.min.css
✅ critical-css.css
✅ manifest.json
✅ assets/ (toda la carpeta)
```

---

## 🔍 Verificar Deployment

Después de deployar, verifica:

1. **Página principal**: https://iasalta.socialsflow.io
2. **Limpia caché**: `Ctrl + Shift + R` (o `Cmd + Shift + R` en Mac)
3. **Revisa consola**: `F12` → Console (no debe haber errores 404)
4. **Prueba en móvil**: Abre en tu celular

---

## 🛠️ Troubleshooting

### ❌ Error: "Authentication failed"
**Solución**: Verifica tus credenciales FTP en cPanel

### ❌ Error: "Connection timeout"
**Solución**:
- Verifica que el servidor FTP es correcto
- Algunos hostings usan puerto `22` (SFTP) en vez de `21` (FTP)

### ❌ Los cambios no se ven en el sitio
**Solución**:
1. Limpia caché del navegador: `Ctrl + Shift + R`
2. Verifica que los archivos se subieron correctamente
3. Revisa la consola del navegador (F12) por errores

### ❌ GitHub Actions falla
**Solución**:
1. Verifica que los 3 secrets estén configurados correctamente
2. Ve a **Actions** → Click en el deployment fallido → Ver logs
3. El error suele estar en las credenciales FTP

### ❌ Archivos 404 en el sitio
**Solución**: Verifica que la estructura de carpetas en el servidor sea:
```
/public_html/
├── index.html
├── ia-positiva.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── ...
```

### ❌ Script deploy-manual.sh no funciona
**Solución**:
```bash
# Dale permisos de ejecución
chmod +x deploy-manual.sh

# Instala lftp si no lo tienes
# Linux:
sudo apt-get install lftp

# Mac:
brew install lftp
```

---

## 📊 Workflow Recomendado

### Desarrollo diario:

```bash
# 1. Hacer cambios en el código
vim index.html

# 2. Probar localmente
# Abre index.html en el navegador

# 3. Commit cambios
git add .
git commit -m "Fix: Descripción del cambio"

# 4. Push a GitHub (se despliega automáticamente)
git push origin main

# 5. Espera 2-3 minutos

# 6. Verifica en producción
# https://iasalta.socialsflow.io
```

### Deployment urgente:

```bash
# Si GitHub Actions tarda o falla, usa el script manual
./deploy-manual.sh
```

---

## 🔐 Seguridad

### ✅ Buenas prácticas:

- **NUNCA** comitees `.env.ftp` al repo
- **NUNCA** compartas tus credenciales FTP públicamente
- Usa **contraseñas fuertes** para FTP
- Cambia contraseñas FTP cada 3-6 meses
- Activa **2FA** en GitHub si está disponible

### ⚠️ Archivos sensibles en .gitignore:

```
.env.ftp          # Credenciales FTP
*.ftp             # Cualquier archivo FTP
.env              # Variables de entorno
node_modules/     # Dependencias
```

---

## 📞 Soporte

### Si tenés problemas:

1. **Revisa los logs**:
   - GitHub Actions: Ve a **Actions** → Click en el deployment fallido
   - Script manual: El script muestra errores en la terminal

2. **Verifica credenciales**: Ingresa a tu cPanel y prueba las credenciales FTP

3. **Contacta a tu hosting**: Si el FTP no funciona, contacta soporte de socialflow.io

---

## 🎉 ¡Todo configurado!

Ahora tenés 3 formas de deployar tu sitio:

1. **🤖 Automático**: Push a `main` → Deploy automático
2. **💻 Script**: `./deploy-manual.sh` → Deploy desde tu máquina
3. **📁 FileZilla**: Arrastra y suelta archivos

**Recomendación**: Usá el **deployment automático** (GitHub Actions) para todos tus cambios normales. Es más rápido, seguro y mantiene historial.

---

*Última actualización: 2025-10-24*
*Versión: 1.0*
