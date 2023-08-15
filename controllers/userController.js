const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//route GET /api/users/Register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  //   const contacts = await Contact.find();
  //   res.status(200).json({
  //     message: "Get all contacts",
  //   });
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailables = await User.findOne({ email });
  if (userAvailables) {
    res.status(400);
    throw new Error("User already registered");
  }
  // Hash password, 10 is salt
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password: ", hashedPassword);

  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  console.log("User created: ", user);
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(404);
    throw new Error("User data is invalid");
  }
  //   res.status(200).json({ message: "Register the user" });
  res.status(200).json(user);
});

//@desc Login user
//route GET /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SCERET,
      {
        expiresIn: "1m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(404);
    throw new Error("Email or password is incorrect");
  }
});

//@desc Current user info
//route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Current user information" });
});
module.exports = { registerUser, loginUser, currentUser };
