# 📚 API Biblioteca Personal

API REST completa para gestionar tu biblioteca personal de libros, construida con Node.js, Express y MongoDB.

🚀 **Características**

-  CRUD completo para libros
-  Búsqueda avanzada con filtros múltiples
-  Paginación de resultados
-  Validaciones de datos
-  Arquitectura MVC con separación de capas
-  Manejo de errores con códigos HTTP apropiados
-  Base de datos MongoDB con Mongoose

🛠️ **Tecnologías Utilizadas**

- Backend: Node.js, Express.js
- Base de Datos: MongoDB con Mongoose
- Arquitectura: Patrón MVC + Repository Pattern
- Validaciones: Mongoose Schema Validation
- Variables de Entorno: dotenv

📋 **Prerrequisitos**

- Node.js, MongoDB, npm o yarn

⚙️ **Instalación**

1. **Clona el repositorio**
```bash
git clone <tu-repositorio>
cd API_BibliotecaPersonal
```

2. **Instala las dependencias**
```bash
cd backend
npm install
```

3. **Configura las variables de entorno**
```bash
# Crea un archivo .env en la carpeta backend
MONGO_URI=mongodb://localhost:27017/biblioteca_personal
PORT=3000
```

4. **Ejecuta la aplicación**
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

La API estará disponible en `http://localhost:3000`

📚 **Estructura del Proyecto**

```
backend/
├── src/
│   ├── app.js              # Punto de entrada de la aplicación
│   ├── config/
│   │   └── db.js          # Configuración de la base de datos
│   ├── controllers/        # Controladores de la API
│   ├── models/            # Modelos de Mongoose
│   ├── repositories/      # Capa de acceso a datos
│   ├── routes/            # Definición de rutas
│   └── services/          # Lógica de negocio
├── package.json
└── .env
```

## 🔌 **Endpoints de la API**

### 📖 **Libros**

#### Obtener todos los libros
```http
GET /api/books
```

**Parámetros de consulta:**
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `search`: Búsqueda en título y autor
- `titleLike`: Búsqueda específica en título
- `authorLike`: Búsqueda específica en autor
- `genre`: Filtro por género
- `readStatus`: Filtro por estado de lectura
- `available`: Filtro por disponibilidad
- `year`: Filtro por año de publicación

**Ejemplo:**
```bash
GET /api/books?page=1&limit=5&genre=fiction&search=harry
```

#### Obtener libro por ID
```http
GET /api/books/:bookId
```

#### Crear nuevo libro
```http
POST /api/books
```

**Body:**
```json
{
  "title": "El Señor de los Anillos",
  "author": "J.R.R. Tolkien",
  "genre": "fantasy",
  "pages": 1216,
  "year": 1954,
  "readStatus": "unread"
}
```

#### Actualizar libro
```http
PUT /api/books/:bookId
```

#### Eliminar libro
```http
DELETE /api/books/:bookId
```

📊 **Modelo de Libro**

```javascript
{
  title: String (requerido, 1-200 caracteres),
  author: String (requerido, 1-100 caracteres),
  available: Boolean (default: true),
  genre: String (enum: fiction, non-fiction, fantasy, biography, science, history, unknown),
  readStatus: String (enum: read, unread),
  readingDate: Date (no puede ser futura),
  pages: Number (entero positivo),
  year: Number (0 hasta año actual),
  timestamps: true
}
```

🔍 **Filtros Disponibles**

### **Géneros válidos:**
- `fiction` - Ficción
- `non-fiction` - No ficción
- `fantasy` - Fantasía
- `biography` - Biografía
- `science` - Ciencia
- `history` - Historia
- `unknown` - Desconocido

### **Estados de lectura:**
- `read` - Leído
- `unread` - No leído

## 📝 **Ejemplos de Uso**

### **Crear un libro**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "genre": "fiction",
    "pages": 328,
    "year": 1949
  }'
```

### **Buscar libros de fantasía**
```bash
curl "http://localhost:3000/api/books?genre=fantasy&limit=5"
```

### **Buscar por título**
```bash
curl "http://localhost:3000/api/books?titleLike=harry&page=1&limit=10"
```

🚨 **Códigos de Error**

- `400` - Bad Request (datos inválidos)
- `404` - Not Found (libro no encontrado)
- `500` - Internal Server Error

🧪 **Próximas Mejoras**

- [ ] Frontend con React/Vue
- [ ] Autenticación JWT
- [ ] Tests unitarios
- [ ] Documentación Swagger
- [ ] Docker containerización
- [ ] CI/CD pipeline

👨‍💻 **Autor**

Leandro Traficante

📄 **Licencia**

Este proyecto está bajo la Licencia ISC.

---

⭐ **¡Si te gustó este proyecto, dale una estrella en GitHub!**
