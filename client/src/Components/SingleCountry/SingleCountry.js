import React, { Fragment, useState } from 'react';
import Country from '../Country';

function SingleCountry() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState('');

  // Hit the api endpoint to retrieve data for the specified country
  function getSingleCountry(inputValue) {
    fetch(`/api/countries/${inputValue}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  return (
    <>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type='submit' onClick={() => getSingleCountry(inputValue)}>
        Submit
      </button>
      {data && <Country name={data} />}
    </>
  );
}

export default SingleCountry;
