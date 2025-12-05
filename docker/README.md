# Docker Setup

Esta carpeta contiene todos los archivos relacionados con Docker para desplegar la aplicación.

## Archivos

- **Dockerfile**: Configuración de la imagen Docker
- **docker-compose.yml**: Orquestación de servicios
- **nginx.conf**: Configuración del servidor web Nginx para producción
- **.dockerignore**: Archivos a excluir del contexto de Docker

## Uso

### Desde la carpeta raíz del proyecto:

```bash
# Construir y ejecutar con docker-compose
docker-compose -f docker/docker-compose.yml up --build

# Detener los contenedores
docker-compose -f docker/docker-compose.yml down
```

### O desde esta carpeta:

```bash
cd docker

# Construir y ejecutar
docker-compose up --build

# Detener
docker-compose down
```

## Notas

- El servidor estará disponible en `http://localhost:3000`
- Los archivos de código se sincronizan automáticamente (hot reload)
- Para producción, considera usar un build multi-stage optimizado
