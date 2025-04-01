require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Conectar ao banco de dados
connectDB();
//remoção

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use("/api", taskRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));