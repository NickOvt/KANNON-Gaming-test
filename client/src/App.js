import React, { Fragment, useEffect } from 'react';
import SingleCountry from './components/SingleCountry/SingleCountry';
import CountryList from './components/CountryList/CountryList';
import CountryFilter from './components/AllCountriesFilter/CountriesFilter';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <SingleCountry />
      <CountryList />
      <CountryFilter />
    </Provider>
  );
}

export default App;
