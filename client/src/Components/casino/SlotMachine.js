import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { spin, loadCoins } from '../../actions/casinoActions';

function SlotMachine() {
  const [msg, setMsg] = useState();

  const coinsTotal = useSelector(state => state.casino.coinsTotal);
  const error = useSelector((state) => state.error);
  const spinMsg = useSelector(state => state.casino.spinResult);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCoins());
  }, [])

  useEffect(() => {
    if (error.id === 'SPIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    if(spinMsg && coinsTotal != 0) {
      setMsg(`The result of the spin was ${spinMsg}`);
    }
  }, [spinMsg])


  const onClick = (e) => {
    dispatch(spin());
  };

  return (
    <>
      {msg && <h5>{msg}</h5>}
      <p>You have {(coinsTotal > 0) ? coinsTotal : 0} coins</p>
      <button onClick={onClick}>Spin!</button>
    </>
  );
}

export default SlotMachine;
