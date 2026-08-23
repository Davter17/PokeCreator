# 🎮 Guía Completa del Proyecto - PokeCreator

## 📚 Tabla de Contenidos

1. [¿Qué es PokeCreator?](#qué-es-pokecreator)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [¿Cómo Funciona?](#cómo-funciona)
4. [Flujo de la Aplicación](#flujo-de-la-aplicación)
5. [Tecnologías Utilizadas](#tecnologías-utilizadas)
6. [Componentes Principales](#componentes-principales)
7. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)

---

## 🎯 ¿Qué es PokeCreator?

**PokeCreator** es una aplicación web que permite a los usuarios **crear sus propios Pokémon personalizados** usando inteligencia artificial.

### Características principales:

- 🔐 **Login con Google** (OAuth2)
- 🎨 **Crear Pokémon en 4 pasos** sencillos
- 🤖 **Generación de imágenes con IA** (Pollinations.ai)
- 📸 **Galería personal** de Pokémon creados
- 📱 **Responsive** (funciona en móvil y desktop)
- 🎨 **Diseño colorido** al estilo Pokémon

---

## 📁 Estructura del Proyecto


```
pokecreator/
├── config/              # Configuraciones
│   ├── vite.config.ts     # Vite
│   ├── tsconfig.json      # TypeScript
│   ├── tailwind.config.js # TailwindCSS
│   └── postcss.config.js  # PostCSS
│
├── docker/              # Docker
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── docs/                # Documentación
│   └── GUIA_COMPLETA_PROYECTO.md
│
├── src/                 # Código fuente
│   ├── components/        # Componentes React
│   ├── context/           # Estado global
│   ├── pages/             # Páginas
│   ├── services/          # Servicios
│   ├── types/             # Tipos TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── Makefile
└── .env
```

---

## �� ¿Cómo Funciona?

### Tecnologías Base

#### React 18 🔵
- **¿Qué hace?** Framework para la interfaz de usuario
- **Ejemplo:** Divide la UI en componentes (botones, formularios, tarjetas)

#### TypeScript 📘
- **¿Qué hace?** Agrega tipos a JavaScript
- **Ejemplo:**
```typescript
interface PokemonData {
  name: string      // Solo texto
  type: string
  color: string
}
```

#### Vite ⚡
- **¿Qué hace?** Servidor de desarrollo súper rápido
- **Comando:** `npm run dev` → http://localhost:3000

#### TailwindCSS 🎨
- **¿Qué hace?** Framework CSS con clases predefinidas
- **Ejemplo:**
```tsx
<button className="bg-blue-500 text-white rounded-lg px-4 py-2">
  Botón
</button>
```

---

## 🚀 Flujo de la Aplicación

### Paso a Paso:

```
1. Usuario → http://localhost:3000
   ↓
2. Ve página HOME
   ↓
3. Clic "Iniciar Sesión"
   ↓
4. Popup Google OAuth2
   ↓
5. Autoriza → Recibe JWT token
   ↓
6. Token validado → Guardado en localStorage
   ↓
7. Acceso a:
   • /create  → Crear Pokémon
   • /gallery → Ver galería
   ↓
8. Crear Pokémon (4 pasos):
   Paso 1: Animal base (🦁🐉🐺)
   Paso 2: Habilidades (⚡🔥💧)
   Paso 3: Personalizar (nombre, tipo, color)
   Paso 4: IA genera imagen
   ↓
9. Guardar en localStorage
   ↓
10. Ver en /gallery
```

---

## 📄 Páginas Principales

### Home.tsx 🏠
```
Qué muestra:
- Título: "Crea tu Pokémon Único"
- Descripción del proyecto
- Botón "Empezar"
- Imagen decorativa

Ruta: /
Acceso: Público
```

### Login.tsx 🔐
```
Qué hace:
1. Botón "Iniciar Sesión con Google"
2. Popup OAuth2
3. Recibe token JWT
4. Valida y guarda usuario
5. Redirige a /create

Ruta: /login
Tecnología: @react-oauth/google
```

### Creator.tsx 🎨
```
4 Pasos de Creación:

Paso 1: Seleccionar animal
  - León, Dragón, Lobo, Águila...
  
Paso 2: Habilidades (máx 3)
  - Fuego, Agua, Electricidad...
  
Paso 3: Personalización
  - Nombre (ej: "Dracoflame")
  - Tipo (Fuego, Agua...)
  - Color principal
  - Descripción
  
Paso 4: Resultado
  - IA genera imagen
  - Preview
  - Guardar o regenerar

Ruta: /create
Protegida: ✅ Requiere login
```

### Gallery.tsx 🖼️
```
Qué muestra:
- Grid de Pokémon creados
- Cards: imagen + nombre + tipo
- Modal con detalles completos
- Botones: Compartir, Descargar, Eliminar

Datos: localStorage
Ruta: /gallery
Protegida: ✅ Requiere login
```

---

## 🧩 Componentes Clave

### Header.tsx 🎯
```
Si autenticado:
  - Logo "PokéCreator"
  - Botón "Mi Galería"
  - Botón "Crear"
  - Avatar del usuario
  - "Cerrar Sesión"

Si NO autenticado:
  - Logo
  - "Iniciar Sesión"
```

### ProtectedRoute.tsx 🛡️
```
Función: Proteger rutas

1. ¿Usuario autenticado?
   - SÍ → Mostrar contenido
   - NO → Redirigir a /login

Usado en: /create y /gallery
```

### AuthContext.tsx 🌐
```
Estado Global:
- user: Datos del usuario
- isAuthenticated: true/false
- login(): Iniciar sesión
- logout(): Cerrar sesión

Accesible desde cualquier componente.
```

---

## 🎨 Creador de Pokémon (Componentes)

### Step1AnimalSelection.tsx 🦁
```
- Grid de animales con emojis
- Click para seleccionar
- Seleccionado = borde azul
```

### Step2AbilitySelection.tsx ⚡
```
- Grid de habilidades
- Seleccionar hasta 3
- Al llegar a 3 = deshabilita resto
```

### Step3Customization.tsx ✏️
```
Formulario:
- Input: Nombre (máx 20 chars)
- Select: Tipo
- Radio: Color (círculos)
- Textarea: Descripción (máx 200)
```

### Step4Result.tsx 🎉
```
1. Genera prompt IA:
   "A cute pokemon based on [animal],
    with [type] powers, [abilities],
    [color] colored, [description]"

2. Llama Pollinations.ai

3. Muestra imagen

4. Opciones:
   - Regenerar
   - Guardar
   - Compartir
```

---

## 🔐 Autenticación

### Flujo OAuth2:
```
1. Click "Iniciar Sesión"
   ↓
2. Popup Google
   ↓
3. Usuario autoriza
   ↓
4. Google → JWT token
   ↓
5. Validaciones:
   ✓ Formato correcto
   ✓ No expirado
   ✓ Emisor = Google
   ✓ Campos requeridos
   ↓
6. Si válido:
   - Guarda user en localStorage
   - Guarda token
   - Actualiza estado
   ↓
7. Redirige a /create
```

### authService.ts 🔑
```
Funciones:

decodeToken(token)
  - Decodifica JWT
  - Valida formato
  - Verifica expiración
  - Retorna: user o null

storeAuth(user, token)
  - Guarda en localStorage

clearAuth()
  - Limpia localStorage
  - Usado en logout

getStoredToken()
  - Lee token
  - Valida expiración
```

---

## 🚀 Cómo Ejecutar

### Con Docker (Recomendado) 🐳

```bash
# Levantar proyecto
make up

# Ver logs
make logs

# Acceder
http://localhost:3000

# Detener
make down
```

### Sin Docker 💻

```bash
# Instalar
npm install

# Configurar .env
cp .env.example .env

# Iniciar
npm run dev

# Acceder
http://localhost:5173
```

### Comandos Make 🔧

```bash
make up       # Levantar
make down     # Detener
make restart  # Reiniciar
make logs     # Ver logs
make rebuild  # Reconstruir
make help     # Ayuda
```

---

## 🎨 Sistema de Diseño

### Colores ��

```javascript
// Marca
Primary:   #3B4CCA  🔵
Secondary: #FFCB05  🟡
Accent:    #FF5350  🔴

// Tipos Pokémon
Fuego:     #F08030  🔥
Agua:      #6890F0  💧
Planta:    #78C850  🌿
Eléctrico: #F8D030  ⚡
```

### Responsive 📱

```tsx
// Sin prefijo = móvil
<div className="text-sm">

// sm: ≥640px (tablet)
<div className="text-sm sm:text-base">

// md: ≥768px (tablet grande)
<div className="grid md:grid-cols-2">

// lg: ≥1024px (laptop)
<div className="px-4 lg:px-8">

// xl: ≥1280px (desktop)
<div className="text-4xl xl:text-6xl">
```

### Animaciones ✨

```tsx
// Fade in
<div className="animate-fade-in">

// Hover lift
<button className="hover:-translate-y-1 hover:shadow-lg">

// Loading spinner
<div className="animate-spin">⚡</div>

// Transitions
<div className="transition-all duration-200">
```

---

## 💾 Almacenamiento de Datos

### localStorage

```javascript
// Usuario y token
{
  user: {
    id: "google-id",
    email: "user@gmail.com",
    name: "Usuario",
    picture: "url"
  },
  token: "jwt.token.here",
  
  // Pokémon creados
  savedPokemons: [
    {
      id: 1234567890,
      name: "Dracoflame",
      type: "fire",
      imageUrl: "https://...",
      animal: { name: "León", icon: "🦁" },
      abilities: [...],
      createdAt: "2025-12-08T..."
    }
  ]
}
```

**Nota:** Los datos solo existen en tu navegador, no en un servidor.

---

## 🔒 Seguridad

### Headers de Seguridad

```typescript
// vite.config.ts
headers: {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Content-Security-Policy': '...'
}
```

### Validación de Tokens

```typescript
// authService.ts
if (decoded.exp < now) {
  // Token expirado
  clearAuth()
  return null
}

if (decoded.iss !== 'accounts.google.com') {
  // Emisor inválido
  return null
}
```

---

## ❓ Preguntas Frecuentes

### ¿Por qué Docker?
**R:** Asegura que funcione igual en cualquier computadora.

### ¿Por qué TailwindCSS?
**R:** Estilos directos en componentes, más rápido.

### ¿Dónde se guardan los Pokémon?
**R:** localStorage del navegador (solo en tu PC).

### ¿Cómo funciona la IA?
**R:** Enviamos texto a Pollinations.ai, devuelve imagen.

### ¿Es seguro el login?
**R:** Sí, Google maneja todo. Nunca vemos tu contraseña.

### ¿Funciona sin internet?
**R:** No, necesitas internet para login y generar imágenes.

---

## 📚 Recursos

### Documentación

```
docs/
├── GUIA_COMPLETA_PROYECTO.md  ← Este archivo
├── OAUTH_COMPLETE.md          ← OAuth2
├── SECURITY_ASSESSMENT.md     ← Seguridad
└── ...más docs
```

### Links Útiles

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Vite: https://vitejs.dev
- TailwindCSS: https://tailwindcss.com
- Google OAuth2: https://developers.google.com/identity

---

## 🎓 Conclusión

**PokeCreator demuestra:**

✅ Frontend moderno (React + TypeScript)  
✅ Autenticación real (OAuth2)  
✅ Inteligencia Artificial (generación de imágenes)  
✅ Diseño responsive (mobile-first)  
✅ Buenas prácticas (componentes, tipos, seguridad)  
✅ Docker (deployment fácil)  
✅ Documentación completa  

### Arquitectura:

```
React + TypeScript + Vite
  ↓
TailwindCSS + React Router
  ↓
Context API + localStorage
  ↓
OAuth2 + Pollinations.ai
  ↓
Docker
```

---

**¡Listo para crear Pokémon!** 🎉🚀

**Creado:** Diciembre 8, 2025  
**Versión:** 2.0.0  
**Proyecto:** PokeCreator

---
