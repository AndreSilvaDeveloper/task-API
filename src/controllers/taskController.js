const Task = require("../models/Task");

// Criar nova tarefa
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar a tarefa" });
    }
};

// Listar todas as tarefas
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar as tarefas" });
    }
};

// Buscar uma tarefa por ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar a tarefa" });
    }
};

// Atualizar uma tarefa
exports.updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
        res.json({ message: "Tarefa deletada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar a tarefa" });
    }
};