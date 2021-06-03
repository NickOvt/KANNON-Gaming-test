import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {register} from "../../actions/authActions";

function RegisterForm(props) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const {name, email, password} = user;
    // Create user object
    const newUser = {
      name,
      email,
      password
    }

    // Attempt to register
    dispatch(register(newUser));
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  return (
    <>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegisterForm;
