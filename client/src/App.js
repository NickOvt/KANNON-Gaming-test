import React, { useEffect } from 'react';
import SingleCountry from './components/singleCountry/SingleCountry';
import CountryList from './components/countryList/CountryList';
import CountryFilter from './components/allCountriesFilter/CountriesFilter';
import RegisterForm from './components/auth/registerForm';
import Logout from './components/auth/Logout';
import Login from './components/auth/loginForm';
import SlotMachine from './components/casino/SlotMachine';

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
      <Logout />
      <Login />
      <SlotMachine />
    </Provider>
  );
}

export default App;
