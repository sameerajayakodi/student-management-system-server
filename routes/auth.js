const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.send("User Registered");
});

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send("Invalid Credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send("invalid Credentials");

  const token = jwt.sign({ id: user._id }, "secret123");
  res.json({ token });
});

module.exports = router;
