
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const postsRouter = require("./routes/posts");

const app = express();

// Middlewares generales
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Hola desde mi primer servidor con Express!");
});

// Ruta de saludo
app.get("/saludo/:nombre", (req, res) => {
  res.send(`¡Hola, ${req.params.nombre}!`);
});

// Rutas CRUD de publicaciones
app.use("/api/posts", postsRouter);

// Middleware para rutas inexistentes
const endpointDesconocido = (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};

app.use(endpointDesconocido);

// Middleware para manejar errores
const manejadorErrores = (error, req, res, next) => {
  console.error(error.message);

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "El cuerpo de la petición no es un JSON válido"
    });
  }

  res.status(500).json({
    error: "Error interno del servidor"
  });
};

app.use(manejadorErrores);

// Iniciar servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
