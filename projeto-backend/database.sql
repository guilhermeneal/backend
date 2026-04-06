USE backendprojeto1;
CREATE TABLE Book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    isbn VARCHAR(50),
    genre VARCHAR(100),
    review INT,
    synopsis VARCHAR(500),
    pages INT,
    price INT,
    published DATE,
    comment JSON
);
insert into book (title, isbn, genre, review, synopsis, pages, price, published, comment)
VALUES
(
'Os Maias',
'9789720049577',
'Romance',
9,
'História da família Maia na sociedade portuguesa do século XIX.',
700,
18,
'1888-01-01',
'{"autor": "Eça de Queirós", "pais": "Portugal"}'
),

(
'Memorial do Convento',
'9789720046712',
'Romance Histórico',
10,
'Romance sobre a construção do Convento de Mafra durante o reinado de D. João V.',
480,
20,
'1982-01-01',
'{"autor": "José Saramago", "premio": "Nobel"}'
),

(
'Livro do Desassossego',
'9789720040581',
'Filosofia',
9,
'Obra fragmentada que explora pensamentos e reflexões existenciais.',
400,
17,
'1982-01-01',
'{"autor": "Fernando Pessoa", "tipo": "reflexoes"}'
);