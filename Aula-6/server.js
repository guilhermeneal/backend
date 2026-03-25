const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

// ==================== Função de logging ====================
function log(req) {
  const logLine = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFileSync("log.txt", logLine);
}

// ==================== Exercício 4a ====================
// Saudação simples
app.get("/", (req, res) => {
  log(req);

  const body = "Olá! Bem-vindo ao servidor.";

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/plain; charset=utf-8",
  });

  res.end(body);
});

// ==================== Exercício 4b ====================
// Saudação em HTML
app.get("/html", (req, res) => {
  log(req);

  const body = "<html><h1>Olá! Bem-vindo ao servidor em HTML</h1></html>";

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/html; charset=utf-8",
  });

  res.end(body);
});

// ==================== Exercício 4c ====================
// Enviar ficheiro HTML
app.get("/file", (req, res) => {
  log(req);

  const filePath = path.join(__dirname, "index.html");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      "<html><h1>Olá! Bem-vindo ao servidor via ficheiro HTML</h1></html>",
      "utf-8"
    );
  }

  const body = fs.readFileSync(filePath, "utf-8");

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/html; charset=utf-8",
  });

  res.end(body);
});

// ==================== Exercício 4e ====================
// Saudação dinâmica com data
app.get("/dynamic", (req, res) => {
  log(req);

  let body = "<html><h1>Olá, USUARIO! Hoje é DATA_ATUAL</h1></html>";
  body = body
    .replace("USUARIO", "Visitante")
    .replace("DATA_ATUAL", new Date().toLocaleString());

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/html; charset=utf-8",
  });

  res.end(body);
});

// ==================== Exercício 5 ====================
// Saudação personalizada
app.get("/user/:name", (req, res) => {
  log(req);

  const { name } = req.params;
  const body = `Olá, ${name}! Seja bem-vindo.`;

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/plain; charset=utf-8",
  });

  res.end(body);
});

// ==================== Exercício 6 & 7 ====================
// Listar logs
app.get("/logs", (req, res) => {
  log(req);

  const logPath = path.join(__dirname, "log.txt");
  let body = "";

  if (fs.existsSync(logPath)) {
    body = fs.readFileSync(logPath, "utf-8");
  } else {
    body = "Nenhum log encontrado.";
  }

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/plain; charset=utf-8",
  });

  res.end(body);
});

// ==================== Exercício 8 ====================
// Download do log.txt
app.get("/download", (req, res) => {
  log(req);

  const logPath = path.join(__dirname, "log.txt");

  if (fs.existsSync(logPath)) {
    res.download(logPath, "log.txt");
  } else {
    const body = "Nenhum log para download.";

    res.writeHead(200, {
      "Content-Length": Buffer.byteLength(body),
      "Content-Type": "text/plain; charset=utf-8",
    });

    res.end(body);
  }
});

// ==================== Exercício 9 ====================
// Apagar log.txt
app.get("/clear", (req, res) => {
  log(req);

  const logPath = path.join(__dirname, "log.txt");
  let body = "";

  if (fs.existsSync(logPath)) {
    fs.unlinkSync(logPath);
    body = "Ficheiro log.txt apagado.";
  } else {
    body = "Nenhum ficheiro log.txt para apagar.";
  }

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/plain; charset=utf-8",
  });

  res.end(body);
});

// ==================== Iniciar servidor ====================
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});