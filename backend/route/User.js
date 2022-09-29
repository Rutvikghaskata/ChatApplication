const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const emailValidator = require("email-validator");
const jwtKey =
  "eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV2.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo";
const router = express.Router();
require("../model/User");
const User = mongoose.model("users");
const PASS_SEC = "rutvik";


router.get("/users", (req, res) => {
  User.find().then((data) => {
    res.status(200).json(data);
  });
});

router.get("/user/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id });
        if (data) {
            res.status(200).json({ data: data, status: 200 });
        } else {
            res.status(404).json({ message: 'User are not found', status: 404 });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
  });


router.post("/user/register", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, PASS_SEC).toString(),
      confirmPassword: CryptoJS.AES.encrypt(
        req.body.confirmPassword,
        PASS_SEC
      ).toString(),
    });
    const hashedPassword = CryptoJS.AES.decrypt(newUser.password, PASS_SEC);
    const hashedConfirmPassword = CryptoJS.AES.decrypt(
      newUser.confirmPassword,
      PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const originalConfirmPassword = hashedConfirmPassword.toString(
      CryptoJS.enc.Utf8
    );

    if (emailValidator.validate(req.body.email)) {
      if (originalPassword !== originalConfirmPassword) {
        res.status(400).send("password and confirm password are not match!");
      } else {
        newUser.save();
        const token = jwt.sign({ userId: newUser._id }, jwtKey);
        res.send({ token });
      }
    } else {
      res.status(400).send("Invalid Email");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/user/signin", async (req, res) => {
  try {
    const user = await User.findOne({
        email: req.body.email,
    });

    const hashedPassword = CryptoJS.AES.decrypt(user.password, PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    if (!user) {
      res.status(401).json("User are not found");
    } else {
      if (originalPassword === inputPassword) {
        const token = jwt.sign({ userId: user._id }, jwtKey);
        res.status(200).json({ token });
      } else {
        res.status(401).json("Wrong Password");
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;