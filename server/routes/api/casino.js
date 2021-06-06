const express = require('express');
const router = express.Router();
const crypto = require("crypto");

const reel1 = ["cherry", "lemon","apple", "lemon", "banana", "banana", "lemon", "lemon"];
const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"]
const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]

function spin(arrayOfReels) {
  let spinResult;
  let n;
  
  for(let i = 0; i < arrayOfReels.length; i++) {
    n = crypto.randomInt(0, arrayOfReels[i].length);
    spinResult.push(arrayOfReels[i][n]);
  }

  return spinResult;
}

const hasDuplicate = arr => {
  return arr.some((val, i) => arr.indexOf(val) !== i);
}

function resultOfSpin(spinResult){
  
}

router.post("/slot", async (req, res) => { 
  
});

router.get("/", async (req, res) => {
  
});

module.exports = router;