import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import RegisterForm from '../components/auth/registerForm';
import Logout from '../components/auth/Logout';
import LoginForm from '../components/auth/loginForm';
import SlotMachine from '../components/casino/SlotMachine';

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
