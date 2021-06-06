const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require("../../models/User");

router.post("/", async (req, res) => {
  const {email, password} = req.body;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Full validation
  if( !email || !password) {
    return res.status(400).json({msg: "Please enter all fields"});
  }
  if(emailRegex.test(email)) {
    return res.status(400).json({msg: "Invalid name or email"}); 
  }
  if(password.length < 6) {
    return res.status(400).json({msg: "Password must be more than 6 symbols"}); 
  }

  // Check for existing user
  User.findOne({email})
  .then(user => {
    if(!user) return res.status(400).json({msg: "User does not exist" });

    // Validate password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});

      jwt.sign(
        {id: user.id},
        config.get('jwtSecret'),
        {expiresIn: "1h"}, 
        (err, token) => {
          if(err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    })
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
  .select("-password")
  .then(user => res.json(user));
});

module.exports = router;