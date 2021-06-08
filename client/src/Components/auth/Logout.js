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
<<<<<<< HEAD
      <button onClick={onClick} className='btn btn-primary mt-4'>
=======
      <button onClick={onClick} className="btn btn-primary mt-4">
>>>>>>> dev1_fixes
        Logout
      </button>
    </>
  );
}

export default Logout;
