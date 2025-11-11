# 📚 API Biblioteca Personal

API REST para gestionar tu biblioteca personal de libros, construida con Node.js, Express y MongoDB. Permite registrar libros propios, importar títulos desde Google Books y calificarlos con un sistema de puntuación.

## 🚀 Características

- CRUD completo de libros con arquitectura en capas (controllers, services, repositories, models)
- Búsqueda avanzada con filtros combinables, paginación y regex
- Integración con la API de Google Books (`/api/google-books/search`)
- Validaciones de negocio y de esquema (mongoose)
- Campo `googleId` para evitar duplicados al importar
- Campo `rate` (0-5) para calificar lecturas
- CORS habilitado para consumo desde aplicaciones frontend

## 🛠️ Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- Arquitectura MVC + Repository pattern
- dotenv para variables de entorno
- axios para integrar Google Books
- nodemon para desarrollo

## 📋 Prerrequisitos

- Node.js >= 18
- MongoDB en ejecución
- npm o yarn

## ⚙️ Instalación

```bash
git clone <tu-repositorio>
cd API_BibliotecaPersonal/backend
npm install
```

### Variables de entorno
Crear un archivo `.env` en `backend/` (o en `backend/src/` si prefieres ejecutar desde ahí):

```env
MONGO_URI=mongodb://localhost:27017/biblioteca_personal
PORT=8080
GOOGLE_BOOKS_API=tu_api_key_google_books
```

> El servidor valida que `MONGO_URI` esté definido antes de iniciar.

### Ejecución
```bash
# Desarrollo (watch con nodemon)
npm run dev

# Producción
npm start
```
La API queda expuesta en `http://localhost:8080` (o el puerto que definas).

## 🗂️ Estructura del proyecto

```
backend/
├── src/
│   ├── app.js                  # Punto de entrada Express
│   ├── configs/
│   │   └── configs.js          # Carga de variables de entorno
│   ├── constants/
│   │   └── validation.js       # Enums y helpers de validación
│   ├── controllers/            # Controladores HTTP
│   ├── models/                 # Esquemas de Mongoose
│   ├── repositories/           # Acceso a datos
│   ├── routes/                 # Definición de rutas
│   └── services/               # Reglas de negocio
├── package.json
└── README.md
```

## 🌍 Variables de entorno soportadas
- `MONGO_URI`: URI de MongoDB (obligatoria)
- `PORT`: puerto del servidor (default `3000` si no se define)
- `GOOGLE_BOOKS_API` o `GOOGLE_BOOKS_API_KEY`: clave para la API de Google Books

## 🔌 Endpoints principales

### 📖 Libros (`/api/books`)

| Método | Ruta               | Descripción                     |
|--------|--------------------|---------------------------------|
| GET    | `/api/books`       | Lista libros con filtros        |
| GET    | `/api/books/:id`   | Obtiene un libro por ObjectId   |
| POST   | `/api/books`       | Crea un nuevo libro             |
| PUT    | `/api/books/:id`   | Actualiza un libro existente    |
| DELETE | `/api/books/:id`   | Elimina un libro                |

**Parámetros de consulta soportados en `GET /api/books`:**

- `page`, `limit`
- `search` (regex en título y autor)
- `titleLike`, `authorLike`
- `genre` (ver listado válido abajo)
- `readStatus` (ver listado válido abajo)
- `available` (true/false)
- `year`
- `readingDateFrom` (ISO string)
- `googleId`
- `rate` (0-5)

Ejemplo:
```http
GET /api/books?genre=fantasy&rate=4&page=1&limit=10
```

**Request de creación (`POST /api/books`)**
```json
{
  "googleId": "2zgRDXFWkm8C",
  "title": "Harry Potter y la piedra filosofal",
  "author": "J.K. Rowling",
  "genre": "fantasy",
  "year": 2015,
  "rate": 4.5,
  "readStatus": "pending",
  "available": true
}
```

### 🔍 Google Books (`/api/google-books`)

- `GET /api/google-books/search?q=<texto>`: consulta la API oficial y devuelve un arreglo de libros normalizado con campos (`googleId`, `title`, `author`, `description`, `publishedDate`, `thumbnail`).
- Requiere `GOOGLE_BOOKS_API` configurado.
- Responde `400` si falta `q`, `404` si no hay resultados y `500` si la API externa falla.

Ejemplo:
```http
GET /api/google-books/search?q=harry+potter
```

## 📊 Modelo de libro

```javascript
{
  googleId: String (opcional, único, indexado),
  title: String (requerido, 1-200),
  author: String (requerido, 1-100),
  normalizedTitle: String (interno, generado automáticamente),
  normalizedAuthor: String (interno, generado automáticamente),
  available: Boolean (default: true),
  genre: String (enum),
  readStatus: String (enum),
  readingDate: Date (no futura),
  pages: Number (entero >= 1),
  rate: Number (0 a 5, default 0),
  year: Number (0 al año actual),
  timestamps: true
}
```

**Géneros permitidos**  
`fiction`, `non-fiction`, `fantasy`, `biography`, `science`, `history`, `horror`, `drama`, `unknown`

**Estados de lectura permitidos**  
`pending`, `reading`, `read`

## 🧪 Ejemplos útiles

### Buscar en Google Books y guardar un resultado
```bash
# 1) Buscar
curl "http://localhost:8080/api/google-books/search?q=harry+potter"

# 2) Crear libro propio usando uno de los resultados
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "googleId": "2zgRDXFWkm8C",
    "title": "Harry Potter y la piedra filosofal",
    "author": "J.K. Rowling",
    "genre": "fantasy",
    "year": 2015,
    "rate": 4.5,
    "readStatus": "pending"
  }'
```

### Actualizar la puntuación de un libro
```bash
curl -X PUT http://localhost:8080/api/books/<bookId> \
  -H "Content-Type: application/json" \
  -d '{ "rate": 5, "readStatus": "read" }'
```

## 🚨 Manejo de errores

- `400 Bad Request`: validaciones fallidas (campos requeridos, enums, rangos, etc.)
- `404 Not Found`: libro inexistente
- `409 Conflict`: ya existe un libro con el mismo `googleId` o con el mismo par `título + autor`
- `500 Internal Server Error`: errores inesperados o problemas externos

## 👨‍💻 Autor
Leandro Traficante

---
⭐ **Si te resulta útil, considerá dejar una estrella en GitHub.**
