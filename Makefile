.PHONY: up down build restart logs clean help install

# Variables
DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml

# Comando por defecto
all: up

# Instalar dependencias
install:
	@echo "📦 Instalando dependencias..."
	$(DOCKER_COMPOSE) exec web npm install || docker exec pokecreator-web npm install
	@echo "✅ Dependencias instaladas"

# Levantar el proyecto
up:
	@echo "🚀 Levantando el proyecto..."
	$(DOCKER_COMPOSE) up --build -d

# Levantar el proyecto con logs en primer plano
dev:
	@echo "🚀 Levantando el proyecto en modo desarrollo..."
	$(DOCKER_COMPOSE) up --build

# Bajar el proyecto
down:
	@echo "🛑 Bajando el proyecto..."
	$(DOCKER_COMPOSE) down

# Reconstruir el proyecto
build:
	@echo "🔨 Reconstruyendo el proyecto..."
	$(DOCKER_COMPOSE) build --no-cache

# Reiniciar el proyecto
restart: down up
	@echo "🔄 Proyecto reiniciado"

# Ver logs-
logs:
	@echo "📋 Mostrando logs..."
	$(DOCKER_COMPOSE) logs -f

# Limpiar contenedores, volúmenes e imágenes
clean:
	@echo "🧹 Limpiando contenedores, volúmenes e imágenes..."
	$(DOCKER_COMPOSE) down -v --rmi all

# Mostrar estado de los contenedores
status:
	@echo "📊 Estado de los contenedores:"
	$(DOCKER_COMPOSE) ps

# Ayuda
help:
	@echo "📖 Comandos disponibles:"
	@echo "  make install  - Instalar dependencias en el contenedor"
	@echo "  make up       - Levantar el proyecto en segundo plano"
	@echo "  make dev      - Levantar el proyecto con logs visibles"
	@echo "  make down     - Bajar el proyecto"
	@echo "  make build    - Reconstruir el proyecto desde cero"
	@echo "  make restart  - Reiniciar el proyecto"
	@echo "  make logs     - Ver logs del proyecto"
	@echo "  make status   - Ver estado de los contenedores"
	@echo "  make clean    - Limpiar contenedores, volúmenes e imágenes"
	@echo "  make help     - Mostrar esta ayuda"
