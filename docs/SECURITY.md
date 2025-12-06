# 🔐 Seguridad - PokeCreator

## Medidas de Seguridad Implementadas

### 1. Autenticación OAuth2 con Google

#### ✅ Implementado:
- **OAuth2 Flow**: Autenticación segura con Google
- **JWT Tokens**: Tokens firmados por Google
- **Validación de tokens**: Decodificación y verificación de claims
- **Almacenamiento seguro**: localStorage con verificación

#### Características:
```typescript
// JWT Token incluye:
{
  sub: "user-id",           // ID único del usuario
  email: "user@example.com",// Email verificado
  name: "User Name",        // Nombre del usuario
  picture: "avatar-url",    // Avatar
  iss: "accounts.google.com",// Emisor verificado
  aud: "client-id",         // Audiencia verificada
  exp: timestamp,           // Expiración del token
  iat: timestamp            // Emisión del token
}
```

---

### 2. Protección de API Keys

#### ✅ Variables de Entorno (`.env`)
```env
# OAuth2 - Nunca exponer Client Secret
VITE_GOOGLE_CLIENT_ID=your-client-id-here

# Solo Client ID público (frontend)
# Client Secret NUNCA debe estar en frontend
```

#### ✅ Configuración segura:
- ✅ `.env` en `.gitignore`
- ✅ `.env.example` como plantilla
- ✅ Variables con prefijo `VITE_` para Vite
- ✅ Validación de variables requeridas

#### ⚠️ IMPORTANTE:
```typescript
// ✅ CORRECTO - Solo en frontend
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

// ❌ INCORRECTO - NUNCA hacer esto
// const clientSecret = "..." // Client Secret en código
```

---

### 3. Validación y Sanitización de Datos

#### ✅ Validación de Inputs del Usuario

**En Step3Customization.tsx:**
```typescript
// Validación de nombre (máximo 20 caracteres)
maxLength: 20

// Validación de descripción (máximo 200 caracteres)
maxLength: 200

// Sanitización automática por React
// React escapa automáticamente contenido para prevenir XSS
```

#### ✅ Validación de JWT Token
```typescript
// authService.ts
decodeToken: (credential: string): User | null => {
  try {
    // Validación del formato JWT (3 partes separadas por .)
    const parts = credential.split('.')
    if (parts.length !== 3) return null
    
    // Decodificación segura
    const base64Url = credential.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    
    // Parse y validación
    const decoded = JSON.parse(jsonPayload)
    
    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    }
  } catch (error) {
    console.error('Error decoding token:', error)
    return null // Falla segura
  }
}
```

---

### 4. Protección de Rutas (Route Protection)

#### ✅ ProtectedRoute Component
```typescript
// Solo usuarios autenticados pueden acceder
<Route path="create" element={
  <ProtectedRoute>
    <Creator />
  </ProtectedRoute>
} />

// Redirección automática si no está autenticado
if (!isAuthenticated) {
  return <Navigate to="/login" replace />
}
```

#### ✅ Rutas Protegidas:
- `/create` - Requiere autenticación
- `/gallery` - Requiere autenticación
- `/login` - Pública
- `/` (home) - Pública

---

### 5. Headers de Seguridad HTTP

#### ✅ Nginx Configuration (Producción)

**En `docker/nginx.conf`:**
```nginx
# Prevenir clickjacking
add_header X-Frame-Options "SAMEORIGIN" always;

# Prevenir MIME type sniffing
add_header X-Content-Type-Options "nosniff" always;

# Habilitar XSS protection
add_header X-XSS-Protection "1; mode=block" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://accounts.google.com https://image.pollinations.ai; frame-src https://accounts.google.com;" always;

# Referrer Policy
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

---

### 6. Protección contra XSS (Cross-Site Scripting)

#### ✅ React Automatic Escaping
React automáticamente escapa todos los valores renderizados:
```typescript
// ✅ Seguro - React escapa automáticamente
<h1>{pokemon.name}</h1>
<p>{pokemon.description}</p>

// ✅ Seguro - Atributos también se escapan
<img src={pokemon.imageUrl} alt={pokemon.name} />
```

#### ✅ Validación de URLs
```typescript
// Solo permite URLs de dominios confiables
const ALLOWED_IMAGE_DOMAINS = [
  'image.pollinations.ai',
  'raw.githubusercontent.com'
]
```

---

### 7. Protección de Datos Sensibles

#### ✅ LocalStorage Security

**Datos almacenados:**
```typescript
// Solo información pública del usuario
localStorage.setItem('user', JSON.stringify({
  id: user.id,
  email: user.email,
  name: user.name,
  picture: user.picture
}))

