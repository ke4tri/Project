const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Post = require("../../models/Posts");
const User = require("../../models/User");

// router.post("/", function(req, res) {
//   res.send("Got a POST request");
// });

router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      console.log(User);
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id
      });

      const post = await newPost.save();
      console.log(post);
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
