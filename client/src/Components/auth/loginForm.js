import React, { Fragment, useState } from 'react';

function CountryList() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <>
      <form action=''>
        <input type='text' placeholder='Your name' />
        <input type='email' placeholder='Your e-mail' />
        <input type='password' placeholder='Password' />
        <button type='submit'>Submit form</button>
      </form>
    </>
  );
}

export default CountryList;
