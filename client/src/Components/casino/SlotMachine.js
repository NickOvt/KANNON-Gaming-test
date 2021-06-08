import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { spin, loadCoins } from '../../actions/casinoActions';

function SlotMachine() {
  // Error or other messages state
  const [msg, setMsg] = useState({});

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
      setMsg({ msg: error.msg.msg, isDanger: true });
    } else {
      setMsg(null);
    }
  }, [error]);

  // Display spin related message, if spin was successful
  useEffect(() => {
    if (spinMsg && coinsTotal != 0) {
      const msgString = `The result of the spin was ${spinMsg}`;
      setMsg({ msg: msgString, isDanger: false });
    }
  }, [spinMsg]);

  // On button click spin the slot machine
  const onClick = () => {
    dispatch(spin());
  };

  const clearCurrentErrors = () => {
    setMsg(null);
  };

  return (
    <>
      {msg && (
        <div
          className={`alert alert-dismissible alert-${
            msg.isDanger ? 'danger' : 'success'
          }`}
        >
          <button
            type="button"
            className="btn-close"
            onClick={clearCurrentErrors}
          ></button>
          <p>{msg.msg}</p>
        </div>
      )}
      <p>You have {coinsTotal > 0 ? coinsTotal : 0} coins</p>
      <button onClick={onClick} className="btn btn-outline-primary mt-1">
        Spin!
      </button>
    </>
  );
}

export default SlotMachine;
