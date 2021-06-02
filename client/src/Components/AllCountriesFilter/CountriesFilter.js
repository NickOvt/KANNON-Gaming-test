import React, { Fragment, useState, useEffect } from 'react';
import Country from '../Country';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setValue] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <>
      <input
        type='text'
        placeholder='Enter filter'
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
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
