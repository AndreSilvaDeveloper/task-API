const mongoose = require('mongoose');
const { Client } = require('pg');

// Conexão com o MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

// Conexão com o PostgreSQL
const connectPostgreSQL = async () => {
    const client = new Client({
        user: process.env.POSTGRES_USER, // Nome de usuário
        host: process.env.POSTGRES_HOST, // Host (ex: localhost)
        database: process.env.POSTGRES_DB, // Nome do banco de dados
        password: process.env.POSTGRES_PASSWORD, // Senha
        port: process.env.POSTGRES_PORT || 5432, // Porta (padrão: 5432)
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // SSL apenas em produção
    });

    try {
        await client.connect();
        console.log('Conectado ao PostgreSQL com sucesso!');
        return client; // Retorna o cliente para ser usado em outras partes do código
    } catch (error) {
        console.error('Erro ao conectar ao PostgreSQL:', error);
        process.exit(1);
    }
};

module.exports = { connectMongoDB, connectPostgreSQL }; // Exportando as funções