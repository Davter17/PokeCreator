# Dockerfile para desarrollo con Vite
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package.json package-lock.json* ./
COPY config/ ./config/
COPY postcss.config.js tailwind.config.js ./

# Instalar dependencias
RUN npm install --legacy-peer-deps || npm install --force

# Copiar el resto del código
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY .env* ./

# Arreglar permisos
RUN chmod -R 755 /app/node_modules/.bin

# Exponer puerto de Vite
EXPOSE 3000

# Comando para iniciar servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
