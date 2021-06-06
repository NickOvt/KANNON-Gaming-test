import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { spin } from '../../actions/casinoActions';

function SlotMachine() {
  const [msg, setMsg] = useState();
  const [currentCoins, setCurrentCoins] = useState();

  const coins = useSelector((state) => state.auth.user.coins);
  const coinsWon = useSelector(state => state.casino.coinsWon);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if(coins) setCurrentCoins(coins);
    console.log(coins);
  }, [])

  useEffect(() => {
    if (error.id === 'SPIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  /*useEffect(() => {
    setCurrentCoins(prevCoins => prevCoins + coinsWon);
  }, [coinsWon])*/

  const onClick = (e) => {
    dispatch(spin());
  };

  return (
    <>
      {msg && <h5>{msg}</h5>}
      <p>You have {(currentCoins > 0) ? currentCoins : 0} coins</p>
      <button onClick={onClick}>Spin!</button>
    </>
  );
}

export default SlotMachine;
