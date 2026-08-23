**Español** | [English](README.md)

# PokéCreator

Aplicación web para crear Pokémon personalizados con IA. Combina un animal, habilidades y personalización, genera una imagen con Pollinations.ai y compártela.

## 🚀 Cómo lanzar el proyecto

El proyecto incluye un Makefile que envuelve Docker Compose. Desde la raíz del proyecto:

```bash
make restart
```

Una vez iniciado el contenedor, abre tu navegador y navega a: http://localhost:3000

> Nota: Google OAuth2 requiere un `VITE_GOOGLE_CLIENT_ID`. Copia `.env.example` a `.env` y configura las URIs autorizadas en Google Cloud Console (ver [docs/OAUTH_COMPLETE.md](docs/OAUTH_COMPLETE.md)).

## 🧪 Lint

Type-checking y linting (ejecutar localmente con Node.js 20+):

```bash
npm install
npm run lint
```

## 🧪 Tests

La lógica de autenticación (`src/services/authService.ts`) y las utilidades de seguridad (`src/utils/security.ts`) están cubiertas por tests con Vitest (entorno jsdom):

```bash
npm install
npm test
```

## 🏗️ Arquitectura

- `src/main.tsx` — entry point: React Router, GoogleOAuthProvider y AuthProvider.
- `src/context/AuthContext.tsx` — estado global de auth respaldado por validación JWT en `src/services/authService.ts`.
- `src/components/ProtectedRoute.tsx` — protege `/create` y `/gallery` tras autenticación.
- `src/components/creator/` — asistente de 4 pasos (animal → habilidades → personalización → resultado IA).
- `src/pages/` — Home, Login (Google OAuth2), Creator (protegida), Gallery (protegida, respaldada en localStorage).
- `src/types/index.ts` — tipos compartidos y paleta de gradientes por tipo de Pokémon.
- `src/utils/security.ts` — validación de input, rate limiter y directivas CSP.
- `config/` — configs de Vite, TypeScript, Tailwind y PostCSS.
- `docker/` — Dockerfile (dev), docker-compose.yml, nginx.conf (producción) y README.

## 🎮 Cómo usar

Inicia sesión con Google, recorre el creador de cuatro pasos: elige un animal, selecciona hasta tres habilidades, personaliza nombre/tipo/color/descripción y genera la imagen. Guarda tu Pokémon en la galería (localStorage) o compártelo en WhatsApp, Facebook o Twitter.
