# PokéCreator - Proyecto Globant

Aplicación web para crear Pokémon personalizados con IA, usando React, TypeScript, Vite y TailwindCSS.

## 🚀 Características

- ✅ **Generación de imágenes con IA** usando Pollinations.ai
- ✅ **Creador de Pokémon en 4 pasos**:
  1. Selección de animal base
  2. Elección de habilidades (máx. 3)
  3. Personalización (nombre, tipo, color, descripción)
  4. Vista previa y descarga
- ✅ **Galería de Pokémon guardados** con localStorage
- ✅ **Compartir en redes sociales** (WhatsApp, Facebook, Twitter)
- ✅ **Mobile-first responsive design**
- ✅ **Accesibilidad WCAG 2.1 AA**

## 📁 Estructura del Proyecto

```
ex02/
├── docker/                 # Archivos Docker
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── README.md
├── src/
│   ├── components/         # Componentes React
│   │   ├── creator/       # Pasos del creador
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── Modal.tsx
│   │   └── ShareModal.tsx
│   ├── pages/             # Páginas principales
│   │   ├── Home.tsx
│   │   ├── Creator.tsx
│   │   └── Gallery.tsx
│   ├── types/             # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                # Assets estáticos
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🛠️ Tecnologías

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **React Router** - SPA routing
- **Pollinations.ai** - Image generation API

## 🚀 Desarrollo Local

### Requisitos
- Node.js 20.x o superior
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Iniciar servidor de desarrollo
npm run dev

# La app estará en http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## 🐳 Docker

Los archivos Docker están organizados en la carpeta `docker/`. Ver [docker/README.md](docker/README.md) para más detalles.

```bash
# Desde la raíz del proyecto
docker-compose -f docker/docker-compose.yml up --build

# O desde la carpeta docker/
cd docker
docker-compose up --build
```

## 📝 Licencia

Proyecto educativo - Globant 2025
