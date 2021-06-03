const express = require("express");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const db = config.get('mongoURI');

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const User = require("./models/User");

app.get("/api", async (req, response) => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      response.json(data);
    });
});

app.get("/api/:countryName", async (req, response) => {
  fetch(`https://restcountries.eu/rest/v2/name/${req.params.countryName}`)
    .then((res) => res.json())
    .then((data) => {
      response.json(data[0].name);
    });
});

app.post("/api", async (req, response) => {
  const countriesArray = req.body;

  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      response.json(
        data.filter((country) =>
          countriesArray.some((n) =>
            country.name.toLowerCase().includes(n.toLowerCase())
          )
        )
      );
    });
});

app.post("/api/users", async (req, res) => {
  const {name, email, password} = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({msg: "Please enter all fields"});
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

app.get("/api/auth/user", auth, (req, res) => {
  User.findById(req.user.id)
  .select("-password")
  .then(user => res.json(user));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


