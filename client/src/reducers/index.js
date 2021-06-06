import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import casinoReducer from './casinoReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  casino: casinoReducer
});
