const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/tokenGenerator");

async function signup(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;
    console.log(profile_pic);
    if (email.trim() === "") {
      return res.status(404).json({ message: "email is invalid" });
    }

    if (password.length < 6) {
      return res
        .status(404)
        .json({ message: "password should be minimum length of 6" });
    }

    const encryptedPass = bcrypt.hashSync(password, 10);

    await User.create({
      name,
      email: email,
      password: encryptedPass,
      profile_pic: null,
    });
    console.log("vkisn");
    return res.status(201).json({ message: "User Created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || email.trim() === "") {
      return res.status(404).json({ message: "email is invalid" });
    }
    if (!password || password.length < 6) {
        return res
        .status(404)
        .json({ message: "password should be minimum length of 6" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res
        .status(404)
        .json({ message: "user does not exist in database" });
    }
    
    const decryptedPass = bcrypt.compareSync(password, user.password);
    if (!decryptedPass) {
        return res.status(404).json({ message: "Password is not correct." });
    }
    const token = generateToken(user);
    console.log(token)
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    return res.status(200).cookie("token", token, options).json({ message: "login success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    return res.clearCookie("token").status(200).json({ message: "logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { signup, login, logout, getCurrentUser };
