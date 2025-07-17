import { initDB } from "./connectDB.mjs";
import express from "express";
import cors from "cors";
const app = express();

const connection = await initDB();
// Permitir todos los orígenes (solo para desarrollo)
app.use(cors());

// O configurar CORS específicamente
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'null'], // null para archivos locales
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// arreglo que es reemplazado por la base de datos
let users = [
  { id: 1, name: "Juan" },
  { id: 2, name: "María" },
];

// Obtener todos los usuarios
app.get("/users", async (req, res) => {
  if (!connection) {
    return res.status(500).json({ error: "Database connection not established" });
  }
  const [results, fields] = await connection.execute("SELECT * FROM `users`");
  res.status(200).json(results);
});

// Obtener un usuario por ID
app.post("/users", async (req, res) => {
  const newUser = req.body;
  // newUser.id = 100;
  // users.push(newUser);
  if (!connection) {
    return res.status(500).json({ error: "Database connection not established" });
  }
  const [result] = await connection.execute(`INSERT INTO \`users\` (username, role, created_at) VALUES (?, ?, ?)`, [newUser.username, newUser.role, newUser.created_at]);
  // connection.execute("INSERT INTO `users` (id, name) VALUES (?, ?)", [newUser.id, newUser.name])
  res.status(201).json(result);
});

// Actualizar un usuario por ID
app.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  // Actualizar el usuario en la base de datos
  if (!updatedUser || !userId) {
    return res.status(400).json({ error: "Invalid user data" });
  }

  const [result] = await connection.execute(`UPDATE \`users\` SET username = ?, role = ?, created_at = ? WHERE id = ?`, [updatedUser.username, updatedUser.role, updatedUser.created_at, userId]);
  if (result.affectedRows > 0) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Eliminar un usuario por ID
app.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const [result] = await connection.execute(`DELETE FROM \`users\` WHERE id = ?`, [userId]);
  if (result.affectedRows <= 0) {
    return res.status(404).json({ error: "User not found" });
  }
  if (result.affectedRows > 0) {
    return res.status(200).end();
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.status(200).send("Hello World!\n");
});

// Iniciar el servidor
app.listen(3000, "127.0.0.1", () => {
  console.log("Server is running on http://127.0.0.1:3000");
});
