import React, { Fragment, useState } from 'react';
import Country from '../Country';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setValue] = useState('');

  function getCountriesList(inputValue) {
    const countriesArray = inputValue.split(',');
    //fetch(`/api/?countries=${inputValue}`)
    fetch('/api', {
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
        console.log(data);
      });
  }

  return (
    <>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' onClick={() => getCountriesList(inputValue)}>
        Submit
      </button>
      {countries &&
        countries.map((el) => {
          return <Country key={el.name} name={el.name} />;
        })}
    </>
  );
}

export default CountryList;
