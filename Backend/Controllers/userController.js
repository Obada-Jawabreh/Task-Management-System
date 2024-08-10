const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.createUser(email, password);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("Token", token, 
        {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      }
      );

      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
