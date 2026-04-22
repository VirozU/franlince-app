# 🎨 Franlince Web - Sistema de Catálogo de Pinturas

Sistema web para la gestión y consulta de un catálogo de pinturas con clasificación automática usando Inteligencia Artificial.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Módulos](#-módulos)
- [Estado Global (Redux)](#-estado-global-redux)
- [API Client](#-api-client)
- [Componentes](#-componentes)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Despliegue](#-despliegue)

---

## 📝 Descripción

Franlince Web es una aplicación frontend desarrollada en React que permite:

- **Catalogar pinturas automáticamente** usando un modelo de IA (CLIP)
- **Buscar pinturas** por estilo, texto o descripción semántica
- **Visualizar estadísticas** del inventario
- **Gestionar el catálogo** completo de pinturas

La aplicación se conecta a un backend FastAPI que procesa las imágenes y gestiona la base de datos PostgreSQL con soporte vectorial (pgvector).

---

## ✨ Características

| Módulo | Funcionalidad |
|--------|---------------|
| **Carga** | Subir imágenes con drag & drop, previsualización, clasificación automática |
| **Catálogo** | Vista grid/lista, filtros por estilo, búsqueda, paginación |
| **Búsqueda IA** | Búsqueda semántica en lenguaje natural ("flores para la sala") |
| **Estadísticas** | Gráficos de distribución, métricas del inventario |
| **Detalle** | Vista completa de cada pintura con clasificación y metadatos |

---

## 🏗 Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                      (React + Redux)                            │
├─────────────────────────────────────────────────────────────────┤
│  Pages          │  Components      │  Store (Redux)             │
│  ├─ Upload      │  ├─ Layout       │  ├─ catalogSlice           │
│  ├─ Catalog     │  ├─ Common       │  ├─ uploadSlice            │
│  ├─ Search      │  └─ Features     │  └─ searchSlice            │
│  ├─ Stats       │                  │                            │
│  └─ Detail      │                  │                            │
├─────────────────────────────────────────────────────────────────┤
│                        API Client (Axios)                       │
│                     catalogApi.js                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                 │
│                    (FastAPI + CLIP)                             │
│                                                                 │
│  /catalog/upload          → Clasificar y guardar pintura        │
│  /catalog/paintings       → Listar catálogo                     │
│  /catalog/semantic-search → Búsqueda por IA                     │
│  /catalog/stats           → Estadísticas                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PostgreSQL + pgvector                        │
│                   (Embeddings vectoriales)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tecnologías

### Core
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2 | Librería UI |
| **Vite** | 5.0 | Build tool y dev server |
| **React Router** | 6.21 | Navegación SPA |

### Estado y Data
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Redux Toolkit** | 2.0 | Estado global |
| **React Redux** | 9.0 | Bindings React-Redux |
| **Axios** | 1.6 | Cliente HTTP |

### UI y Estilos
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **TailwindCSS** | 3.3 | Framework CSS utility-first |
| **Lucide React** | 0.294 | Iconos |
| **Recharts** | 2.10 | Gráficos y visualizaciones |

### Utilidades
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React Dropzone** | 14.2 | Drag & drop de archivos |

---

## 📦 Requisitos Previos

- **Node.js** >= 18.0
- **npm** >= 9.0 o **yarn** >= 1.22
- **Backend API** corriendo en `http://localhost:8000`

---

## 🚀 Instalación

### 1. Clonar o descomprimir el proyecto

```bash
# Si tienes el ZIP
unzip franlince-web.zip
cd franlince-web

# O clonar desde repositorio
git clone <repo-url>
cd franlince-web
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
# Crear archivo .env
cp .env.example .env
```

Editar `.env`:
```env
VITE_API_URL=http://localhost:8000
```

---

## ⚙️ Configuración

### Variables de Entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | URL del backend API |

### Archivo `.env.example`

```env
# URL del backend API
VITE_API_URL=http://localhost:8000
```

### Configuración de Vite (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,                    // Puerto del dev server
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

---

## ▶️ Ejecución

### Desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000`

### Producción

```bash
# Build
npm run build

# Preview del build
npm run preview
```

Los archivos de producción se generan en `/dist`

---

## 📁 Estructura del Proyecto

```
franlince-web/
├── public/                     # Archivos estáticos
│   └── vite.svg
│
├── src/
│   ├── api/                    # Cliente API
│   │   └── catalogApi.js       # Todas las llamadas al backend
│   │
│   ├── components/             # Componentes React
│   │   ├── common/             # Componentes reutilizables
│   │   │   └── index.jsx       # Button, Card, Modal, Spinner, Badge
│   │   │
│   │   └── layout/             # Componentes de layout
│   │       ├── Layout.jsx      # Layout principal
│   │       ├── Navbar.jsx      # Barra de navegación
│   │       └── Sidebar.jsx     # Menú lateral
│   │
│   ├── pages/                  # Páginas/Vistas
│   │   ├── UploadPage.jsx      # Módulo de carga
│   │   ├── CatalogPage.jsx     # Catálogo de pinturas
│   │   ├── PaintingDetailPage.jsx  # Detalle de pintura
│   │   ├── SearchPage.jsx      # Búsqueda semántica
│   │   └── StatsPage.jsx       # Estadísticas
│   │
│   ├── store/                  # Redux store
│   │   ├── index.js            # Configuración del store
│   │   ├── catalogSlice.js     # Estado del catálogo
│   │   ├── uploadSlice.js      # Estado de uploads
│   │   └── searchSlice.js      # Estado de búsquedas
│   │
│   ├── styles/
│   │   └── globals.css         # Estilos globales + Tailwind
│   │
│   ├── App.jsx                 # Componente raíz + rutas
│   └── main.jsx                # Punto de entrada
│
├── index.html                  # HTML principal
├── package.json                # Dependencias
├── vite.config.js              # Configuración Vite
├── tailwind.config.js          # Configuración Tailwind
├── postcss.config.js           # Configuración PostCSS
└── README.md                   # Esta documentación
```

---

## 📦 Módulos

### 1. Módulo de Carga (`UploadPage.jsx`)

**Ruta:** `/upload`

**Funcionalidades:**
- Zona de drag & drop para imágenes
- Previsualización antes de subir
- Subida individual o por lotes
- Visualización del resultado de clasificación
- Historial de subidas en la sesión

**Flujo:**
```
Usuario arrastra imagen → Previsualización → Click "Catalogar"
    → API /catalog/upload → Resultado de clasificación
```

**Estado Redux:** `uploadSlice`

---

### 2. Módulo de Catálogo (`CatalogPage.jsx`)

**Ruta:** `/catalog`

**Funcionalidades:**
- Vista en grid o lista
- Filtro por estilo
- Búsqueda por nombre
- Paginación
- Eliminar pinturas

**Componentes:**
- Grid de tarjetas con imagen y estilo
- Tabla con información detallada
- Modal de confirmación para eliminar

**Estado Redux:** `catalogSlice`

---

### 3. Módulo de Detalle (`PaintingDetailPage.jsx`)

**Ruta:** `/catalog/:id`

**Funcionalidades:**
- Imagen en tamaño completo
- Clasificación completa (todos los estilos)
- Gráfico de barras de confianza
- Metadatos (fecha, ID)
- Descargar imagen
- Eliminar pintura

---

### 4. Módulo de Búsqueda IA (`SearchPage.jsx`)

**Ruta:** `/search`

**Funcionalidades:**
- Input de búsqueda en lenguaje natural
- Sugerencias de búsqueda
- Historial de búsquedas recientes
- Resultados con porcentaje de similitud
- Tips para mejores búsquedas

**Ejemplos de búsqueda:**
- "Flores coloridas para la entrada"
- "Paisaje con montañas"
- "Arte abstracto azul y dorado"

**Estado Redux:** `searchSlice`

---

### 5. Módulo de Estadísticas (`StatsPage.jsx`)

**Ruta:** `/stats`

**Funcionalidades:**
- Cards con métricas principales
- Gráfico de barras (pinturas por estilo)
- Gráfico de pie (distribución)
- Gráfico de confianza promedio
- Tabla detallada

**Librería:** Recharts

---

## 🗃 Estado Global (Redux)

### Store Configuration

```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './catalogSlice'
import uploadReducer from './uploadSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    upload: uploadReducer,
    search: searchReducer,
  },
})
```

### Slices

#### `catalogSlice.js`

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `paintings` | Array | Lista de pinturas |
| `total` | Number | Total de pinturas |
| `currentPainting` | Object | Pintura seleccionada |
| `stats` | Object | Estadísticas |
| `filters` | Object | Filtros activos |
| `loading` | Boolean | Estado de carga |
| `error` | String | Mensaje de error |

**Actions Async:**
- `fetchPaintings` - Obtener lista
- `fetchPaintingDetail` - Obtener detalle
- `deletePainting` - Eliminar
- `fetchStats` - Obtener estadísticas

---

#### `uploadSlice.js`

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `preview` | String | URL de previsualización |
| `uploading` | Boolean | Subiendo archivo |
| `result` | Object | Resultado de clasificación |
| `history` | Array | Historial de sesión |
| `error` | String | Mensaje de error |

**Actions Async:**
- `uploadPainting` - Subir una imagen
- `uploadPaintingsBatch` - Subir múltiples

---

#### `searchSlice.js`

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `query` | String | Texto de búsqueda |
| `results` | Array | Resultados |
| `total` | Number | Total encontrados |
| `searching` | Boolean | Buscando |
| `suggestions` | Array | Sugerencias |
| `recentSearches` | Array | Búsquedas recientes |

**Actions Async:**
- `semanticSearch` - Búsqueda semántica
- `searchByStyle` - Búsqueda por estilo

---

## 🔌 API Client

### Ubicación
`src/api/catalogApi.js`

### Configuración Base

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Métodos Disponibles

#### Catalogación

```javascript
// Subir una pintura
catalogApi.uploadPainting(file: File): Promise<UploadResult>

// Subir múltiples pinturas
catalogApi.uploadPaintingsBatch(files: File[]): Promise<BatchResult>
```

#### Consultas

```javascript
// Listar pinturas
catalogApi.getPaintings({ estilo?, limit?, offset? }): Promise<PaintingsResponse>

// Obtener detalle
catalogApi.getPainting(id: string): Promise<Painting>

// Obtener URL de imagen
catalogApi.getPaintingImageUrl(id: string): string

// Eliminar pintura
catalogApi.deletePainting(id: string): Promise<DeleteResult>
```

#### Búsqueda

```javascript
// Búsqueda por estilo
catalogApi.searchByStyle(estilo: string, minConfianza?: number): Promise<SearchResult>

// Búsqueda semántica
catalogApi.semanticSearch(
  query: string, 
  limit?: number, 
  minSimilitud?: number, 
  estilo?: string
): Promise<SemanticSearchResult>
```

#### Estadísticas

```javascript
// Obtener estadísticas
catalogApi.getStats(): Promise<Stats>

// Listar estilos
catalogApi.getEstilos(): Promise<{ estilos: string[] }>
```

---

## 🧩 Componentes

### Componentes Comunes (`src/components/common/index.jsx`)

#### Button

```jsx
<Button 
  variant="primary|secondary|outline|danger|ghost"
  size="sm|md|lg"
  disabled={boolean}
  loading={boolean}
  onClick={handler}
>
  Texto
</Button>
```

#### Card

```jsx
<Card hover={boolean} onClick={handler}>
  <CardHeader>Título</CardHeader>
  <CardBody>Contenido</CardBody>
</Card>
```

#### Modal

```jsx
<Modal 
  isOpen={boolean}
  onClose={handler}
  title="Título"
  size="sm|md|lg|xl"
>
  Contenido
</Modal>
```

#### Badge

```jsx
<Badge variant="default|primary|success|warning|danger">
  Etiqueta
</Badge>
```

#### Spinner

```jsx
<Spinner size="sm|md|lg" />
```

### Componentes de Layout

#### Layout
Wrapper principal con Navbar y Sidebar.

#### Navbar
Barra superior con búsqueda y notificaciones.

#### Sidebar
Menú lateral con navegación principal.

---

## 👨‍💻 Guía de Desarrollo

### Agregar una nueva página

1. **Crear el archivo** en `src/pages/NuevaPage.jsx`

```jsx
function NuevaPage() {
  return (
    <div className="pt-16">
      <h1>Nueva Página</h1>
    </div>
  )
}

export default NuevaPage
```

2. **Agregar la ruta** en `src/App.jsx`

```jsx
import NuevaPage from './pages/NuevaPage'

// En Routes
<Route path="/nueva" element={<NuevaPage />} />
```

3. **Agregar al menú** en `src/components/layout/Sidebar.jsx`

```jsx
const navigation = [
  // ...existentes
  { name: 'Nueva', href: '/nueva', icon: IconComponent },
]
```

### Agregar un nuevo endpoint API

1. **Agregar método** en `src/api/catalogApi.js`

```javascript
export const catalogApi = {
  // ...existentes
  
  nuevoMetodo: async (params) => {
    const response = await api.get('/nuevo-endpoint', { params })
    return response.data
  },
}
```

2. **Crear async thunk** en el slice correspondiente

```javascript
export const nuevoThunk = createAsyncThunk(
  'slice/nuevoThunk',
  async (params) => {
    const response = await catalogApi.nuevoMetodo(params)
    return response
  }
)
```

### Agregar estado global

1. **Crear nuevo slice** en `src/store/nuevoSlice.js`

```javascript
import { createSlice } from '@reduxjs/toolkit'

const nuevoSlice = createSlice({
  name: 'nuevo',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {}
})

export default nuevoSlice.reducer
```

2. **Registrar en store** en `src/store/index.js`

```javascript
import nuevoReducer from './nuevoSlice'

export const store = configureStore({
  reducer: {
    // ...existentes
    nuevo: nuevoReducer,
  },
})
```

### Convenciones de código

- **Componentes:** PascalCase (`PaintingCard.jsx`)
- **Hooks:** camelCase con prefijo `use` (`useUpload.js`)
- **Utils:** camelCase (`formatDate.js`)
- **Constantes:** UPPER_SNAKE_CASE (`API_BASE_URL`)

### Estilos

Usar **Tailwind CSS** para todos los estilos:

```jsx
// ✅ Correcto
<div className="flex items-center justify-between p-4 bg-white rounded-lg">

// ❌ Evitar CSS inline o archivos CSS separados
<div style={{ display: 'flex' }}>
```

---

## 🚀 Despliegue

### Build de producción

```bash
npm run build
```

Genera archivos en `/dist`

### Variables de entorno en producción

Crear `.env.production`:

```env
VITE_API_URL=https://api.tudominio.com
```

### Despliegue en Vercel

```bash
npm install -g vercel
vercel
```

### Despliegue en Netlify

1. Conectar repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Variables de entorno en dashboard

### Docker (opcional)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🐛 Troubleshooting

### El frontend no conecta al backend

1. Verificar que el backend esté corriendo en `http://localhost:8000`
2. Verificar la variable `VITE_API_URL` en `.env`
3. Revisar CORS en el backend

### Las imágenes no cargan

1. Verificar que el endpoint `/catalog/painting/{id}/image` funcione
2. Revisar la consola del navegador por errores

### Error de CORS

El backend debe tener configurado:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o ["http://localhost:3000"]
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📄 Licencia

Proyecto desarrollado para Franlince - La Lagunilla, CDMX.

---

## 👥 Contacto

Para dudas o soporte sobre este proyecto, contactar al equipo de desarrollo.
