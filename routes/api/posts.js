const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Post = require("../../models/Posts");
const User = require("../../models/User");

router.post("/", function(req, res) {
  res.send("Got a POST request");
});

module.exports = router;
