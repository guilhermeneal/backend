const express = require("express");
const fs = require("fs");
const mysql = require("mysql");

const app = express();
//middleware
app.use(express.json()); // Permite ler JSON no body

const port = 3030;

// Função de logging
function log(req, res) {
  const logLine = `${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}\n`;
  fs.appendFile("log.txt", logLine, (err) => {
    if (err) console.error("Error writing to log file", err);
  });
}

// Conexão MySQL
const db = mysql.createConnection({
  host: "127.0.0.1",      // ou localhost
  user: "dbuser",          // o usuário que criamos no MySQL
  password: "12345",       // a senha que definimos
  database: "people_db"    // o banco que criamos
});

db.connect((err) => {
  if (err) throw err;
  console.log("Ligado à base de dados MySQL");
});

// Endpoint raiz
app.get("/", (req, res) => {
  log(req, res);
  const body = "Hello World";
  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/plain",
  });
  res.end(body);
});

// ==================== ENDPOINTS /USERS ====================

// 1️⃣ GET /users - Listar todos os users
app.get("/users", (req, res) => {
  log(req, res);
  db.query("SELECT * FROM Users", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// 2️⃣ POST /users - Adicionar novo user
app.post("/users", (req, res) => {
  log(req, res);
  const { Firstname, Lastname, Profession, Age } = req.body;
  db.query(
    "INSERT INTO Users (Firstname, Lastname, Profession, Age) VALUES (?, ?, ?, ?)",
    [Firstname, Lastname, Profession, Age],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User criado", userId: result.insertId });
    }
  );
});

// 3️⃣ DELETE /users - Apagar pelo body
app.delete("/users", (req, res) => {
  log(req, res);
  const { id } = req.body;
  db.query("DELETE FROM Users WHERE Id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User não encontrado" });
    res.json({ rowsAffected: result.affectedRows });
  });
});

// 4️⃣ DELETE /users/:id - Apagar pelo parâmetro
app.delete("/users/:id", (req, res) => {
  log(req, res);
  const id = req.params.id;
  db.query("DELETE FROM Users WHERE Id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User não encontrado" });
    res.json({ rowsAffected: result.affectedRows });
  });
});

// 5️⃣ GET /users/:id - Selecionar user pelo ID
app.get("/users/:id", (req, res) => {
  log(req, res);
  const id = req.params.id;
  db.query("SELECT * FROM Users WHERE Id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ error: "User não encontrado" });
    res.json(result[0]);
  });
});

// 6️⃣ GET /users/:age/:profession - Filtrar por idade e profissão
app.get("/users/:age/:profession", (req, res) => {
  log(req, res);
  const age = req.params.age;
  const profession = req.params.profession;
  db.query(
    "SELECT * FROM Users WHERE Age = ? AND Profession = ?",
    [age, profession],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0)
        return res.status(404).json({ error: "Nenhum utilizador encontrado" });
      res.json(result);
    }
  );
});

// 7️⃣ PUT /users/:id - Atualizar user
app.put("/users/:id", (req, res) => {
  log(req, res);
  const id = req.params.id;
  const { Firstname, Lastname, Profession, Age } = req.body;
  db.query(
    "UPDATE Users SET Firstname=?, Lastname=?, Profession=?, Age=? WHERE Id=?",
    [Firstname, Lastname, Profession, Age, id],
    function (err, result) {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "User não encontrado" });
      res.json({
        message: "User atualizado",
        Id: id,
        Firstname,
        Lastname,
        Profession,
        Age,
      });
    }
  );
});

// ==========================================================

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});