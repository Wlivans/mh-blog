import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "./Schema/User.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";

const server = express();
const PORT = 8888;

const emailRegex = /^[^\u4e00-\u9fa5]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/; // regex for email
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/; // regex for password

server.use(express.json());
server.use(cors());
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
});

const formatDatatoSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateHash = async (email) => {
  let username = email.split("@")[0];

  const usernameExists = await User.exists({
    "personal_info.username": username,
  }).then((res) => res);

  username = usernameExists
    ? `${username}#${nanoid().substring(0, 5)}`
    : username;

  return username;
};

server.post("/register", (req, res) => {
  const { fullname, email, password } = req.body;

  if (fullname.length < 3) {
    return res.status(403).json({
      statusCode: 403,
      message: "Fullname must be at least 3 letters long",
      success: false,
    });
  }

  if (!email?.length) {
    return res.status(403).json({
      statusCode: 403,
      message: "Please Enter Email",
      success: false,
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({
      statusCode: 403,
      message: "Email is invalid",
      success: false,
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      statusCode: 403,
      message:
        "Password is invalid, Password should be 8 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
      success: false,
    });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    const username = await generateHash(email);
    console.log(username);
    let user = new User({
      personal_info: {
        fullname,
        username,
        email,
        password: hashed_password,
      },
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json({
          statusCode: 200,
          data: formatDatatoSend(u),
          message: "okey",
          success: true,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({
            statusCode: 500,
            message: "Email already exist",
            success: false,
          });
        }

        return res.status(500).json({
          statusCode: 500,
          message: err.message,
          success: false,
        });
      });
  });
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
  }

  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        throw res.status(403).json({
          statusCode: 403,
          message: "Email not found",
          success: false,
        });
      }

      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res.status(403).json({
            statusCode: 403,
            message: "Error occured while login please try again",
            success: false,
          });
        }

        if (!result) {
          return res.status(403).json({
            statusCode: 403,
            message: "Incorrect password",
            success: false,
          });
        } else {
          return res.status(200).json({
            statusCode: 200,
            data: formatDatatoSend(user),
            message: "okey",
            success: true,
          });
        }
      });

      console.log(user);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({
        statusCode: 500,
        message: err.message,
        success: false,
      });
    });
});

server.listen(PORT, () => {
  console.log("server start to", PORT);
});
