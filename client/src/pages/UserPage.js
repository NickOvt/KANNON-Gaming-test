import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RegisterForm from '../components/auth/registerForm';
import Logout from '../components/auth/Logout';
import LoginForm from '../components/auth/loginForm';
import SlotMachine from '../components/casino/SlotMachine';

function UserPage() {
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