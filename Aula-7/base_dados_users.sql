-- 1️⃣ Criar banco de dados
CREATE DATABASE IF NOT EXISTS people_db;
USE people_db;

-- 2️⃣ Criar tabela Users
CREATE TABLE IF NOT EXISTS Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Firstname VARCHAR(50),
    Lastname VARCHAR(50),
    Profession VARCHAR(100),
    Age INT
);

-- 3️⃣ Criar usuário compatível com Node.js
CREATE USER IF NOT EXISTS 'dbuser'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';

-- 4️⃣ Conceder permissões ao usuário
GRANT ALL PRIVILEGES ON people_db.* TO 'dbuser'@'localhost';
FLUSH PRIVILEGES;

-- 5️⃣ Inserir registros iniciais
INSERT INTO Users (Firstname, Lastname, Profession, Age) VALUES
('Roberto','Andrade','Student',17),
('Ana', 'Silva', 'Teacher',35),
('Pedro', 'Costa', 'Engineer',40),
('Maria', 'Santos', 'Designer',28);