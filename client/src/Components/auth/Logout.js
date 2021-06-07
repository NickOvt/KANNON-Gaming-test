import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

function Logout() {
  const dispatch = useDispatch();

  // On button click logout the user
  const onClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <button onClick={onClick}>Logout</button>
    </>
  );
}

export default Logout;
