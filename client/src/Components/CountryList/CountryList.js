import React, { Fragment, useState } from 'react';
import Country from '../Country';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Get the input list, and find countries that partly match the specified countries' name
  function getCountriesList(inputValue) {
    const countriesArray = inputValue.split(',');
    fetch('/api/countries', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(countriesArray),
    })
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }

  return (
    <>
      <div className='row'>
        <div className='input-group mt-4'>
          <input
            type='text'
            className='form-control'
            value={inputValue}
            placeholder='List of countries separated by a comma'
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type='submit'
            className='btn btn-primary ms-2'
            onClick={() => getCountriesList(inputValue)}
          >
            Submit
          </button>
        </div>
        {countries &&
          countries.map((el) => {
            return <Country key={el.name} name={el.name} />;
          })}
      </div>
    </>
  );
}

export default CountryList;
