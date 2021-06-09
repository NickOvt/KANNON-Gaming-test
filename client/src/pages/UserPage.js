import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import RegisterForm from '../Components/auth/registerForm';
import Logout from '../Components/auth/Logout';
import LoginForm from '../Components/auth/loginForm';
import SlotMachine from '../Components/casino/SlotMachine';

function UserPage() {
  // Get the isAuthenticated state from redux store to conditionally render appropriate components
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Logout />
          <SlotMachine />
        </>
      ) : (
        <>
          <RegisterForm />
          <LoginForm />
        </>
      )}
    </>
  );
}

export default UserPage;
