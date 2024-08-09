require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./Routes/userRouters");
const taskRoutes = require("./Routes/taskRouters");
const PORT = 5000;
const express = require("express");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.listen(PORT, () => console.log(`Port ${PORT}`));
