const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("./user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  users.push({
    email,
    password: hashed,
    preferences: [],
  });

  res.json({
    Message: "User Registered",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ Error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).json({ Error: "Wrong password" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  res.json({ token });
};

module.exports = {
  register,
  login,
};
