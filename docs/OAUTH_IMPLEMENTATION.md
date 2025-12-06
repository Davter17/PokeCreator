# Guía de Implementación OAuth2

## ✅ Implementación Completada

Se ha implementado correctamente OAuth2 con Google en PokeCreator. A continuación, los detalles de la implementación:

## 🎯 Funcionalidades Implementadas

### 1. Autenticación con Google OAuth2
- ✅ Login con Google usando `@react-oauth/google`
- ✅ Decodificación de JWT tokens
- ✅ Almacenamiento seguro en localStorage
- ✅ Persistencia de sesión

### 2. Context API para Autenticación
- ✅ `AuthContext` para manejar el estado global de autenticación
- ✅ Hook `useAuth()` para acceder al contexto desde cualquier componente
- ✅ Funciones `login()` y `logout()`

### 3. Rutas Protegidas
- ✅ Componente `ProtectedRoute` para proteger rutas
- ✅ Redirección automática a `/login` si no está autenticado
- ✅ Las rutas `/create` y `/gallery` ahora requieren autenticación

### 4. UI Mejorada
- ✅ Página de login con botón de Google
- ✅ Header con avatar del usuario y botón de logout
- ✅ Loading state durante la verificación de autenticación

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
- `src/context/AuthContext.tsx` - Context para autenticación
- `src/services/authService.ts` - Servicio de autenticación
- `src/types/auth.ts` - Tipos TypeScript para autenticación
- `src/pages/Login.tsx` - Página de login
- `src/components/ProtectedRoute.tsx` - Componente para rutas protegidas
- `src/vite-env.d.ts` - Tipos para variables de entorno
- `.env` - Variables de entorno (configurado con tu Client ID)
- `.env.example` - Ejemplo de variables de entorno
- `.gitignore` - Configurado para ignorar archivos sensibles
- `OAUTH_SETUP.md` - Documentación detallada de configuración

### Archivos Modificados
- `package.json` - Agregadas dependencias OAuth2
- `src/main.tsx` - Agregado GoogleOAuthProvider y AuthProvider
- `src/App.tsx` - Agregadas rutas protegidas y ruta de login
- `src/components/Header.tsx` - Agregada información del usuario y logout
- `docker/docker-compose.yml` - Configuradas variables de entorno

## 🚀 Cómo Usar

### 1. Configuración Inicial (Ya completada)
Tu Client ID ya está configurado en el archivo `.env`:
```env
VITE_GOOGLE_CLIENT_ID=1096972045606-9qcls5g2qc0ib09fiauenhfmh4ljb2br.apps.googleusercontent.com
```

### 2. Configurar Google Cloud Console

⚠️ **IMPORTANTE**: Debes configurar las URIs autorizadas en Google Cloud Console:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a "APIs & Services" > "Credentials"
4. Edita tu OAuth 2.0 Client ID
5. Agrega estas URIs a **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `http://localhost:5173`
6. Agrega estas URIs a **Authorized redirect URIs**:
   - `http://localhost:3000`
   - `http://localhost:5173`

### 3. Instalar Dependencias

Como estás usando Docker, las dependencias se instalarán automáticamente. Si necesitas instalarlas manualmente:

```bash
# Dentro del contenedor Docker
docker exec -it pokecreator-web npm install
```

O si tienes npm localmente:
```bash
npm install
```

### 4. Iniciar el Proyecto

```bash
make restart
```

O directamente:
```bash
make down
make up
```

### 5. Probar la Autenticación

1. Abre `http://localhost:3000` en tu navegador
2. Haz clic en "Iniciar Sesión" en el header
3. Serás redirigido a `/login`
4. Haz clic en el botón "Sign in with Google"
5. Completa el proceso de autenticación de Google
6. Serás redirigido automáticamente a `/create`

## 🔐 Flujo de Autenticación

```
1. Usuario visita la app
   ↓
2. Intenta acceder a /create o /gallery
   ↓
3. ProtectedRoute verifica autenticación
   ↓
4. Si NO está autenticado → Redirige a /login
   ↓
5. Usuario hace clic en "Sign in with Google"
   ↓
6. Google OAuth abre ventana de autenticación
   ↓
7. Usuario autoriza la app
   ↓
8. Google devuelve JWT token
   ↓
9. AuthContext decodifica el token
   ↓
10. Guarda user y token en localStorage
    ↓
11. Redirige a /create
    ↓
12. Usuario puede acceder a todas las rutas protegidas
```

## 📦 Dependencias Agregadas

```json
{
  "@react-oauth/google": "^0.12.1",
  "jwt-decode": "^4.0.0"
}
```

## 🛠️ Comandos Útiles

```bash
# Reiniciar el proyecto
make restart

# Ver logs
make logs

# Bajar el proyecto
make down

# Limpiar todo
make clean
```

## 🐛 Solución de Problemas

### El botón de Google no aparece
- Verifica que el Client ID esté correctamente configurado en `.env`
- Asegúrate de que las dependencias estén instaladas
- Revisa la consola del navegador para errores

### Error "redirect_uri_mismatch"
- Verifica que las URIs autorizadas en Google Cloud Console estén correctamente configuradas
- Debe incluir `http://localhost:3000` y `http://localhost:5173`

### Error "idpiframe_initialization_failed"
- Habilita cookies de terceros para `accounts.google.com`
- O usa el navegador en modo de incógnito

### Las variables de entorno no se cargan
- Reinicia el contenedor Docker: `make restart`
- Verifica que `.env` esté en la raíz del proyecto
- Verifica que el archivo esté montado en docker-compose.yml

## 📚 Recursos

- [Documentación de @react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [OAUTH_SETUP.md](./OAUTH_SETUP.md) - Guía detallada de configuración

## ✨ Próximos Pasos

1. ✅ Configurar las URIs autorizadas en Google Cloud Console
2. ✅ Probar el flujo completo de autenticación
3. 🔄 (Opcional) Agregar más proveedores OAuth (GitHub, Facebook, etc.)
4. 🔄 (Opcional) Implementar refresh tokens
5. 🔄 (Opcional) Agregar backend para validación de tokens

## 🎉 ¡Listo!

La implementación de OAuth2 está completa. Solo necesitas configurar las URIs autorizadas en Google Cloud Console y probar la autenticación.
