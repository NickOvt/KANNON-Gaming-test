import React, { Fragment, useState } from 'react';
import Country from '../Country';
import { singleCountryNameRegex } from '../../utils/regex';

function SingleCountry() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState('');
  const [msg, setMsg] = useState();

  // Hit the api endpoint to retrieve data for the specified country
  function getSingleCountry(inputValue) {
    //Validate input
    if (!inputValue) {
      setMsg('Country field cannot be empty');
      return;
    } else if (!singleCountryNameRegex.test(inputValue)) {
      setMsg('Invalid country name');
      return;
    } else {
      closeErrorAlert();
      fetch(`/api/countries/${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.msg) setMsg(data.msg);
          else {
            setData(data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  const closeErrorAlert = () => {
    setMsg(null);
  };

  return (
    <>
      <div className="row mt-4">
        {msg ? (
          <div className="alert alert-dismissible alert-danger">
            <button
              type="button"
              className="btn-close"
              onClick={closeErrorAlert}
            ></button>
            <span>{msg}</span>
          </div>
        ) : null}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Single country name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary ms-2"
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
