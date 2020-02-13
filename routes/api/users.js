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

// router.post("/", function(req, res) {
//   res.send("Got a POST request USERS");
// });

router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body; //destructuring req.body.name

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password
    });

    // Encrypt password 10.. the more you have the more secure but slower
    const salt = await bcrypt.genSalt(10);
    // creates a hash and saves it to the db
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    // res.send("User registered");
    //sub res.send with payload

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
