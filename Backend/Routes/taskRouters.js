const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");

router.post("/task", taskController.addTask);
router.get("/task/:id", taskController.getTask);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
