const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Get User model
const User = require("../../models/User");

/* Api path: /api/users/
*  RequestType: POST
*/
router.post("/", async (req, res) => {
  // Get sent user data(name, email, password) from the request and the validate them using regex(nameRegex, emailRegex)
  const {name, email, password} = req.body;
  const nameRegex = /^[a-z ,.'-]+$/i;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Full validation
  // Validate empty values
  if(!name || !email || !password) {
    return res.status(400).json({msg: "Please enter all fields"});
  }
  // Validate name and email with the correspoding regex, to check if they're in a valid format
  else if(!nameRegex.test(name) || !emailRegex.test(email)) {
    return res.status(400).json({msg: "Invalid name or email"}); 
  }
  // Validate password length
  else if(password.length < 6) {
    return res.status(400).json({msg: "Password must be more than 6 symbols"}); 
  }

  // Check for existing user
  User.findOne({email})
  .then(user => {
    if(user) return res.status(400).json({msg: "User already exists" });

    // Get temporary local user variable
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

          // Issue JWT token
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