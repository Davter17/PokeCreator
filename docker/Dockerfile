# ---- Dev stage ----
FROM node:20-alpine AS dev

WORKDIR /app

COPY package.json package-lock.json* ./
COPY config/ ./config/
COPY postcss.config.js tailwind.config.js ./

RUN npm install --legacy-peer-deps || npm install --force

COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY .env* ./

RUN chmod -R 755 /app/node_modules/.bin

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]

# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY config/ ./config/
COPY postcss.config.js tailwind.config.js ./

RUN npm install --legacy-peer-deps || npm install --force

COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY .env* ./

RUN npm run build -- --config config/vite.config.ts

# ---- Production stage ----
FROM nginx:1.27-alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
