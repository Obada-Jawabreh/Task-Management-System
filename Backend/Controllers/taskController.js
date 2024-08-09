const Task = require("../Models/taskModel");
require("dotenv").config();

exports.addTask = async (req, res) => {
  const { name } = req.body;
  try {
    const task = await Task.createTask(name);
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
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
  const { name } = req.body;
  try {
    const task = await Task.updateTask(id, name);
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
