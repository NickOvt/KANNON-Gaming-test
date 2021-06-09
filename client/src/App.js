import React, { useEffect } from 'react';
import SingleCountry from './components/singlecountry/singlecountry';
import CountryList from './components/countrylist/countrylist';
import CountryFilter from './components/allcountriesfilter/countriesfilter';
import UserPage from './pages/userpage';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

// When the app/ website is started get the token from the localStorage and load the user(if there is token)
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="container">
        <UserPage />
        <SingleCountry />
        <CountryList />
        <CountryFilter />
      </div>
    </Provider>
  );
}

export default App;
