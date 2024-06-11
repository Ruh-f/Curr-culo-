const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();  // Carrega variáveis de ambiente do arquivo .env

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(express.json());

// Rota para obter o currículo completo
app.get('/curriculo', async (req, res) => {
    try {
        const infoPessoais = await pool.query('SELECT * FROM info_pessoais');
        const experiencia = await pool.query('SELECT * FROM experiencia');
        const educacao = await pool.query('SELECT * FROM educacao');
        const habilidades = await pool.query('SELECT * FROM habilidades');

        const curriculo = {
            infoPessoais: infoPessoais.rows,
            experiencia: experiencia.rows,
            educacao: educacao.rows,
            habilidades: habilidades.rows
        };

        res.json(curriculo);
    } catch (err) {
        console.error('Erro ao buscar currículo completo', err);
        res.status(500).send('Erro ao buscar currículo completo');
    }
});

const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Porta ${port} já está em uso. Tentando porta diferente...`);
        server.listen(port + 1);
    } else {
        console.error('Erro no servidor:', err);
    }
});
