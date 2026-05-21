const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// 1. Configure aqui os dados do seu banco MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Usuário padrão do XAMPP/Wamp é root
    password: 'alexcom34',      // Senha do seu banco
    database: 'sesi_projeto'
});

// 2. Rota que a ESP32 vai chamar
app.post('/api/velocidade', (req, res) => {
    const { velocidade } = req.body;

    if (velocidade === undefined) {
        return res.status(400).send("Dado inválido.");
    }

    const sql = "INSERT INTO dados_sensor (velocidade, data_hora) VALUES (?, NOW())";
    
    db.query(sql, [velocidade], (err, result) => {
        if (err) {
            console.error("Erro ao inserir no MySQL:", err);
            return res.status(500).send("Erro no banco de dados.");
        }
        console.log(`Salvo: ${velocidade} km/h`);
        res.status(200).json({ status: "sucesso", id: result.insertId });
    });
});

//3 . Rota para o HTML buscar a última velocidade registrada
app.get('/api/ultima-velocidade', (req, res) => {
    const sql = "SELECT velocidade FROM dados_sensor ORDER BY id DESC LIMIT 1";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar velocidade:", err);
            return res.status(500).send("Erro no servidor.");
        }
        
        if (results.length > 0) {
            res.json({ velocidade: results[0].velocidade });
        } else {
            res.json({ velocidade: 0 }); // Se o banco estiver vazio
        }
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, '0.0.0.0', () => {
    console.log("Servidor rodando em: http://localhost:3000");
    console.log("Dica: Use o IP da sua máquina no código da ESP32.");
});