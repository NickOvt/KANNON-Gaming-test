const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require('jsonwebtoken');

const db = config.get('mongoURI');

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const User = require("./models/User");

const app = express();
app.use(express.json());


app.post("/api/auth", async (req, res) => {
  const {email, password} = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({msg: "Please enter all fields"});
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
