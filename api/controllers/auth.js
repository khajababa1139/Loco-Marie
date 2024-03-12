const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE email = $1 OR username = $2";

    const { rows: existingUser } = await pool.query(q, [req.body.email, req.body.fullName]);

    if (existingUser.length) {
      return res.status(409).json("User already exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = "INSERT INTO users(username, user_address, userxp, email, password, user_mode) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
      req.body.fullName,
      req.body.address,
      req.body.userxp,
      req.body.email,
      hash,
      req.body.mode
    ];

    await pool.query(insertQuery, values);

    return res.status(200).json("New User in Bookshop!");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE username = $1";

    const { rows: userData } = await pool.query(q, [req.body.username]);

    if (userData.length === 0) {
      return res.status(404).json("User not found!");
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, userData[0].password);
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password!");
    }

    const token = jwt.sign({ id: userData[0].user_id }, "key");
    const { password, ...other } = userData[0];

    res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {

    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("Bug has been logged out.")
};

module.exports = {
    register,
    login,
    logout
}