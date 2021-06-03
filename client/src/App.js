import React, { Fragment, useEffect } from 'react';
import SingleCountry from './components/singleCountry/SingleCountry';
import CountryList from './components/countryList/CountryList';
import CountryFilter from './components/allCountriesFilter/CountriesFilter';
import RegisterForm from './components/auth/registerForm';

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
      <RegisterForm />
    </Provider>
  );
}

export default App;
