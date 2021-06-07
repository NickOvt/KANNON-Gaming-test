import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

function LoginForm() {
  // Set local user object state and messages(msg) state
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState();

  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  // Display error messages, if any
  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = user;

    const loginUser = {
      email,
      password,
    };

    // Attempt to login
    dispatch(login(loginUser));
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const closeErrorAlert = () => {
    dispatch(clearErrors());
  };

  return (
    <>
      <div className='row mt-4'>
        <div className='col-lg-6'>
          {msg ? (
            <div className='alert alert-dismissible alert-danger'>
              <button
                type='button'
                className='btn-close'
                onClick={closeErrorAlert}
              ></button>
              <span>{msg}</span>
            </div>
          ) : null}
          <form onSubmit={onSubmit}>
            <legend>Login</legend>
            <fieldset>
              <label htmlFor='email' className='form-label'>
                E-mail
              </label>
              <input
                type='email'
                name='email'
                className='form-control'
                placeholder='Please enter your email'
                onChange={onChange}
              />

              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                name='password'
                className='form-control'
                placeholder='Please enter your password'
                onChange={onChange}
              />
              <button type='submit' className='btn btn-primary mt-2'>
                Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
