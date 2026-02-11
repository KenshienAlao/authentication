const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");

// signup
exports.signup = async (req, res) => {
  try {
    // get the body
    const { username, email, password } = req.body;
    // if username or email or password is empty
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // checking if email already exist
    const [emailExist] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    // if email already exist
    if (emailExist.length > 0)
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });

    // checking if username already exist
    const [usernameExist] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );
    // if username already exist
    if (usernameExist.length > 0)
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // insert the user
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );
    // return with success message
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

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // if email or password is empty
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // checking ig email exist
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    // if email not exist
    if (user.length === 0)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    // password will compare
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    // checking if the password is wrong
    if (!isPasswordValid)
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });

    // will give the token if all things are correct
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // return with success message token
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

// get user info
exports.userInfo = async (req, res) => {
  try {
    // get user info
    const [user] = await db.query(
      "SELECT id, username, email FROM users WHERE id = ?", [req.user.id]);

    // if user not found
    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // return with success message
    res.status(200).json({
      success: true,
      message: "User info fetched successfully",
      data: user[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
