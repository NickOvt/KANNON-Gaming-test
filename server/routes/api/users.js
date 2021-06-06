const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require("../../models/User");

router.post("/", async (req, res) => {
  const {name, email, password} = req.body;
  const nameRegex = /^[a-z ,.'-]+$/i;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Full validation
  if(!name || !email || !password) {
    return res.status(400).json({msg: "Please enter all fields"});
  }
  else if(!nameRegex.test(name) || !emailRegex.test(email)) {
    return res.status(400).json({msg: "Invalid name or email"}); 
  }
  else if(password.length < 6) {
    return res.status(400).json({msg: "Password must be more than 6 symbols"}); 
  }

  // Check for existing user
  User.findOne({email})
  .then(user => {
    if(user) return res.status(400).json({msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt and hash the pwd
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
        .then(user => {

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
        });
      })
    })
  });
});

module.exports = router;