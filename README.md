# 🎨 Franlince - Sistema Completo de Catálogo de Pinturas con IA

Sistema integral para la catalogación automática de pinturas utilizando Inteligencia Artificial, compuesto por una API REST backend y una interfaz web frontend moderna.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![CLIP](https://img.shields.io/badge/CLIP-OpenAI-FF6B35)](https://openai.com/research/clip/)

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso del Sistema](#-uso-del-sistema)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Backend](#-api-backend)
- [Frontend Web](#-frontend-web)
- [Base de Datos](#-base-de-datos)
- [Desarrollo](#-desarrollo)
- [Tests](#-tests)
- [Despliegue](#-despliegue)
- [Solución de Problemas](#-solución-de-problemas)
- [Licencia](#-licencia)

---

## 📝 Descripción General

Franlince es un sistema completo de gestión de catálogos de pinturas que utiliza modelos de Inteligencia Artificial para clasificar automáticamente las obras de arte en diferentes estilos artísticos. El sistema consta de dos componentes principales:

### Backend API (`franlince/`)
- **API REST** desarrollada con FastAPI
- **Clasificación automática** usando CLIP de OpenAI
- **Búsqueda semántica** con embeddings vectoriales
- **Gestión completa del catálogo** (CRUD)

### Frontend Web (`franlince-web/`)
- **Interfaz moderna** desarrollada con React
- **Experiencia de usuario intuitiva** con drag & drop
- **Búsqueda inteligente** en lenguaje natural
- **Visualización de estadísticas** y métricas

### Estilos Artísticos Soportados

| Estilo | Descripción |
|--------|-------------|
| **Paisaje** | Montañas, campos, cielos, naturaleza |
| **Marino** | Mar, océano, playas, barcos |
| **Abstracto** | Formas geométricas, patrones, colores |
| **Retrato** | Personas, rostros, figuras humanas |
| **Naturaleza Muerta** | Frutas, flores en jarrones, objetos |
| **Urbano** | Ciudades, edificios, arte callejero |
| **Floral** | Flores como tema principal |
| **Fauna** | Animales, vida silvestre |
| **Religioso** | Escenas bíblicas, santos, iconografía |

---

## ✨ Características Principales

### 🤖 Inteligencia Artificial
- Clasificación automática de pinturas en 9 estilos artísticos
- Búsqueda semántica por descripción en lenguaje natural
- Embeddings vectoriales para similitud de contenido

### 📊 Gestión de Catálogo
- Subida individual y por lotes de imágenes
- CRUD completo de pinturas
- Filtros y búsqueda avanzada
- Estadísticas detalladas del inventario

### 🎨 Interfaz Moderna
- Drag & drop para subir imágenes
- Previsualización antes de catalogar
- Visualización en grid o lista
- Responsive design con TailwindCSS

### 🔍 Búsqueda Inteligente
- Búsqueda por estilo artístico
- Búsqueda semántica ("flores coloridas en jardín")
- Historial de búsquedas
- Sugerencias automáticas

---

## 🏗 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    🖥️  FRONTEND WEB                             │
│                   (React + Redux + Vite)                        │
├─────────────────────────────────────────────────────────────────┤
│  📄 Pages       │  🧩 Components   │  🗃️  Store (Redux)         │
│  ├─ Upload      │  ├─ Layout       │  ├─ catalogSlice          │
│  ├─ Catalog     │  ├─ Common       │  ├─ uploadSlice           │
│  ├─ Search      │  └─ Features     │  └─ searchSlice           │
│  ├─ Stats       │                  │                            │
│  └─ Detail      │                  │                            │
├─────────────────────────────────────────────────────────────────┤
│                   🔌 API Client (Axios)                         │
│                  catalogApi.js                                  │
└───────────────────────────┬─────────────────────────────────────┘
                           │ HTTP/REST
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    🚀 BACKEND API                               │
│                  (FastAPI + CLIP + PostgreSQL)                 │
├─────────────────────────────────────────────────────────────────┤
│  🧠 Services     │  📊 Models       │  🗄️  Repositories         │
│  ├─ Classifier   │  ├─ Painting     │  ├─ PaintingRepo         │
│  ├─ Embedding    │  ├─ Schemas      │  └─ Database             │
│  └─ ImageProc    │  └─ Constants    │                            │
├─────────────────────────────────────────────────────────────────┤
│                   📋 API Routes (FastAPI)                       │
│  /catalog/upload          → Clasificar y guardar pintura        │
│  /catalog/paintings       → Listar catálogo                     │
│  /catalog/semantic-search → Búsqueda por IA                     │
│  /catalog/stats           → Estadísticas                        │
└───────────────────────────┬─────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                 🗃️  BASE DE DATOS                               │
│              PostgreSQL + pgvector                              │
├─────────────────────────────────────────────────────────────────┤
│  pinturas (id, archivo, imagen, estilos, embedding, ...)       │
│  índices vectoriales para búsqueda semántica                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tecnologías

### Backend API
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **FastAPI** | 0.104 | Framework web moderno y rápido |
| **CLIP (OpenAI)** | - | Modelo de IA para clasificación de imágenes |
| **PostgreSQL** | 15 | Base de datos relacional |
| **pgvector** | - | Extensión para búsqueda vectorial |
| **Pydantic** | 2.0 | Validación de datos |
| **Python** | 3.9+ | Lenguaje de programación |

### Frontend Web
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2 | Librería UI |
| **Vite** | 5.0 | Build tool y dev server |
| **Redux Toolkit** | 2.0 | Estado global |
| **TailwindCSS** | 3.3 | Framework CSS |
| **Axios** | 1.6 | Cliente HTTP |
| **Recharts** | 2.10 | Gráficos |

### Infraestructura
| Tecnología | Propósito |
|------------|-----------|
| **Docker** | Contenedorización |
| **Docker Compose** | Orquestación de servicios |

---

## 📦 Requisitos Previos

### Backend
- **Python** >= 3.9
- **Docker** y **Docker Compose**
- **4GB RAM** mínimo (para el modelo CLIP)

### Frontend
- **Node.js** >= 18.0
- **npm** >= 9.0 o **yarn** >= 1.22

---

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd franlince
```

### 2. Configurar el Backend

```bash
cd franlince

# Crear entorno virtual
python -m venv env
source env/bin/activate  # Linux/Mac
# o en Windows: env\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env si es necesario

# Iniciar base de datos
cd docker
docker-compose up -d
cd ..
```

### 3. Configurar el Frontend

```bash
cd ../franlince-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# VITE_API_URL=http://localhost:8000
```

### 4. Ejecutar el Sistema

```bash
# Terminal 1: Backend
cd franlince
python run.py

# Terminal 2: Frontend
cd franlince-web
npm run dev
```

**URLs de acceso:**
- **Frontend:** http://localhost:3000
- **API Backend:** http://localhost:8000
- **Documentación API:** http://localhost:8000/docs

---

## 🎯 Uso del Sistema

### Catálogo de Pinturas
1. **Subir imágenes** desde la página de carga
2. **Clasificación automática** en estilos artísticos
3. **Explorar catálogo** con filtros y búsqueda
4. **Ver detalles** de cada pintura
5. **Buscar semanticamente** con descripciones naturales

### Ejemplos de Búsqueda Semántica
- "Flores coloridas en un jardín"
- "Atardecer en la playa con palmeras"
- "Retrato de mujer elegante del siglo XIX"
- "Arte abstracto con formas geométricas"

---

## 📁 Estructura del Proyecto

```
franlince/                          # 🏠 Raíz del proyecto
├── franlince/                      # 🚀 Backend API
│   ├── src/
│   │   ├── api/                    # FastAPI routes
│   │   ├── core/                   # Configuración central
│   │   ├── models/                 # Modelos de datos
│   │   ├── services/               # Lógica de negocio
│   │   ├── repositories/           # Acceso a datos
│   │   └── database/               # Conexión BD
│   ├── scripts/                    # Utilidades
│   ├── tests/                      # Tests automatizados
│   ├── docker/                     # Configuración Docker
│   ├── requirements.txt            # Dependencias Python
│   └── README.md                   # Documentación backend
│
├── franlince-web/                  # 🖥️ Frontend Web
│   ├── src/
│   │   ├── api/                    # Cliente API
│   │   ├── components/             # Componentes React
│   │   ├── pages/                  # Páginas
│   │   ├── store/                  # Redux store
│   │   └── styles/                 # Estilos
│   ├── public/                     # Archivos estáticos
│   ├── package.json                # Dependencias Node
│   └── README.md                   # Documentación frontend
│
└── README.md                       # 📖 Esta documentación
```

---

## 🔌 API Backend

### Endpoints Principales

#### Sistema
- `GET /health` - Estado del servicio

#### Catálogo
- `POST /catalog/upload` - Subir y clasificar imagen
- `POST /catalog/upload-batch` - Subir múltiples imágenes
- `GET /catalog/paintings` - Listar pinturas
- `GET /catalog/painting/{id}` - Detalle de pintura
- `DELETE /catalog/painting/{id}` - Eliminar pintura

#### Búsqueda
- `GET /catalog/search` - Buscar por estilo
- `GET /catalog/semantic-search` - Búsqueda semántica

#### Estadísticas
- `GET /catalog/stats` - Estadísticas del catálogo
- `GET /catalog/estilos` - Lista de estilos

### Documentación Interactiva
Accede a http://localhost:8000/docs para la documentación completa con ejemplos.

---

## 🌐 Frontend Web

### Páginas Principales
- **`/upload`** - Subida de imágenes con drag & drop
- **`/catalog`** - Exploración del catálogo
- **`/catalog/:id`** - Detalle de pintura específica
- **`/search`** - Búsqueda semántica
- **`/stats`** - Estadísticas y métricas

### Características de UI
- Interfaz responsive
- Drag & drop para archivos
- Previsualización de imágenes
- Gráficos interactivos con Recharts
- Tema moderno con TailwindCSS

---

## 🗃️ Base de Datos

### Esquema Principal

```sql
CREATE TABLE pinturas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archivo VARCHAR(255) NOT NULL,
    ruta VARCHAR(500),
    imagen BYTEA,
    estilo_principal VARCHAR(50) NOT NULL,
    confianza FLOAT NOT NULL,
    estilo_2 VARCHAR(50),
    confianza_2 FLOAT,
    estilo_3 VARCHAR(50),
    confianza_3 FLOAT,
    todos_estilos JSONB,
    embedding vector(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Índices Optimizados
- Búsqueda rápida por estilo
- Búsqueda vectorial semántica con pgvector
- Índices para filtrado eficiente

---

## 👨‍💻 Desarrollo

### Backend
```bash
cd franlince
source env/bin/activate
python run.py
```

### Frontend
```bash
cd franlince-web
npm run dev
```

### Scripts Útiles
```bash
# Cargar datos iniciales
python -m scripts.load_initial_data catalogo_estilos.json

# Generar embeddings
python -m scripts.generate_embeddings ./pinturas
```

---

## 🧪 Tests

### Ejecutar Tests del Backend
```bash
cd franlince
pytest tests/ -v
```

### Ejecutar Tests del Frontend
```bash
cd franlince-web
npm test
```

---

## 🚀 Despliegue

### Backend
```bash
cd franlince
docker build -t franlince-api .
docker run -p 8000:8000 franlince-api
```

### Frontend
```bash
cd franlince-web
npm run build
# Desplegar el contenido de /dist en servidor web
```

### Docker Compose (Completo)
```bash
cd franlince/docker
docker-compose up -d
```

---

## 🔧 Solución de Problemas

### Backend
- **Error de conexión PostgreSQL:** Verificar que Docker esté corriendo
- **Modelo CLIP no carga:** Verificar espacio en disco (~600MB)
- **Puerto ocupado:** `lsof -i :8000` y `kill -9 <PID>`

### Frontend
- **No conecta al backend:** Verificar `VITE_API_URL` en `.env`
- **Imágenes no cargan:** Verificar CORS en backend
- **Errores de build:** `rm -rf node_modules && npm install`

### Base de Datos
- **Sin resultados de búsqueda:** Regenerar embeddings
- **Datos corruptos:** Reiniciar contenedor PostgreSQL

---

## 📄 Licencia

Proyecto desarrollado para Franlince - La Lagunilla, CDMX.

---

## 👥 Contacto

Para soporte técnico o consultas sobre el proyecto, contactar al equipo de desarrollo.

---

**Desarrollado con ❤️ para la catalogación inteligente de obras de arte**