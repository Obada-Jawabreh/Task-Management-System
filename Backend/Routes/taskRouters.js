const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");
const auth = require("../Middlewares/auth.js"); 

router.post("/task", auth, taskController.addTask);
router.get("/task/:id", auth, taskController.getTask);
router.put("/task/:id", auth, taskController.updateTask);
router.delete("/task/:id", auth, taskController.deleteTask);

module.exports = router;
