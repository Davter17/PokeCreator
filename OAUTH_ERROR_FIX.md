# 🔧 Solución de Errores Comunes - OAuth2

## Error: "Cannot find module '@react-oauth/google'"

### Causa
Las dependencias no están instaladas en el contenedor Docker.

### Solución
```bash
# Opción 1: Reinstalar desde cero
make down
make up
make install

# Opción 2: Instalar directamente
docker exec pokecreator-web npm install

# Opción 3: Si el contenedor no está corriendo
make restart
```

### Verificar que funciona
```bash
# Ver los logs
make logs

# Deberías ver que Vite se inicia sin errores
```

---

## Error: "redirect_uri_mismatch" 

### Causa
Las URIs autorizadas en Google Cloud Console no coinciden con las de tu aplicación.

### Solución

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services > Credentials
3. Edita tu OAuth Client ID
4. Asegúrate de tener EXACTAMENTE estas URIs:

**Authorized JavaScript origins:**
```
http://localhost:3000
http://localhost:5173
```

**Authorized redirect URIs:**
```
http://localhost:3000
http://localhost:5173
http://localhost:3000/auth/callback
http://localhost:5173/auth/callback
```

5. Guarda y espera 1-2 minutos
6. Refresca tu navegador

---

## Error: "idpiframe_initialization_failed"

### Causa
Las cookies de terceros están bloqueadas.

### Solución

**Opción 1: Habilitar cookies de terceros (Chrome)**
1. Ve a `chrome://settings/cookies`
2. Selecciona "Allow all cookies"
3. O agrega `[*.]accounts.google.com` a los sitios permitidos

**Opción 2: Usar modo incógnito**
- Abre una ventana de incógnito
- Las cookies de terceros suelen estar habilitadas por defecto

**Opción 3: Usar otro navegador**
- Prueba con Firefox o Edge

---

## Error: Variables de entorno no se cargan (VITE_GOOGLE_CLIENT_ID undefined)

### Causa
El archivo `.env` no está siendo leído correctamente.

### Solución

1. Verifica que `.env` existe en la raíz del proyecto:
```bash
cat /home/mpico-bu/projects/piscineGlobant/ex01/.env
```

2. Debe contener:
```env
VITE_GOOGLE_CLIENT_ID=1096972045606-9qcls5g2qc0ib09fiauenhfmh4ljb2br.apps.googleusercontent.com
```

3. Reinicia el contenedor:
```bash
make restart
```

4. Verifica en el navegador:
- Abre la consola (F12)
- Escribe: `import.meta.env.VITE_GOOGLE_CLIENT_ID`
- Debería mostrar tu Client ID

---

## Error: El botón de Google no aparece

### Causa
Múltiples posibles causas.

### Solución - Paso a Paso

1. **Verificar que las dependencias están instaladas:**
```bash
docker exec pokecreator-web npm list @react-oauth/google
```

2. **Verificar la consola del navegador (F12):**
- Busca errores en rojo
- Los errores comunes son:
  - Module not found → `make install`
  - Client ID not defined → Verifica `.env`

3. **Verificar que el contenedor está corriendo:**
```bash
make status
```

4. **Reinstalar todo:**
```bash
make down
make clean
make up
make install
```

---

## Error: TypeScript Errors en VSCode

### Causa
Las dependencias no están instaladas localmente (solo en Docker).

### Solución

**Opción 1: Instalar localmente (si tienes npm)**
```bash
npm install
```

**Opción 2: Ignorar los errores**
- Los errores desaparecerán cuando las dependencias se instalen en Docker
- La aplicación funcionará correctamente en el navegador

**Opción 3: Copiar node_modules del contenedor**
```bash
docker cp pokecreator-web:/app/node_modules ./node_modules
```

---

## Error: "Access to XMLHttpRequest has been blocked by CORS"

### Causa
Problema de CORS con la API de Google.

### Solución

1. **Verifica las URIs autorizadas** (ver arriba)

2. **Asegúrate de usar el puerto correcto:**
   - Vite dev server: `http://localhost:3000`
   - NO uses `localhost:5173` si estás usando Docker

3. **Limpia caché del navegador:**
   - Chrome: `Ctrl + Shift + Delete`
   - Selecciona "Cached images and files"
   - Refresca la página

---

## Error: Puerto 3000 ya en uso

### Causa
Otro proceso está usando el puerto 3000.

### Solución

**Opción 1: Detener el otro proceso:**
```bash
# Encontrar el proceso
lsof -i :3000

# Matar el proceso (reemplaza PID)
kill -9 <PID>
```

**Opción 2: Cambiar el puerto en docker-compose.yml:**
```yaml
ports:
  - "3001:3000"  # Cambiar a 3001
```

Luego actualiza las URIs en Google Cloud Console a `http://localhost:3001`

---

## Error: "Login Failed" en la consola

### Causa
Error en el callback de Google.

### Solución

1. **Abre la consola del navegador (F12)**
2. **Busca el error específico**
3. **Errores comunes:**
   - `popup_closed_by_user` → El usuario cerró la ventana
   - `access_denied` → El usuario canceló la autorización
   - `invalid_client` → Client ID incorrecto en `.env`

---

## Logs Útiles para Debugging

### Ver logs del contenedor:
```bash
make logs
```

### Ver logs de npm install:
```bash
docker exec pokecreator-web npm list
```

### Entrar al contenedor:
```bash
docker exec -it pokecreator-web sh
```

### Ver estado de Docker:
```bash
docker ps -a
```

---

## ✅ Checklist de Verificación

Antes de reportar un error, verifica:

- [ ] `.env` existe y contiene `VITE_GOOGLE_CLIENT_ID`
- [ ] URIs autorizadas están configuradas en Google Cloud Console
- [ ] El contenedor está corriendo (`make status`)
- [ ] Las dependencias están instaladas (`make install`)
- [ ] No hay errores en la consola del navegador (F12)
- [ ] El puerto 3000 está libre
- [ ] Cookies de terceros están habilitadas
- [ ] Has esperado 1-2 minutos después de cambiar configuración en Google

---

## 🆘 Si nada funciona

1. **Limpieza completa:**
```bash
make down
make clean
rm -rf node_modules
make up
make install
```

2. **Verifica el archivo .env nuevamente:**
```bash
cat .env
```

3. **Revisa los logs completos:**
```bash
make logs > logs.txt
```

4. **Prueba en otro navegador** (Chrome, Firefox, Edge)

---

## 📞 Ayuda Adicional

- Revisa `OAUTH_IMPLEMENTATION.md` para la guía completa
- Revisa `OAUTH_SETUP.md` para configuración paso a paso
- Documenta el error exacto (screenshot + consola)
