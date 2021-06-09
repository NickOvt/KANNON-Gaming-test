import React, { useEffect } from 'react';
/*import SingleCountry from './components/singlecountry/singlecountry.js';
import CountryList from './components/countrylist/countrylist.js';
import CountryFilter from './components/allcountriesfilter/countriesfilter.js';
import UserPage from './pages/userpage.js';*/

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
        
      </div>
    </Provider>
  );
}

export default App;
