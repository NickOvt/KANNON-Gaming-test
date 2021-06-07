const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Get User model
const User = require("../../models/User");

/* Api path: /api/auth/
*  RequestType: POST
*/
router.post("/", async (req, res) => {
  const {email, password} = req.body; // get sent user data email and password fields
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Regex for email validation

  // Full validation
  // Validate empty fields
  if(!email || !password) {
    return res.status(400).json({msg: "Please enter all fields"});
  }
  // Validate to given regex(email format)
  if(!emailRegex.test(email)) {
    return res.status(400).json({msg: "Invalid email"}); 
  }
  // Validate password length
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
    })
  });
});

/* Api path: /api/auth/user
*  RequestType: GET
*  Middleware: auth
*/
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
  .select("-password")
  .then(user => res.json(user));
});

module.exports = router;