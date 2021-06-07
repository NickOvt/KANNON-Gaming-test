import React, { Fragment, useState } from 'react';
import Country from '../Country';
import {singleCountryNameRegex} from '../../utils/regex';
import {countryListRegex} from '../../utils/regex';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [msg, setMsg] = useState();

  // Get the input list, and find countries that partly match the specified countries' name
  function getCountriesList(inputValue) {
    // Get input string
    const initialCountriesInput = inputValue.split(',').map(el => el.trim());

    // Clear string of any number and symbols except commas
    const clearedCountriesInputString = inputValue.replace(countryListRegex, '');
    // Make an array of the entered list and remove whitespaces
    const countriesArray = clearedCountriesInputString.split(',').map(el => el.trim());

    // Remove empty strings
    const countriesFinalArray = countriesArray.filter(el => el != "");

    // Validates countryNames
    const passValidation = initialCountriesInput.every(el => singleCountryNameRegex.test(el));

    if(!inputValue) {
      setMsg('List of countries cannot be empty');
      return;
    }
    else if(!passValidation) {
      setMsg('Invalid names of countries in the list');
      return;
    } else {
      closeErrorAlert();
      fetch('/api/countries', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(countriesFinalArray),
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.msg) setMsg(data.msg);
        else {
          setCountries(data);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  const closeErrorAlert = () => {
    setMsg(null);
  }

  return (
    <>
      <div className='row mt-4'>
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
        <div className='input-group'>
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
