import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { spin } from '../../actions/casinoActions';

function SlotMachine() {
  const [msg, setMsg] = useState();
  
  const coins = useSelector(state => state.auth.user.coins);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if(error.id === "SPIN_FAIL") {
      setMsg(error.msg.msg)
    } else {
      setMsg(null);
    }
  }, [error])

  const onClick = (e) => {
    dispatch(spin());
  }

  return (
    <>
        {msg && (<h5>{msg}</h5>)}
        <p>You have {coins && coins} coins</p>
        <button onClick={onClick}>Spin!</button>
    </>
  );
}

export default SlotMachine;