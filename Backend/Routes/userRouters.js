const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const auth = require("../Middlewares/auth"); 

router.post("/register" , userController.register);
router.post("/login", userController.login);
// router.post("/view", auth, userController.view);

module.exports = router;
// routes/userRouters.js



