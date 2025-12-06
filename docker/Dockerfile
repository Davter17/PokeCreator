# Dockerfile para desarrollo con Vite
FROM node:20-alpine

WORKDIR /app

# Copiar package.json
COPY package.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps || npm install --force

# Copiar el resto del código
COPY . .

# Arreglar permisos
RUN chmod -R 755 /app/node_modules/.bin

# Exponer puerto de Vite
EXPOSE 3000

# Comando para iniciar servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
