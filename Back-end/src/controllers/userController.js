import fs from "fs";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  try {
    const token = req.cookies?.access_token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        // const id = new mongoose.Types.ObjectId(decoded.id);
        const user = await User.findOne({
          _id: decoded.id,
        });
        if (user) {
          return res.json(user);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  const { email, password, username } = req.body;
  if ([username, password].some((item) => item === "")) {
    return res.status(400).json({ error: "All Fields are Required!" });
  }
  let user;
  try {
    user = await User.findOne({ email: email });
    if (!user) {
      user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ error: "User doesn't exist!" });
      }
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(500).json({ error: "Wrong Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        lastName: user.lastName,
        firstName: user.firstName,
      },
      process.env.JWT_SECRET
    );
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user);
    res
      .cookie("access_token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .status(200)
      .json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Sign In" });
  }
};

async function addNewUser(req, res) {
  let user = req.body;

  try {
    console.log(req.body);
    if (!user.firstName || !user.lastName || !user.username || !user.password) {
      return res.status(400).json({ message: "missing required property" });
    } else {
      let passExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      let userNameExpression = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/;
      if (!user.password.match(passExpression)) {
        return res.status(400).json({
          error:
            "password should start with letter and has 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });
      }
      if (!user.username.match(userNameExpression)) {
        return res.status(400).json({
          error:
            "Invalid username. Please ensure it starts with a letter, is between 6 and 12 characters, and contains at least one numeric digit.",
        });
      } else {
        let findUser = await User.findOne({
          username: user.username,
        });
        if (findUser) {
          return res.status(400).json({ error: "Username already exist" });
        }

        const hashedPass = await bcrypt.hash(user.password, 10);
        try {
          const hashedPass = await bcrypt.hash(user.password, 10);
          const newUser = await User.create({
            ...user,
            password: hashedPass,
            isAdmin: user.isAdmin ? true : false,
          });
          res.json(newUser);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

async function deleteUser(req, res) {
  const { id } = req.query;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.findOneAndDelete({ _id: id });
    res.json({ message: "User has been deleted" });
  } catch (error) {
    console.log("Failed to delete record : ", error);
    res.status(400).json("not deleted");
  }
}

async function getOneUser(req, res) {
  try {
    const data = await User.findOne({ _id: req.query.id });
    if (data) {
      return res.json(data);
    }
    return res
      .status(404)
      .json({ error: `User with the id ${req.query.id} is not found!` });
  } catch (error) {
    console.log(error);
  }
}
export { getUsers, addNewUser, deleteUser, getOneUser };

// 2024-01-14T15:46:19.846Z
// 2024-01-14T15:46:19.846+00:00
// 2024-01-14T15:46:19.846+00:00