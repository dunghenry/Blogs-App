const User = require("../models/User");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5h",
      }
    );
  },
  register: async (req, res) => {
    const { email, firstName, lastName } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists!" });
      }
      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(req.body.password, salt);
      const newUser = new User({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });
      const userSaved = await newUser.save();
      const { password, ...infoUser } = userSaved._doc;
      return res.status(201).json({ ...infoUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
      const isValidPassword = await bycrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Password is incorrect" });
      }
      const accessToken = authController.generateAccessToken(user);
      const { password, ...infoUser } = user._doc;
      return res.status(200).json({ ...infoUser, accessToken });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  loginWithGoogle: async (req, res) => {
    const {email, name, token, googleId} = req.body
    try {
      const user = await User.findOne({ email });
      if (user) {
        const result = {_id: user._id.toString(), name, email };
        return res.status(200).json({...result, accessToken: token});
      }
      const newUser = new User({
        email,
        name,
        googleId
      })
      const userSaved = await newUser.save();
      return res.status(200).json({...userSaved._doc, accessToken: token});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
