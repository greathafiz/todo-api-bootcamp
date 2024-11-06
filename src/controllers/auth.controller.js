import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // add a guard to reject duplicate username

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Provide both username and password" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      role,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User created. Please proceed to login", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({ message: "password not recognised" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.status(200).json({ message: "login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
