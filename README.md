# PokéCreator - Proyecto Globant

Aplicación web para crear Pokémon personalizados con IA, usando React, TypeScript, Vite y TailwindCSS.

## 🚀 Características

- ✅ **Autenticación OAuth2 con Google** - Inicio de sesión seguro
- ✅ **Rutas protegidas** - Acceso controlado a creación y galería
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

## 🔐 OAuth2 - Inicio Rápido

### 1. Tu Client ID ya está configurado ✅
```
1096972045606-9qcls5g2qc0ib09fiauenhfmh4ljb2br.apps.googleusercontent.com
```

### 2. Configurar Google Cloud Console 🔧

**Ve a:** [Google Cloud Console](https://console.cloud.google.com/) > APIs & Services > Credentials

**Agrega estas URIs autorizadas:**

**Authorized JavaScript origins:**
```
http://localhost:3000
http://localhost:5173
```

**Authorized redirect URIs:**
```
http://localhost:3000
http://localhost:5173
http://localhost:3000/auth/callback
http://localhost:5173/auth/callback
```

### 3. Levantar el proyecto 🚀
```bash
make restart
```

### 4. ¡Listo! 🎉
Abre http://localhost:3000 y haz clic en "Iniciar Sesión"

**📚 Documentación OAuth2:**
- [`OAUTH_COMPLETE.md`](OAUTH_COMPLETE.md) - Guía rápida de configuración
- [`OAUTH_IMPLEMENTATION.md`](OAUTH_IMPLEMENTATION.md) - Implementación completa
- [`OAUTH_SETUP.md`](OAUTH_SETUP.md) - Configuración detallada
- [`OAUTH_ERROR_FIX.md`](OAUTH_ERROR_FIX.md) - Solución de errores

## 📁 Estructura del Proyecto

```
ex01/
├── docker/                 # Archivos Docker
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── README.md
├── src/
│   ├── components/         # Componentes React
│   │   ├── creator/       # Pasos del creador
│   │   ├── Header.tsx     # Header con auth
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── Modal.tsx
│   │   ├── ShareModal.tsx
│   │   └── ProtectedRoute.tsx  # Protección de rutas
│   ├── context/           # Context API
│   │   └── AuthContext.tsx     # Contexto de autenticación
│   ├── services/          # Servicios
│   │   └── authService.ts      # Servicio OAuth2
│   ├── pages/             # Páginas principales
│   │   ├── Home.tsx
│   │   ├── Login.tsx      # Página de login OAuth2
│   │   ├── Creator.tsx    # Protegida
│   │   └── Gallery.tsx    # Protegida
│   ├── types/             # TypeScript types
│   │   ├── index.ts
│   │   └── auth.ts        # Tipos de autenticación
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                   # Variables de entorno (no commit)
├── .env.example           # Ejemplo de variables
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── Makefile               # Comandos Docker simplificados
└── OAUTH_*.md             # Documentación OAuth2
```

## 🛠️ Tecnologías

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **React Router** - SPA routing
- **@react-oauth/google** - Google OAuth2 authentication
- **Pollinations.ai** - Image generation API
- **Docker** - Containerization

## 🚀 Desarrollo con Docker (Recomendado)

### Requisitos
- Docker
- Docker Compose

### Comandos Make disponibles

```bash
make up       # Levantar el proyecto
make dev      # Levantar con logs visibles
make down     # Bajar el proyecto
make restart  # Reiniciar el proyecto
make install  # Instalar dependencias
make logs     # Ver logs
make status   # Ver estado
make clean    # Limpiar todo
make help     # Ver ayuda
```

### Inicio rápido

```bash
# 1. Configura URIs en Google Cloud Console (ver arriba)

# 2. Levantar el proyecto
make restart

# 3. Instalar dependencias
make install

# 4. Abrir en navegador
# http://localhost:3000
```

## 💻 Desarrollo Local (sin Docker)

### Requisitos
- Node.js 20.x o superior
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu VITE_GOOGLE_CLIENT_ID

# Iniciar servidor de desarrollo
npm run dev

# La app estará en http://localhost:5173
```

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter
```

## 📝 Licencia

Proyecto educativo - Globant 2025
