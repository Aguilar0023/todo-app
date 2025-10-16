<div align="center">

# 🧩 TODO APP – Sistema de Gestión de Tareas  
### 🚀 Proyecto de Laboratorio – Cátedra **Implantación de Sistemas**

![Docker](https://img.shields.io/badge/Docker-Desktop-blue?logo=docker)
![Node](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-alpine-blue?logo=postgresql)
![Git](https://img.shields.io/badge/GitHub-Version_Control-black?logo=github)

</div>

---

## 🧠 Descripción General
Este proyecto implementa una **aplicación web full-stack** para la gestión de tareas personales (To-Do List).  
Permite **crear, listar, marcar como completadas y eliminar tareas**, combinando un entorno **Node.js + PostgreSQL + Nginx**, todo dentro de contenedores **Docker**.

El enfoque principal es demostrar:
- **Uso profesional de Git y GitHub**
- **Arquitectura cliente-servidor**
- **Contenerización y orquestación con Docker Compose**
- **Buenas prácticas de desarrollo colaborativo**

---

## 🏗️ Arquitectura del Sistema

```
┌──────────────────────────────┐
│         FRONTEND             │
│  HTML • CSS • JS • Nginx     │
│  Puerto: 8080 → 80           │
└──────────────┬───────────────┘
               │ Fetch API
               ▼
┌──────────────────────────────┐
│          BACKEND             │
│ Node.js + Express API (CRUD) │
│ Puerto: 3000                 │
└──────────────┬───────────────┘
               │ Pool PG
               ▼
┌──────────────────────────────┐
│        DATABASE (PGSQL)      │
│ Tabla: tasks                 │
│ Puerto: 5432                 │
└──────────────────────────────┘
```

Cada contenedor se comunica a través de la red interna definida por **Docker Compose**, garantizando modularidad y portabilidad.

---

## ⚙️ Tecnologías Implementadas

| Componente | Tecnología / Herramienta |
|-------------|--------------------------|
| **Frontend** | HTML5, CSS3, JavaScript, Nginx |
| **Backend** | Node.js (v18+), Express.js |
| **Base de Datos** | PostgreSQL (v15-alpine) |
| **Orquestación** | Docker + Docker Compose |
| **Versionamiento** | Git + GitHub |
| **Entorno de desarrollo** | Ubuntu (WSL2) + Docker Desktop |

---

## 📁 Estructura del Proyecto

```
todo-app/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── server.js
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── nginx.conf
│   └── Dockerfile
│
├── docs/
│   └── (capturas, diagramas, PDF del laboratorio)
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🗄️ Base de Datos

**Tabla:** `tasks`

| Campo | Tipo | Descripción |
|--------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Identificador único |
| `title` | TEXT | Descripción de la tarea |
| `completed` | BOOLEAN | Estado de la tarea |
| `created_at` | TIMESTAMP | Fecha de creación |

---

## ⚙️ Instalación y Ejecución

### ✅ Requisitos previos
- Docker **20+**
- Docker Compose **2+**
- Git
- Docker Desktop en ejecución con integración WSL habilitada

---

### 🧩 1. Clonar el repositorio
```bash
# SSH
git clone git@github.com:Aguilar0023/todo-app.git

# HTTPS
git clone https://github.com/Aguilar0023/todo-app.git

cd todo-app
```

---

### 🐳 2. Construir y levantar servicios
```bash
docker-compose build
docker-compose up -d
```

### 🧾 3. Verificar contenedores activos
```bash
docker-compose ps
```

| Servicio | Puerto | Descripción |
|-----------|--------|-------------|
| **frontend** | 8080 | Interfaz web (Nginx) |
| **backend** | 3000 | API REST (Express) |
| **db** | 5432 | PostgreSQL |

**Acceso web:** 👉 [http://localhost:8080](http://localhost:8080)

---

### 🧹 4. Detener y limpiar
```bash
docker-compose down
# O para limpiar volúmenes:
docker-compose down -v
```

---

## 🖥️ Funcionalidades

### 🔸 Frontend
- Crear nuevas tareas desde un campo de texto  
- Ver lista de tareas en tiempo real  
- Marcar o desmarcar tareas como completadas  
- Eliminar tareas  
- Interfaz minimalista y responsiva  

### 🔸 Backend (API REST)
| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| `GET` | `/tasks` | Lista todas las tareas |
| `POST` | `/tasks` | Crea una nueva tarea |
| `PUT` | `/tasks/:id` | Actualiza el estado de completado |
| `DELETE` | `/tasks/:id` | Elimina una tarea |

📦 **Ejemplo de creación:**
```json
POST /tasks
{
  "title": "Terminar el laboratorio de Docker"
}
```

📤 **Respuesta:**
```json
{
  "id": 1,
  "title": "Terminar el laboratorio de Docker",
  "completed": false,
  "created_at": "2025-10-15T10:23:00Z"
}
```

---

## 🧱 Docker Compose (Resumen)
```yaml
version: "3.8"
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: todouser
      POSTGRES_PASSWORD: todopassword
      POSTGRES_DB: todoapp
    ports: ["5432:5432"]
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d appdb"]
      interval: 5s
      retries: 10

  backend:
    build: ./backend
    ports: ["3000:3000"]
    environment:
      PORT: 3000
      DB_HOST: db
      DB_USER: appuser
      DB_PASSWORD: secret
      DB_NAME: appdb
    depends_on:
      db:
        condition: service_healthy

  frontend:
    build: ./frontend
    ports: ["8080:80"]
    depends_on:
      - backend

volumes:
  pgdata:
```

---

## 🧩 Estrategia de Versionamiento

**Modelo:** Git Flow simplificado

| Rama | Propósito |
|------|------------|
| `main` | Código estable y funcional |
| `feature/backend` | Desarrollo backend (Kerim) |
| `feature/frontend` | Desarrollo frontend (Alfonso) |

**Formato de commits (Conventional Commits):**
```bash
feat: agrega endpoint POST /tasks
fix: corrige bug en conexión a PostgreSQL
style: mejora estilos CSS
docs: actualiza README y diagramas
```

---

## 📸 Evidencias de Ejecución

📷 Se incluyen capturas de:
- Ejecución de `docker-compose up -d`
- Contenedores activos (`docker ps`)
- Interfaz web en el navegador
- Persistencia de datos tras reinicio
- Historial de commits y merges
- Resolución de conflictos (si ocurrió)

👉 Todas las capturas se guardan en `docs/`.

---

## 👥 Créditos del Proyecto

| Rol | Estudiante | Responsabilidades |
|-----|-------------|-------------------|
| 🧑‍💻 **Estudiante 1** | **Alfonso Antonio Cortéz Aguilar** | Desarrollo completo del Backend (Node.js + Express + PostgreSQL), configuración de Docker Compose, documentación técnica. |
| 🎨 **Estudiante 2** | **Kerim Selim Melhado Handal** | Desarrollo del Frontend (HTML, CSS, JS, Nginx), integración visual, evidencias gráficas y soporte de documentación. |

---

## 🧾 Licencia
Proyecto académico desarrollado con fines educativos.  
No es de uso comercial.

---

<div align="center">

### 🏁 _"La implementación no solo es construir software, es integrarlo correctamente."_  
**– Laboratorio de Implantación de Sistemas**

</div>
