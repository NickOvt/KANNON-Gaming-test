import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

function LoginForm() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [msg, setMsg] = useState();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if(error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();

    const {email, password} = user;

    const loginUser = {
      email,
      password
    }

    // Attempt to login
    dispatch(login(loginUser));
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      {msg ? (<h1>{msg}</h1>) : null}
      <h4>Login</h4>
      <form onSubmit={onSubmit}>
        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          name='email'
          placeholder='Please enter your email'
          onChange={onChange}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Please enter your password'
          onChange={onChange}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default LoginForm;
