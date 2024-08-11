const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.cookies.Token;
  console.log("Received token:", token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" }) ;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("Decoded user:", user);
    next();
  } catch (error) {
    res.clearCookies("Token"); 
    res.status(401).json({ message: "Invalid token" });
    console.error("Token verification error:", error);
    return res.redirect("/");
  }
};
module.exports = auth;


