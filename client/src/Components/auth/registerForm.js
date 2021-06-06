import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

function RegisterForm(props) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if(error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = user;
    // Create user object
    const newUser = {
      name,
      email,
      password,
    };

    // Attempt to register
    dispatch(register(newUser));
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
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          placeholder='Please enter your name'
          onChange={onChange}
        />

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
        <button type='submit'>Register</button>
      </form>
    </>
  );
}

export default RegisterForm;
