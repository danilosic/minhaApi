const express = require('express');
const mysql = require('mysql2');

const server = express();

server.use(express.json());

const bd = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: process.env.DB_CA?.replace(/\\n/g, "\n")
    }
});

bd.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err.message);
        return;
    }

    console.log("Conectado ao MySQL do Aiven!");
});

server.get("/", (req, res) => {
    res.send("API 5sem SI em execução");
});

server.get("/produtos", (req, res) => {
   const sql = "SELECT * FROM produto";
   bd.query(sql, (err, result) => {
        if(err)
            return res.status(500).send("Erro ao consultar produtos!");

        res.json(result);
        res.status(200);
   }); 
});

const PORT = process.env.PORT || 3090;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`API executando na porta ${PORT}`);
});

