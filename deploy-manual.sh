#!/bin/bash

# 🚀 Manual Deployment Script for IA Salta
# Este script sube los archivos al hosting vía FTP

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo ""
echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🚀 IA SALTA - Manual Deployment   ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"
echo ""

# Verificar si existe archivo de configuración
CONFIG_FILE=".env.ftp"

if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${YELLOW}⚠️  No se encontró archivo de configuración FTP${NC}"
    echo -e "${YELLOW}📝 Creando archivo de configuración...${NC}"
    echo ""

    # Solicitar datos
    read -p "🌐 FTP Server (ej: ftp.tuhosting.com): " FTP_SERVER
    read -p "👤 FTP Username: " FTP_USERNAME
    read -sp "🔒 FTP Password: " FTP_PASSWORD
    echo ""
    read -p "📁 Remote Directory (ej: /public_html/): " FTP_REMOTE_DIR

    # Crear archivo de configuración
    cat > "$CONFIG_FILE" << EOF
FTP_SERVER=$FTP_SERVER
FTP_USERNAME=$FTP_USERNAME
FTP_PASSWORD=$FTP_PASSWORD
FTP_REMOTE_DIR=$FTP_REMOTE_DIR
EOF

    echo -e "${GREEN}✅ Archivo de configuración creado${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANTE: $CONFIG_FILE está en .gitignore para tu seguridad${NC}"
    echo ""
fi

# Cargar configuración
source "$CONFIG_FILE"

# Verificar que las variables estén configuradas
if [ -z "$FTP_SERVER" ] || [ -z "$FTP_USERNAME" ] || [ -z "$FTP_PASSWORD" ]; then
    echo -e "${RED}❌ Error: Configuración FTP incompleta${NC}"
    echo -e "${YELLOW}💡 Elimina $CONFIG_FILE y vuelve a ejecutar el script${NC}"
    exit 1
fi

# Verificar si lftp está instalado
if ! command -v lftp &> /dev/null; then
    echo -e "${YELLOW}⚠️  lftp no está instalado${NC}"
    echo -e "${BLUE}📦 Instalando lftp...${NC}"

    # Detectar sistema operativo
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y lftp
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install lftp
    else
        echo -e "${RED}❌ Por favor instala lftp manualmente${NC}"
        exit 1
    fi
fi

# Mostrar información de deployment
echo -e "${BLUE}📊 Información de Deployment:${NC}"
echo -e "   🌐 Server: ${GREEN}$FTP_SERVER${NC}"
echo -e "   👤 User: ${GREEN}$FTP_USERNAME${NC}"
echo -e "   📁 Remote Dir: ${GREEN}$FTP_REMOTE_DIR${NC}"
echo ""

# Confirmar deployment
read -p "$(echo -e ${YELLOW}¿Continuar con el deployment? [y/N]: ${NC})" -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Deployment cancelado${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🚀 Iniciando deployment...${NC}"
echo ""

# Crear lista de archivos a subir
echo -e "${BLUE}📦 Preparando archivos...${NC}"

# Deployment usando lftp
lftp -u "$FTP_USERNAME","$FTP_PASSWORD" "$FTP_SERVER" << EOF
set ssl:verify-certificate no
set ftp:ssl-allow no

# Navegar al directorio remoto
cd $FTP_REMOTE_DIR

# Subir archivos HTML
mirror --reverse --delete --verbose \
       --exclude .git/ \
       --exclude .github/ \
       --exclude node_modules/ \
       --exclude .vscode/ \
       --exclude .DS_Store \
       --exclude '*.md' \
       --exclude .gitignore \
       --exclude .ftpignore \
       --exclude deploy-manual.sh \
       --exclude .env.ftp \
       . .

bye
EOF

# Verificar resultado
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║   ✅ Deployment Exitoso! 🎉          ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}🌐 Tu sitio debería estar disponible en:${NC}"
    echo -e "   ${GREEN}https://iasalta.socialsflow.io${NC}"
    echo ""
    echo -e "${YELLOW}💡 Limpia el caché del navegador si no ves los cambios${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}╔═══════════════════════════════════════╗${NC}"
    echo -e "${RED}║   ❌ Deployment Falló                ║${NC}"
    echo -e "${RED}╚═══════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}💡 Verifica tus credenciales FTP y vuelve a intentar${NC}"
    exit 1
fi
