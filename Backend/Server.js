require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const PORT = 5000;
const app = express();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

const userRoutes = require("./Routes/userRouters");
const taskRoutes = require("./Routes/taskRouters");

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
