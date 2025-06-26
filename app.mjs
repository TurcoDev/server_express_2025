import mysql from "mysql2/promise";
import express from "express";
const app = express();

let connection;

try {
  // Create a MySQL connection
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234", // replace with your MySQL password
    database: "followers",
  });
  console.log("Connected to the database successfully! 👍");
  const [results, fields] = await connection.execute("SELECT * FROM `users`");
  console.log("Users in the database:", results);
  console.log("Database fields:", fields);
  
} catch (error) {
  console.error("Error connecting to the database:", error);
}

app.use(express.json());

let users = [
  { id: 1, name: "Juan" },
  { id: 2, name: "María" },
];

app.get("/users", async (req, res) => {
  if (!connection) {
    return res.status(500).json({ error: "Database connection not established" });
  }
  const [results, fields] = await connection.execute("SELECT * FROM `users`");
  res.status(200).json(results);
});

app.post("/users", async (req, res) => {
  const newUser = req.body;
  // newUser.id = users.length + 1;
  // users.push(newUser);
  if (!connection) {
    return res.status(500).json({ error: "Database connection not established" });
  }
  const [result] = await connection.execute(`INSERT INTO \`users\` (username, role, created_at) VALUES (?, ?, ?)`, [newUser.username, newUser.role, newUser.created_at]);
  // connection.execute("INSERT INTO `users` (id, name) VALUES (?, ?)", [newUser.id, newUser.name])
  res.status(201).json(result);
});

app.put("/users", (req, res) => {
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === updatedUser.id);

  if (index !== -1) {
    users[index] = updatedUser;
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World!\n");
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
