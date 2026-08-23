[ Español](README.es.md) | **English**

# PokéCreator

Web app to create custom Pokémon with AI. Combine an animal, abilities and personalization, then generate an image with Pollinations.ai and share it.

## 🚀 How to launch the project

The project ships with a Makefile that wraps Docker Compose. From the project root:

```bash
make restart
```

Once the container is running, open your browser and navigate to: http://localhost:3000

> Note: Google OAuth2 requires a `VITE_GOOGLE_CLIENT_ID`. Copy `.env.example` to `.env` and configure the authorized URIs in Google Cloud Console (see [docs/OAUTH_COMPLETE.md](docs/OAUTH_COMPLETE.md)).

## 🧪 Lint

Type-checking and linting (run locally with Node.js 20+):

```bash
npm install
npm run lint
```

## 🧪 Tests

The auth logic (`src/services/authService.ts`) and security utilities (`src/utils/security.ts`) are covered by Vitest tests (jsdom environment):

```bash
npm install
npm test
```

## 🏗️ Architecture

- `src/main.tsx` — app entry: React Router, GoogleOAuthProvider and AuthProvider.
- `src/context/AuthContext.tsx` — global auth state backed by JWT validation in `src/services/authService.ts`.
- `src/components/ProtectedRoute.tsx` — guards `/create` and `/gallery` behind authentication.
- `src/components/creator/` — four-step wizard (animal → abilities → customization → AI result).
- `src/pages/` — Home, Login (Google OAuth2), Creator (protected), Gallery (protected, localStorage-backed).
- `src/types/index.ts` — shared types and Pokémon type-gradient palette.
- `src/utils/security.ts` — input validation, rate limiter and CSP directives.
- `config/` — Vite, TypeScript, Tailwind and PostCSS configs.
- `docker/` — Dockerfile (dev), docker-compose.yml, nginx.conf (production) and README.

## 🎮 How to use

Sign in with Google, then walk through the four-step creator: pick an animal, choose up to three abilities, personalize name/type/color/description and generate the image. Save your Pokémon to the gallery (localStorage) or share it on WhatsApp, Facebook or Twitter.
