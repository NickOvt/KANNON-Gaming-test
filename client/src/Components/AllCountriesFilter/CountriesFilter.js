import React, { Fragment, useState, useEffect } from 'react';
import Country from '../country';

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
      <div className="row">
        <div className="input-group mt-4">
          <input
            type="text"
            placeholder="Enter filter"
            className="form-control"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="mt-1">
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
        </div>
      </div>
    </>
  );
}

export default CountryList;
