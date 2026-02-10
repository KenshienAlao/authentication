const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const [emailExist] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (emailExist.length > 0)
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });

    const [usernameExist] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );
    if (usernameExist.length > 0)
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user.length === 0)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid)
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user[0],
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
