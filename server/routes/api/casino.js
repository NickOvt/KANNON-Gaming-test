const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

// Get User model
const User = require('../../models/User');

// Set the reels
const reel1 = ["cherry", "lemon","apple", "lemon", "banana", "banana", "lemon", "lemon"];
const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"]
const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]

// Spin the slot machine and retrieve the spin result(random value from the reel array)
/* spinResult has a format of:
*  ['reel1result','reel2result','reel3result']
*/
function spin(arrayOfReels) {
  let spinResult = [];
  
  for(let i = 0; i < arrayOfReels.length; i++) {
    spinResult.push(arrayOfReels[i][Math.floor(Math.random() * arrayOfReels[i].length)]);
  }

  return spinResult;
}


// Retrieve the result of the spin of the slot machine(such as the actual array of spinResult, the coins won, and if the spin actually won anything)
/*  function return: {
*     spinResult -> object retrieve from the spin functions
      coinsWon -> the amount of coins won through a spin
      isWin -> true if won coins and false if coins stay the same, used to update the frontend
*   }
*/
function resultOfSpin(spinResult){
  let coins = 0;

  if(spinResult[0] == 'cherry' && spinResult[1] == 'cherry' && spinResult[2] == 'cherry') coins += 50;
  else if((spinResult[0] == 'cherry' && spinResult[1] == 'cherry') || spinResult[1] == 'cherry' && spinResult[2] == 'cherry') coins = 40;
  else if(spinResult[0] == 'apple' && spinResult[1] == 'apple' && spinResult[2] == 'apple') coins = 20;
  else if((spinResult[0] == 'apple' && spinResult[1] == 'apple') || spinResult[1] == 'apple' && spinResult[2] == 'apple') coins = 10;
  else if(spinResult[0] == 'banana' && spinResult[1] == 'banana' && spinResult[2] == 'banana') coins = 15;
  else if((spinResult[0] == 'banana' && spinResult[1] == 'banana') || spinResult[1] == 'banana' && spinResult[2] == 'banana') coins = 5;
  else if(spinResult[0] == 'lemon' && spinResult[1] == 'lemon' && spinResult[2] == 'lemon') coins = 3;

  return {
    spinResult,
    coinsWon: coins,
    isWin: (coins == 0) ? false : true
  }
}

// Get and update coins in the DB
/* Api path: /api/casino/slot/
*  RequestType: GET
*  Middleware: auth
*/
router.get("/slot", auth, (req, res) => {
  const resultOfSpinValue = resultOfSpin(spin([reel1, reel2, reel3]));
 
  User.findById(req.user.id)
  .select("-password")
  .then(user => {
    const currentUserCoins = user.coins;
    if(currentUserCoins - 1 > 0) {
      const newCoins = currentUserCoins + resultOfSpinValue.coinsWon - 1;
      User.updateOne({_id: user._id}, {coins: newCoins}, (err) => {
        if(err) console.log(err);
        res.json({...resultOfSpinValue, coinsTotal: newCoins});
      })
    } else {
      res.status(400).json({msg: "Not enough coins"});
    }
  });
});

module.exports = router;