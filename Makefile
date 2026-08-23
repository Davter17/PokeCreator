.PHONY: up down build restart logs clean help install prod prod-down prod-logs ensure-env

# Variables
DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml
DOCKER_COMPOSE_PROD = docker-compose -f docker/docker-compose.prod.yml

# Comando por defecto
all: up

# Asegurar que .env existe
ensure-env:
	@if [ ! -f .env ]; then \
		echo "📝 Creando .env desde .env.example..."; \
		cp .env.example .env; \
		echo "⚠️  Edita .env con tu VITE_GOOGLE_CLIENT_ID"; \
	fi

# Instalar dependencias
install:
	@echo "📦 Instalando dependencias..."
	$(DOCKER_COMPOSE) exec web npm install || docker exec pokecreator-web npm install
	@echo "✅ Dependencias instaladas"

# Levantar el proyecto
up: ensure-env
	@echo "🚀 Levantando el proyecto..."
	$(DOCKER_COMPOSE) up --build -d
	@echo "✅ Listo en http://localhost:3000"

# Levantar el proyecto con logs en primer plano
dev: ensure-env
	@echo "🚀 Levantando el proyecto en modo desarrollo..."
	@echo "   Abre http://localhost:3000 en tu navegador"
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
	@echo "🔄 Proyecto reiniciado en http://localhost:3000"

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
	@echo "  make up       - Levantar el proyecto en segundo plano (dev)"
	@echo "  make dev      - Levantar el proyecto con logs visibles (dev)"
	@echo "  make down     - Bajar el proyecto (dev)"
	@echo "  make build    - Reconstruir el proyecto desde cero (dev)"
	@echo "  make restart  - Reiniciar el proyecto (dev)"
	@echo "  make logs     - Ver logs del proyecto (dev)"
	@echo "  make status   - Ver estado de los contenedores (dev)"
	@echo "  make clean    - Limpiar contenedores, volúmenes e imágenes (dev)"
	@echo ""
	@echo "  Producción:"
	@echo "  make prod       - Build y levantar producción (nginx en :8080)"
	@echo "  make prod-down  - Bajar el contenedor de producción"
	@echo "  make prod-logs  - Ver logs de producción"
	@echo "  make help       - Mostrar esta ayuda"

# Producción (build multi-stage con nginx)
prod: ensure-env
	@echo "🚀 Construyendo y levantando producción..."
	$(DOCKER_COMPOSE_PROD) up --build -d
	@echo "✅ Producción lista en http://localhost:8080"

prod-down:
	@echo "🛑 Bajando producción..."
	$(DOCKER_COMPOSE_PROD) down

prod-logs:
	@echo "📋 Mostrando logs de producción..."
	$(DOCKER_COMPOSE_PROD) logs -f
