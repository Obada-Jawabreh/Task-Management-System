const Task = require("../Models/taskModel");
require("dotenv").config();

exports.addTask = async (req, res) => {
  const { title, description, due_date, status, user_id } = req.body;
  
  if (!title || !description || !due_date || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const task = await Task.createTask({
      title,
      description,
      due_date,
      status,
      user_id 
    });
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error("Error creating task:", error); 
    res.status(500).json({
      message: "Error creating Task",
      error: error.message,
    });
  }
};

exports.getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.getTaskById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Task",
      error: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const task = await Task.updateTask(id, {
      title,
      description: description || null,
      due_date: due_date || null,
      status: status || 'Pending'
    });
    if (task) {
      res.status(200).json({ message: "Task updated", task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating Task",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.softDeleteTask(id);
    if (task) {
      res.status(200).json({ message: "Task deleted", task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Task",
      error: error.message,
    });
  }
};
