const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require('../../models/User');

const reel1 = ["cherry", "lemon","apple", "lemon", "banana", "banana", "lemon", "lemon"];
const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"]
const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]

function spin(arrayOfReels) {
  let spinResult = [];
  
  for(let i = 0; i < arrayOfReels.length; i++) {
    spinResult.push(arrayOfReels[i][Math.floor(Math.random() * arrayOfReels[i].length)]);
  }

  return spinResult;
}

function resultOfSpin(spinResult, coins){
  const initialCoins = coins;

  if(spinResult[0] == 'cherry' && spinResult[1] == 'cherry' && spinResult[2] == 'cherry') coins += 50;
  else if((spinResult[0] == 'cherry' && spinResult[1] == 'cherry') || spinResult[1] == 'cherry' && spinResult[2] == 'cherry') coins += 40;
  else if(spinResult[0] == 'apple' && spinResult[1] == 'apple' && spinResult[2] == 'apple') coins += 20;
  else if((spinResult[0] == 'apple' && spinResult[1] == 'apple') || spinResult[1] == 'apple' && spinResult[2] == 'apple') coins += 10;
  else if(spinResult[0] == 'banana' && spinResult[1] == 'banana' && spinResult[2] == 'banana') coins += 15;
  else if((spinResult[0] == 'banana' && spinResult[1] == 'banana') || spinResult[1] == 'banana' && spinResult[2] == 'banana') coins += 5;
  else if(spinResult[0] == 'lemon' && spinResult[1] == 'lemon' && spinResult[2] == 'lemon') coins += 3;
  
  return {
    spinResult,
    coins,
    coinsWon: coins - initialCoins,
    isWin: initialCoins < coins ? true : false
  }
}

router.get("/slot", auth, (req, res) => {
  const resultOfSpinValue = resultOfSpin(spin([reel1, reel2, reel3]), req.user.coins);

  const filter = req.user.id;
  const update = { coins: resultOfSpinValue.coins }
 

  User.findOneAndUpdate(filter, update, {
    new: true
  });
  
  res.json(req.user);
});

router.get("/", async (req, res) => {
  
});

module.exports = router;