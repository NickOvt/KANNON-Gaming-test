import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {} from '../../actions/casinoActions';

function SlotMachine() {
  const [msg, setMsg] = useState();
  
  const dispatch = useDispatch();

  const onClick = (e) => {
    
  }

  return (
    <>
        {msg && (<h5>{msg}</h5>)}
        <button onClick={onClick}></button>
    </>
  );
}

export default SlotMachine;