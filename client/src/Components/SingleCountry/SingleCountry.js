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
      <div className='row'>
        <div className='input-group mt-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Single country name'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type='submit'
            className='btn btn-primary ms-2'
            onClick={() => getSingleCountry(inputValue)}
          >
            Submit
          </button>
        </div>
        {data && <Country name={data} />}
      </div>
    </>
  );
}

export default SingleCountry;
