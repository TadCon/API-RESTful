import express from "express";
import cors from "cors";
import UserRoutes from "./router/routes.js";

const app = express();
const PORT = 3000;

const userRoutes = new UserRoutes();

app.use(express.static("public"));
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Configuración de rutas
app.use("/api/users", userRoutes.start());

// Inicio del servidor
const server = app.listen(PORT, () =>
  console.log(`Servidor express escuchando en http://localhost:${PORT}`)
);
server.on("error", (error) =>
  console.log("Error con el servidor express:", error)
);
