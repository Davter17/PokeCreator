#!/bin/bash

echo "🚀 Configurando PokeCreator con OAuth2..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si existe .env
if [ ! -f .env ]; then
    echo "${YELLOW}⚠️  Creando archivo .env desde .env.example${NC}"
    cp .env.example .env
    echo "${GREEN}✅ Archivo .env creado${NC}"
    echo "${YELLOW}⚠️  Por favor, edita .env y agrega tu VITE_GOOGLE_CLIENT_ID${NC}"
else
    echo "${GREEN}✅ Archivo .env ya existe${NC}"
fi

# Instalar dependencias dentro del contenedor
echo "${YELLOW}📦 Instalando dependencias...${NC}"
docker-compose -f docker/docker-compose.yml exec web npm install || \
docker exec pokecreator-web npm install

echo ""
echo "${GREEN}✅ Configuración completada!${NC}"
echo ""
echo "📝 Próximos pasos:"
echo "1. Edita el archivo .env con tu Google Client ID"
echo "2. Configura las URIs autorizadas en Google Cloud Console:"
echo "   - http://localhost:3000"
echo "   - http://localhost:5173"
echo "3. Ejecuta: make restart"
echo "4. Abre: http://localhost:3000"
echo ""
echo "📚 Lee OAUTH_IMPLEMENTATION.md para más detalles"
