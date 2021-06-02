import React, { Fragment } from 'react';
import SingleCountry from './Components/SingleCountry/SingleCountry';
import CountryList from './Components/CountryList/CountryList';
import CountryFilter from './Components/AllCountriesFilter/CountriesFilter';

function App() {
  return (
    <>
      <SingleCountry />
      <CountryList />
      <CountryFilter />
    </>
  );
}

export default App;
