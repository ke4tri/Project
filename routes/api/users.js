const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator"); // sends back a responce if something isn't valid

const User = require("../../models/User");

//router.post("/");

router.get("/", function(req, res) {
  res.send("Birds home page");
});

router.post("/", function(req, res) {
  res.send("Got a POST request");
});

module.exports = router;
