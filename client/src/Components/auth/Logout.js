import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

function Logout() {
  const dispatch = useDispatch();

  // On button click logout the user
  const onClick = (e) => {
    dispatch(logout());
  };

  return (
    <>
      <button onClick={onClick}>Logout</button>
    </>
  );
}

export default Logout;
