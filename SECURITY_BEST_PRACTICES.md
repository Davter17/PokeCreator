# 🛡️ Guía de Mejores Prácticas de Seguridad

## Resumen de Seguridad Implementada

### ✅ Implementado en PokeCreator

1. **OAuth2 con Google**
   - Autenticación delegada a Google
   - No manejamos contraseñas
   - JWT tokens seguros

2. **Validación de JWT Tokens**
   - Formato JWT validado (3 partes)
   - Expiración verificada
   - Emisor validado (Google)
   - Campos requeridos verificados

3. **Protección de API Keys**
   - Variables de entorno (`.env`)
   - `.env` en `.gitignore`
   - Solo Client ID público expuesto

4. **Headers de Seguridad HTTP**
   - X-Frame-Options
   - X-Content-Type-Options
   - X-XSS-Protection
   - Content-Security-Policy
   - Referrer-Policy
   - Permissions-Policy

5. **Validación de Inputs**
   - MaxLength en todos los campos
   - Sanitización de HTML tags
   - Validación de patrones

6. **Protección de Rutas**
   - ProtectedRoute component
   - Redirección automática
   - Verificación de autenticación

7. **TypeScript**
   - Type safety
   - Prevención de errores en tiempo de compilación

---

## 🔐 Checklist de Seguridad para Desarrollo

### Variables de Entorno

```bash
# ✅ Hacer esto
cp .env.example .env
# Edita .env con valores reales
# .env está en .gitignore

# ❌ NUNCA hacer esto
git add .env
git commit -m "added env file"  # ¡NO!
```

### Manejo de Tokens

```typescript
// ✅ CORRECTO - Validar token antes de usar
const userData = authService.decodeToken(credential)
if (!userData) {
  console.error('Invalid token')
  return
}

// ❌ INCORRECTO - Usar token sin validar
const decoded = JSON.parse(atob(token.split('.')[1]))
// No se valida formato, expiración, ni emisor
```

### Almacenamiento de Datos

```typescript
// ✅ CORRECTO - Solo datos públicos
localStorage.setItem('user', JSON.stringify({
  id: user.id,
  email: user.email,
  name: user.name
}))

// ❌ INCORRECTO - Datos sensibles
localStorage.setItem('password', password) // ¡NO!
localStorage.setItem('creditCard', ccNum)  // ¡NO!
```

### Validación de Inputs

```typescript
// ✅ CORRECTO - Validar y sanitizar
const sanitizedName = sanitizeInput(pokemonName)
if (!validatePokemonName(sanitizedName)) {
  return 'Invalid name'
}

// ❌ INCORRECTO - Usar input directamente
const pokemon = { name: userInput } // Sin validación
```

### URLs de Imágenes

```typescript
// ✅ CORRECTO - Validar dominio
if (isValidImageUrl(imageUrl)) {
  setImage(imageUrl)
}

// ❌ INCORRECTO - Aceptar cualquier URL
setImage(userProvidedUrl) // Riesgo de XSS
```

---

## 🚨 Vulnerabilidades Comunes y Cómo Evitarlas

### 1. XSS (Cross-Site Scripting)

**Problema:**
```typescript
// ❌ VULNERABLE
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

**Solución:**
```typescript
// ✅ SEGURO - React escapa automáticamente
<div>{userInput}</div>

// ✅ SEGURO - Sanitizar si necesitas HTML
<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(userInput)}} />
```

### 2. Exposición de Secrets

**Problema:**
```typescript
// ❌ VULNERABLE
const CLIENT_SECRET = "sk_live_12345abcde"
```

**Solución:**
```typescript
// ✅ SEGURO - Variables de entorno
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

