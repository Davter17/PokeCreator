# 🔴 ERROR SOLUCIONADO: Authorization Error - invalid_client

## Error que estás viendo:
```
Access blocked: Authorization Error
mario.pico.busquier@gmail.com
no registered origin
Error 401: invalid_client
```

## 🎯 SOLUCIÓN PASO A PASO

### Paso 1: Ir a Google Cloud Console

1. Abre: **https://console.cloud.google.com/**
2. Inicia sesión con tu cuenta de Google

### Paso 2: Encontrar tu Proyecto

Tu Client ID es:
```
1096972045606-9qcls5g2qc0ib09fiauenhfmh4ljb2br.apps.googleusercontent.com
```

El número del proyecto es: **1096972045606**

1. En la parte superior, selecciona tu proyecto (busca por el número 1096972045606)
2. O usa este enlace directo: https://console.cloud.google.com/apis/credentials

### Paso 3: Configurar las URIs Autorizadas

1. Ve a **"APIs & Services"** → **"Credentials"** (en el menú lateral)
2. Busca tu **OAuth 2.0 Client ID** que termina en `.apps.googleusercontent.com`
3. Haz clic en el **icono de lápiz (editar)** ✏️

### Paso 4: Agregar las URIs EXACTAS

#### A. En "Authorized JavaScript origins" (Orígenes autorizados):

Haz clic en **"+ ADD URI"** y agrega UNA POR UNA:

```
http://localhost:3000
```

Haz clic en **"+ ADD URI"** otra vez:

```
http://localhost:5173
```

#### B. En "Authorized redirect URIs" (URIs de redirección):

Haz clic en **"+ ADD URI"** y agrega:

```
http://localhost:3000
```

Haz clic en **"+ ADD URI"** otra vez:

```
http://localhost:5173
```

**IMPORTANTE:** NO agregues `/auth/callback` por ahora. Google OAuth2 con `@react-oauth/google` NO requiere URIs de callback específicas, solo los orígenes.

### Paso 5: GUARDAR

1. Haz clic en el botón **"SAVE"** al final de la página
2. **Espera 1-2 minutos** para que los cambios se propaguen

### Paso 6: Limpiar Caché y Probar

1. En tu navegador, presiona: **Ctrl + Shift + Delete**
2. Selecciona "Cookies and other site data"
3. Haz clic en "Clear data"
4. O simplemente abre una **ventana de incógnito**

### Paso 7: Probar de Nuevo

1. Abre: http://localhost:3000
2. Haz clic en "Iniciar Sesión"
3. Haz clic en "Sign in with Google"
4. ¡Debería funcionar! 🎉

---

## 📸 Captura de Pantalla de Referencia

Tu configuración debería verse así:

```
Authorized JavaScript origins:
┌────────────────────────────────┐
│ http://localhost:3000          │
│ http://localhost:5173          │
└────────────────────────────────┘

Authorized redirect URIs:
┌────────────────────────────────┐
│ http://localhost:3000          │
│ http://localhost:5173          │
└────────────────────────────────┘
```

---

## ⚠️ Errores Comunes

### ❌ NO hagas esto:
- NO agregues `https://` (debe ser `http://` para desarrollo local)
- NO agregues `/auth/callback` al final
- NO agregues puertos diferentes a 3000 y 5173
- NO olvides hacer clic en "SAVE"

### ✅ Sí haz esto:
- USA exactamente `http://localhost:3000`
- USA exactamente `http://localhost:5173`
- ESPERA 1-2 minutos después de guardar
- LIMPIA la caché del navegador

---

## 🔍 Si Aún No Funciona

### Verificación 1: Client ID Correcto

Verifica que el Client ID en `.env` sea exactamente:
```bash
cat .env
```

Debería mostrar:
```
VITE_GOOGLE_CLIENT_ID=1096972045606-9qcls5g2qc0ib09fiauenhfmh4ljb2br.apps.googleusercontent.com
```

### Verificación 2: Reiniciar el Proyecto

```bash
make restart
```

### Verificación 3: Ver Logs

```bash
make logs
```

Busca errores relacionados con Google OAuth

### Verificación 4: Verificar en Consola del Navegador

1. Abre la consola (F12)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Captura el error y compártelo

---

## 🆘 Ayuda Adicional

Si después de seguir TODOS estos pasos aún tienes problemas:

1. Verifica que estás usando el proyecto correcto en Google Cloud Console
2. Verifica que el Client ID coincida exactamente
3. Prueba en modo incógnito
4. Prueba en otro navegador (Chrome, Firefox, Edge)
5. Espera 5 minutos completos después de guardar en Google Cloud Console

---

## 📞 Contacto

Si necesitas más ayuda, proporciona:
- Screenshot del error completo
- Screenshot de tu configuración en Google Cloud Console
- Logs de la consola del navegador (F12)

---

**Creado:** Diciembre 6, 2025
**Tu Client ID:** 1096972045606-9qcls5g2qc0ib09fiauenhfmh4ljb2br.apps.googleusercontent.com
