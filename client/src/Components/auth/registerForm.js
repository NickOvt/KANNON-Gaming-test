import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

function RegisterForm() {
  // Set local user object and messages(msg) state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState();

  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  // Display errors, if any
  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
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

  const closeErrorAlert = () => {
    dispatch(clearErrors());
  };

  return (
    <>
<<<<<<< HEAD
      <div className='row mt-4'>
        <div className='col-lg-6'>
          {msg ? (
            <div className='alert alert-dismissible alert-danger'>
=======
      <div className="row mt-4">
        <div className="col-lg-6">
          {msg ? (
            <div className="alert alert-dismissible alert-danger">
>>>>>>> dev1_fixes
              <button
                type="button"
                className="btn-close"
                onClick={closeErrorAlert}
              ></button>
              <span>{msg}</span>
            </div>
          ) : null}
          <form onSubmit={onSubmit}>
            <legend>Register</legend>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Please enter your name"
              onChange={onChange}
            />

            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Please enter your email"
              onChange={onChange}
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Please enter your password"
              onChange={onChange}
            />
            <button type="submit" className="btn btn-primary mt-2">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
