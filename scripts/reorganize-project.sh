#!/bin/bash

echo "🔄 Reorganizando estructura del proyecto..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Crear directorios si no existen
echo -e "${BLUE}📁 Creando directorios...${NC}"
mkdir -p config
mkdir -p docs
mkdir -p scripts
mkdir -p public

# Mover archivos de configuración
echo -e "${BLUE}🔧 Moviendo archivos de configuración a config/...${NC}"
[ -f "tsconfig.json" ] && mv tsconfig.json config/ && echo "  ✓ tsconfig.json"
[ -f "tsconfig.node.json" ] && mv tsconfig.node.json config/ && echo "  ✓ tsconfig.node.json"
[ -f "vite.config.ts" ] && mv vite.config.ts config/ && echo "  ✓ vite.config.ts"
[ -f "tailwind.config.js" ] && mv tailwind.config.js config/ && echo "  ✓ tailwind.config.js"
[ -f "postcss.config.js" ] && mv postcss.config.js config/ && echo "  ✓ postcss.config.js"

# Mover documentación
echo -e "${BLUE}📚 Moviendo documentación a docs/...${NC}"
for file in *.md; do
    if [ "$file" != "README.md" ] && [ -f "$file" ]; then
        mv "$file" docs/ 2>/dev/null && echo "  ✓ $file"
    fi
done

# Mover scripts
echo -e "${BLUE}🔧 Moviendo scripts a scripts/...${NC}"
[ -f "setup.sh" ] && mv setup.sh scripts/ && echo "  ✓ setup.sh"

echo ""
echo -e "${GREEN}✅ Reorganización completada!${NC}"
echo ""
echo -e "${YELLOW}📂 Nueva estructura:${NC}"
echo ""
echo "ex01/"
echo "├── config/         # Configuraciones"
echo "├── docker/         # Docker files"
echo "├── docs/           # Documentación"
echo "├── scripts/        # Scripts de utilidad"
echo "├── src/            # Código fuente"
echo "├── public/         # Assets públicos"
echo "├── .env            # Variables de entorno"
echo "├── index.html      # HTML principal"
echo "├── package.json    # Dependencias"
echo "├── Makefile        # Comandos Docker"
echo "└── README.md       # Documentación principal"
echo ""
echo -e "${BLUE}🔄 Próximos pasos:${NC}"
echo "  1. Actualizar package.json con nuevas rutas (YA HECHO ✓)"
echo "  2. Actualizar vite.config.ts con path aliases (YA HECHO ✓)"
echo "  3. Actualizar tsconfig.json (YA HECHO ✓)"
echo "  4. Actualizar Dockerfile (YA HECHO ✓)"
echo "  5. Reiniciar Docker: make restart"
echo ""
