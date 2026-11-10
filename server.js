const express = require('express');
const mysql = require('mysql2');

const server = express();

server.use(express.json());

const bd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "MINHA_API"
});

bd.connect((err) => {
    if(err)
    {
        console.log("Erro ao conectar no banco de dados");
        return;
    }
    console.log("Conectado ao MySQL!");
});

server.get("/", (req, res) => {
    res.send("API 5sem SI em execução");
});

server.get("/produtos", (req, res) => {
   const sql = "SELECT * FROM PRODUTO";
   bd.query(sql, (err, result) => {
        if(err)
            return res.status(500).send("Erro ao consultar produtos!");

        res.json(result);
        res.status(200);
   }); 
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`API executando na porta ${PORT}`);
});