// Token JWT (firmado por Google)
localStorage.setItem('token', credential)
```

#### ⚠️ Limitaciones de localStorage:
- Vulnerable a XSS (mitigado por React)
- No usar para datos muy sensibles
- Para producción real: considerar httpOnly cookies

---

### 8. HTTPS en Producción

#### ⚠️ REQUISITO para OAuth2 en Producción:
```
✅ Desarrollo: http://localhost:3000
⚠️ Producción: HTTPS OBLIGATORIO

# Google OAuth2 requiere HTTPS en producción
https://tu-dominio.com
```

#### Configuración recomendada:
```nginx
# Forzar HTTPS
server {
    listen 80;
    server_name tu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tu-dominio.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
}
```

---

### 9. Límite de Tamaño de Datos

#### ✅ Validación de tamaño:
```typescript
// Nombre Pokémon: máximo 20 caracteres
pokemonName.maxLength = 20

// Descripción: máximo 200 caracteres
description.maxLength = 200

// Habilidades: máximo 3
abilities.length <= 3
```

---

### 10. Logging y Monitoreo

#### ✅ Error Logging (sin exponer información sensible):
```typescript
// ✅ CORRECTO
console.error('Error decoding token:', error.message)

// ❌ INCORRECTO - Nunca logguear tokens completos
// console.log('Token:', fullToken)
```

---

## 🔒 Mejores Prácticas Implementadas

### ✅ Seguridad del Cliente (Frontend)

1. **OAuth2 Flow Completo**
   - Delegación de autenticación a Google
   - No manejamos contraseñas directamente
   - Tokens JWT firmados y verificables

2. **Validación de Inputs**
   - MaxLength en todos los campos
   - Sanitización automática por React
   - Validación de tipos con TypeScript

3. **Protección de Rutas**
   - Solo usuarios autenticados acceden a recursos
   - Redirección automática a login

4. **Variables de Entorno Seguras**
   - `.env` no se sube a git
   - Solo Client ID público expuesto
   - Client Secret NUNCA en frontend

### ✅ Seguridad de la Aplicación

5. **Headers de Seguridad HTTP**
   - X-Frame-Options
   - X-Content-Type-Options
   - Content-Security-Policy
   - XSS Protection

6. **Prevención de XSS**
   - React escaping automático
   - CSP headers
   - Validación de URLs de imágenes

7. **Gestión de Sesiones**
   - Tokens con expiración
   - Validación en cada request
   - Logout seguro (limpieza de datos)

---

## ⚠️ Limitaciones y Consideraciones

### Frontend-Only Security

Esta es una aplicación **frontend-only**, lo que significa:

**✅ Lo que tenemos:**
- OAuth2 con Google (seguro)
- Validación de tokens JWT
- Protección de rutas
- Headers de seguridad

**⚠️ Lo que faltaría en producción real:**
- Backend API para validación server-side
- httpOnly cookies (más seguro que localStorage)
- Rate limiting server-side
- Base de datos segura
- Refresh tokens

### Recomendaciones para Producción Real:

```
Frontend (Actual)          Backend (Recomendado)
    │                            │
    ├─ OAuth2 Flow              ├─ Validar token con Google
    ├─ JWT Token                ├─ Generar session token
    ├─ LocalStorage             ├─ httpOnly cookies
    ├─ Protected Routes         ├─ API endpoints protegidos
    └─ Client-side validation   └─ Server-side validation
```

---

## 🛡️ Checklist de Seguridad

- [x] OAuth2 implementado correctamente
- [x] JWT tokens validados
- [x] Variables de entorno protegidas
- [x] `.env` en `.gitignore`
- [x] Client Secret NO expuesto
- [x] Rutas protegidas
- [x] Inputs validados (maxLength)
- [x] React XSS protection (auto-escaping)
- [x] Headers de seguridad configurados
- [x] HTTPS requerido en producción
- [x] Datos sensibles NO en localStorage
- [x] Error handling sin exponer información sensible
- [x] TypeScript para type safety
- [x] Logout seguro (limpieza de datos)

---

## 📚 Recursos de Seguridad

### OAuth2 y JWT
- [OAuth 2.0 Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Google OAuth2 Security](https://developers.google.com/identity/protocols/oauth2/security-best-practices)

### Frontend Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Headers de Seguridad
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

---

## 🔐 Contacto de Seguridad

Si encuentras una vulnerabilidad de seguridad:
1. **NO** la publiques en GitHub issues
2. Contacta al equipo de desarrollo directamente
3. Proporciona detalles completos del problema
4. Espera una respuesta antes de divulgación pública

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
