# ⚡ SOLUCIÓN RÁPIDA - Error 401: invalid_client

## 🔴 TU ERROR:
```
Access blocked: Authorization Error
no registered origin
Error 401: invalid_client
```

## ✅ SOLUCIÓN (3 minutos):

### 1️⃣ Abre Google Cloud Console
🔗 https://console.cloud.google.com/apis/credentials

### 2️⃣ Encuentra tu OAuth Client ID
Busca este ID:
```
1096972045606-9qcls5g2qc0ib09fiauenhfmh4ljb2br
```

### 3️⃣ Haz clic en EDITAR ✏️

### 4️⃣ Agrega estas URIs:

**En "Authorized JavaScript origins" (+ADD URI):**
```
http://localhost:3000
```

**En "Authorized redirect URIs" (+ADD URI cada una):**
```
http://localhost:3000
http://localhost:3000/auth/callback
```

### 5️⃣ SAVE y espera 1 minuto ⏱️

### 6️⃣ Prueba de nuevo
http://localhost:3000/login

---

## 📸 Debe quedar así:

```
Authorized JavaScript origins
┌────────────────────────────┐
│ http://localhost:3000      │
└────────────────────────────┘

Authorized redirect URIs
┌────────────────────────────────────┐
│ http://localhost:3000              │
│ http://localhost:3000/auth/callback│
└────────────────────────────────────┘
```

## ✅ Checklist:
- [ ] Agregaste `http://localhost:3000` en JavaScript origins
- [ ] Agregaste `http://localhost:3000` en redirect URIs
- [ ] Agregaste `http://localhost:3000/auth/callback` en redirect URIs
- [ ] Hiciste clic en SAVE
- [ ] Esperaste 1 minuto
- [ ] Refrescaste el navegador (F5)

---

**Si aún no funciona:** Lee `FIX_AUTHORIZATION_ERROR.md` para más detalles.
