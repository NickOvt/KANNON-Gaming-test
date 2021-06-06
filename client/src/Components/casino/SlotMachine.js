import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { spin } from '../../actions/casinoActions';

function SlotMachine() {
  const [msg, setMsg] = useState();
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);
  const userId = useSelector(state => state.auth._id);
  const dispatch = useDispatch();

  useEffect(() => {
    if(error.id === "SPIN_FAIL") {
      setMsg(error.msg.msg)
    } else {
      setMsg(null);
    }
  }, [error])

  const onClick = (e) => {
    dispatch(spin(userId));
  }

  return (
    <>
        {msg && (<h5>{msg}</h5>)}
        
        <button onClick={onClick}>Spin!</button>
    </>
  );
}

export default SlotMachine;