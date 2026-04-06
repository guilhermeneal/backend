const express = require("express");
const fs = require("fs");
const mysql = require("mysql");

const app = express();
//middleware
app.use(express.json()); // Permite ler JSON no body

const port = 3000;

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
    user: "root",          // o usuário que criamos no MySQL
    password: "password",       // a senha que definimos
    database: "backendprojeto1"    // o banco que criamos
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

app.get("/books", (req, res) => { //listar livros
    db.query("SELECT * FROM Book", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(result);
    });
});

app.post("/books", (req, res) => {
    const { title, isbn, genre, review, synopsis, pages, price, published, comment } = req.body;

    const commentString = JSON.stringify(comment); // Convertendo o array de comentários para string JSON

    db.query(
        "INSERT INTO Book (title, isbn, genre, review, synopsis, pages, price, published, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [title, isbn, genre, review, synopsis, pages, price, published, commentString],
        (err, result) => { 
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Livro adicionado com sucesso", bookId: result.insertId });
        } 
    );
});

app.get("/books/genre/:genre", (req, res) => { //filtrar por gênero

        db.query("SELECT * FROM Book WHERE genre = ?", [req.params.genre], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json(result);
        });
    });

app.put("/books/:id/discount", (req, res) => { //adicionar desconto
    const bookId = req.params.id;
    const discount = parseFloat(req.query.percent);

    if (isNaN(discount) || discount <= 0 || discount >= 100) {
        return res.status(400).json({ error: "Desconto deve ser entre 0 e 100" });
    }
    const sql = "UPDATE Book SET price = price * (1 - ? / 100) WHERE id = ?";
    db.query(sql, [discount, bookId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }
        res.json({ message: "Desconto aplicado com sucesso" });
    });
});

app.get("/books/published/:year", (req, res) => { //filtrar por ano de publicação
    const year = req.params.year;
    const date = `${year}-01-01`;
    const sql = "SELECT * FROM Book WHERE published < ?"; // <-- corrigido
    db.query(sql, [date], (err,result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({message: `Livros publicados antes de ${year}`, books: result});
    });
});

app.get("/book", (req, res) => {
        const bookId = req.query.id;
        if (!bookId) return res.status(400).json({ error: "ID do livro é obrigatório" });

        db.query("SELECT * FROM Book WHERE id = ?", [bookId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ error: "Livro não encontrado" });
        res.status(200).json(result[0]);
    });
});

app.delete("/books/:id", (req, res) => {
        log(req, res);
        const id = req.params.id;
    db.query("DELETE FROM Book WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0)
    return res.status(404).json({ error: "Livro não encontrado" });
    res.status(200).json({ message: "Livro removido com sucesso", rowsAffected: result.affectedRows });
  });
});

app.listen(3000, () => {
    console.log('Servidor a correr na porta 3000');
});