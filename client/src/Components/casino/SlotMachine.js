import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { spin, loadCoins } from '../../actions/casinoActions';

function SlotMachine() {
  // Error or other messages state
  const [msg, setMsg] = useState();

  // Get state from redux
  const coinsTotal = useSelector((state) => state.casino.coinsTotal);
  const error = useSelector((state) => state.error);
  const spinMsg = useSelector((state) => state.casino.spinResult);
  const dispatch = useDispatch();

  // When user logs in, load the coins associated with that user into a separate 'casino' redux state.
  useEffect(() => {
    dispatch(loadCoins());
  }, []);

  // Display error messages, if any
  useEffect(() => {
    if (error.id === 'SPIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  // Display spin related message, if spin was successful
  useEffect(() => {
    if (spinMsg && coinsTotal != 0) {
      setMsg(`The result of the spin was ${spinMsg}`);
    }
  }, [spinMsg]);

  // On button click spin the slot machine
  const onClick = () => {
    dispatch(spin());
  };

  return (
    <>
      {msg && <h5>{msg}</h5>}
      <p>You have {coinsTotal > 0 ? coinsTotal : 0} coins</p>
      <button onClick={onClick}>Spin!</button>
    </>
  );
}

export default SlotMachine;
