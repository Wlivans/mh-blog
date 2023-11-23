import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const server = express();
const PORT = 8888;

const emailRegex = /^[^\u4e00-\u9fa5]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/; // regex for email
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*]).{8,20}$/; // regex for password

server.use(express.json());

mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
});

server.post("/signup", (req, res) => {
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

  return res.status(200).json({
    statusCode: 200,
    message: "okey",
    success: true,
  });
});

server.listen(PORT, () => {
  console.log("server start to", PORT);
});
