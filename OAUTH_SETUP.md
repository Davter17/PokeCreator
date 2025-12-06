# Configuración OAuth2 - Google

## Descripción
Esta guía explica cómo configurar OAuth2 con Google para PokeCreator.

## Requisitos Previos
- Cuenta de Google
- Proyecto creado en Google Cloud Console

## Pasos de Configuración

### 1. Configurar Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google OAuth2:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google+ API" y habilítala

### 2. Crear Credenciales OAuth2

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "OAuth client ID"
3. Selecciona "Web application"
4. Configura:
   - **Name**: PokeCreator
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `http://localhost:5173` (para desarrollo con Vite)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:5173/auth/callback`

### 3. Obtener Client ID

Después de crear las credenciales, obtendrás:
- **Client ID**: Este es el que necesitas para tu aplicación
- **Client Secret**: No lo necesitas para aplicaciones frontend

### 4. Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y agrega tu Client ID:
   ```env
   VITE_GOOGLE_CLIENT_ID=tu-client-id-aqui.apps.googleusercontent.com
   VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
   ```

### 5. Reiniciar el Proyecto

Si estás usando Docker:
```bash
make restart
```

Si estás usando npm:
```bash
npm run dev
```

## Verificación

1. Ve a `http://localhost:3000/login`
2. Deberías ver el botón "Sign in with Google"
3. Al hacer clic, se abrirá la ventana de autenticación de Google
4. Después de autenticarte, serás redirigido a la aplicación

## Solución de Problemas

### Error: "redirect_uri_mismatch"
- Verifica que las URIs de redirección en Google Cloud Console coincidan con las de tu aplicación
- Asegúrate de incluir tanto `http://localhost:3000` como `http://localhost:5173`

### El botón de Google no aparece
- Verifica que `VITE_GOOGLE_CLIENT_ID` esté correctamente configurado en `.env`
- Asegúrate de que las dependencias estén instaladas: `npm install`
- Revisa la consola del navegador para ver errores

### Error: "idpiframe_initialization_failed"
- Esto suele ocurrir cuando se usan cookies de terceros bloqueadas
- Asegúrate de que tu navegador permita cookies de terceros para `accounts.google.com`

## Seguridad

- **Nunca** subas el archivo `.env` al repositorio
- El archivo `.env` está en `.gitignore` para evitar commits accidentales
- Solo comparte tu Client ID con personas autorizadas
- Para producción, usa un dominio HTTPS

## Recursos Adicionales

- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Google Library](https://www.npmjs.com/package/@react-oauth/google)
