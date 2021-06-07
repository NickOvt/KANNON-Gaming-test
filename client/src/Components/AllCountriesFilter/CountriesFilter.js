import React, { Fragment, useState, useEffect } from 'react';
import Country from '../Country';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load all countries and filter them in the client
  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <>
      <input
        type='text'
        placeholder='Enter filter'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {countries &&
        inputValue &&
        countries
          .filter((country) =>
            country.name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((el) => {
            return <Country key={el.name} name={el.name} />;
          })}
      {countries &&
        !inputValue &&
        countries.map((el) => {
          return <Country key={el.name} name={el.name} />;
        })}
    </>
  );
}

export default CountryList;
