#!/bin/bash

echo "🚀 FIX URGENTE - IA Salta en Hostinger"
echo "======================================"
echo ""

# Credenciales
FTP_HOST="147.93.37.161"
FTP_USER="u363074645.iasalta.socialsflow.io"
FTP_PASS="Example69*"

echo "📋 Este script va a:"
echo "   1. Ver qué archivos hay en el servidor"
echo "   2. Subirlos a /public_html/ (ubicación correcta)"
echo ""

# Verificar si lftp está instalado
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp no está instalado"
    echo "💡 Instalalo con:"
    echo "   Ubuntu/Debian: sudo apt-get install lftp"
    echo "   Mac: brew install lftp"
    exit 1
fi

echo "📂 Viendo archivos en el servidor..."
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" << 'FTPCOMMANDS'
set ssl:verify-certificate no
set ftp:ssl-allow no

# Ver qué hay en public_html
cd public_html
pwd
ls -la

bye
FTPCOMMANDS

echo ""
echo "✅ ¿Viste la lista de archivos arriba?"
echo ""
read -p "¿Subir archivos locales a /public_html/? [y/N]: " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelado"
    exit 0
fi

echo ""
echo "🚀 Subiendo archivos..."

lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" << 'FTPCOMMANDS'
set ssl:verify-certificate no
set ftp:ssl-allow no

cd public_html

# Subir todos los archivos HTML
mput *.html

# Subir CSS
mput *.css

# Subir carpeta assets
mirror -R assets assets

bye
FTPCOMMANDS

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡LISTO! Verifica: https://iasalta.socialsflow.io"
    echo ""
else
    echo ""
    echo "❌ Error al subir archivos"
    echo "💡 Verifica las credenciales FTP"
fi
