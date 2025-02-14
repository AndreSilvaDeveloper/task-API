require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongoDB, connectPostgreSQL } = require('./config/db');
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Conectar aos bancos de dados
connectMongoDB();
connectPostgreSQL();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use("/api", taskRoutes);

console.log('POSTGRES_URI:', process.env.POSTGRES_URI);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));