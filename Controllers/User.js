const { findUserByEmail, updateUserDetails } = require("../db/User");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const dotenv = require("dotenv");
dotenv.config();
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        error: "Please provide name, email and password",
      });
    const alreadyRegisteredUser = await findUserByEmail(email);
    if (alreadyRegisteredUser)
      return res.status(400).json({
        success: false,
        error: "User already registered, Please login",
        isAlreadyRegistered: true,
      });
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "You are registered successfully, Please login now",
      });
  } catch (error) {
    console.error("sign up user error", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide email and password" });
    }
    const userFound = await findUserByEmail(email);
    if (!userFound)
      return res.status(400).json({
        success: false,
        error: `No user found with this email ${email}`,
      });
    const hashedPassword = userFound.password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password provided" });
    const tokenPayload = {
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    };
    const signedJWTToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY);
    const updatedUser = await updateUserDetails(email, {
      token: signedJWTToken,
    });
    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, error: "Could not login, Some error occured" });
    }
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: signedJWTToken,
    });
  } catch (error) {
    console.error("login user error", error);
  }
};

module.exports = { signupUser, loginUser };