// ⚠️ NOTA: Client Secret NUNCA debe estar en frontend
```

### 3. Token Sin Validar

**Problema:**
```typescript
// ❌ VULNERABLE
const token = localStorage.getItem('token')
makeAuthenticatedRequest(token) // Token podría estar expirado
```

**Solución:**
```typescript
// ✅ SEGURO
const token = authService.getStoredToken() // Valida expiración
if (!token) {
  authService.clearAuth()
  navigate('/login')
  return
}
```

### 4. CORS Abierto

**Problema:**
```javascript
// ❌ VULNERABLE (en backend)
app.use(cors({
  origin: '*' // Acepta de cualquier origen
}))
```

**Solución:**
```javascript
// ✅ SEGURO
app.use(cors({
  origin: ['https://tu-dominio.com'],
  credentials: true
}))
```

### 5. Logs con Información Sensible

**Problema:**
```typescript
// ❌ VULNERABLE
console.log('User token:', fullToken)
console.log('Password:', password)
```

**Solución:**
```typescript
// ✅ SEGURO
console.error('Login failed:', error.message) // Solo mensaje
// Nunca loguear tokens, contraseñas, o datos sensibles completos
```

---

## 🔒 Configuración de Producción

### 1. HTTPS Obligatorio

```nginx
# Forzar HTTPS
server {
    listen 80;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
}
```

### 2. Variables de Entorno en Producción

```bash
# ✅ En servidor de producción
export VITE_GOOGLE_CLIENT_ID="production-client-id"
export NODE_ENV="production"

# Build
npm run build

# NO incluir .env en el build
```

### 3. CSP en Producción

```nginx
# Content Security Policy estricta
add_header Content-Security-Policy "
  default-src 'self';
  script-src 'self' https://accounts.google.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://accounts.google.com;
  frame-src https://accounts.google.com;
  object-src 'none';
" always;
```

---

## 📋 Checklist Pre-Deploy

### Antes de subir a producción:

- [ ] `.env` NO está en el repositorio
- [ ] `.env` está en `.gitignore`
- [ ] Client Secret NO está en el código
- [ ] HTTPS configurado
- [ ] Headers de seguridad configurados
- [ ] CSP configurado
- [ ] Logs NO contienen información sensible
- [ ] Tokens se validan antes de usar
- [ ] Inputs del usuario se validan
- [ ] Build en modo producción (`NODE_ENV=production`)
- [ ] Sourcemaps deshabilitados
- [ ] Console.logs removidos en producción
- [ ] Rate limiting implementado (si aplica)
- [ ] CORS configurado correctamente
- [ ] OAuth URIs actualizadas con dominio de producción

---

## 🔍 Testing de Seguridad

### Herramientas Recomendadas:

1. **Security Headers**
   - https://securityheaders.com/
   - Analiza headers HTTP

2. **Mozilla Observatory**
   - https://observatory.mozilla.org/
   - Escaneo de seguridad completo

3. **OWASP ZAP**
   - https://www.zaproxy.org/
   - Scanner de vulnerabilidades

4. **npm audit**
   ```bash
   npm audit
   npm audit fix
   ```

5. **Dependabot (GitHub)**
   - Alertas automáticas de vulnerabilidades
   - PRs automáticos para actualizaciones

---

## 🚀 Recomendaciones para Mejorar

### Para una aplicación de producción real:

1. **Backend API**
   - Validación server-side de tokens
   - httpOnly cookies en lugar de localStorage
   - Refresh tokens
   - Rate limiting server-side

2. **Base de Datos**
   - Encriptación de datos sensibles
   - Prepared statements (prevenir SQL injection)
   - Backups regulares

3. **Monitoreo**
   - Logs centralizados
   - Alertas de seguridad
   - Análisis de tráfico anómalo

4. **Autenticación**
   - 2FA (Two-Factor Authentication)
   - Session timeout
   - IP whitelisting (para admin)

5. **Compliance**
   - GDPR compliance
   - Privacy policy
   - Terms of service
   - Cookie consent

---

## 📚 Recursos Adicionales

### Documentación Oficial:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Google OAuth2 Security](https://developers.google.com/identity/protocols/oauth2/security-best-practices)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

### Guías:
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [CSP Guide](https://content-security-policy.com/)

### Tools:
- [Security Headers Checker](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

**Última actualización:** Diciembre 2025
**Mantenedor:** PokeCreator Team
