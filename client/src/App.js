import React, { useEffect } from 'react';
import SingleCountry from './components/singleCountry/SingleCountry';
import CountryList from './components/countryList/CountryList';
import CountryFilter from './components/allCountriesFilter/CountriesFilter';
import UserPage from './pages/UserPage';

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
      <UserPage />
    </Provider>
  );
}

export default App;
