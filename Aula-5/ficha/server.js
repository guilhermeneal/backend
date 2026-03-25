const express = require("express");
const fs = require("fs");
const app = express();
const port = 4000;

// Middleware para ler JSON do corpo das requisições
app.use(express.json());

const FILE_PATH = __dirname + "/users.json";

// Função para ler o ficheiro users.json
function readPersonsFile() {
  if (!fs.existsSync(FILE_PATH)) {
    throw new Error(`Ficheiro ${FILE_PATH} não encontrado!`); // agora não cria vazio
  }
  const data = fs.readFileSync(FILE_PATH, "utf8");
  return JSON.parse(data);
}
function writePersonsFile(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// Rota inicial
app.get("/", (req, res) => {
  res.status(200).send("Servidor a correr! Testa /users");
});

// GET todas as pessoas
app.get("/users", (req, res) => {
  const persons = readPersonsFile();
  res.status(200).json(persons);
});

// GET pessoa por ID
app.get("/users/:id", (req, res) => {
  const persons = readPersonsFile();
  const person = persons.find((p) => p.id === parseInt(req.params.id));
  if (!person)
    return res.status(404).json({ message: "Pessoa não encontrada" });
  res.json(person);
});

// POST nova pessoa
app.post("/users", (req, res) => {
  const { firstName, lastName, gender, age, profession } = req.body;

  if (!firstName || !lastName || !age) {
    return res.status(400).json({ message: "Campos obrigatórios ausentes" });
  }

  const persons = readPersonsFile();
  const newId = persons.length ? Math.max(...persons.map((p) => p.id)) + 1 : 1;
  const newPerson = { id: newId, firstName, lastName, gender, age, profession };

  persons.push(newPerson);
  writePersonsFile(persons);

  res.status(201).json(newPerson);
});

// PUT atualizar pessoa
app.put("/users/:id", (req, res) => {
  const persons = readPersonsFile();
  const index = persons.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Pessoa não encontrada" });

  persons[index] = { ...persons[index], ...req.body, id: persons[index].id };
  writePersonsFile(persons);
  res.json(persons[index]);
});

// DELETE pessoa
app.delete("/users/:id", (req, res) => {
  let persons = readPersonsFile();
  const index = persons.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Pessoa não encontrada" });

  const deleted = persons.splice(index, 1);
  writePersonsFile(persons);
  res.json(deleted[0]);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});
