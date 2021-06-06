import {
  SPIN_LOADING,
  SPIN_SUCCESS,
  SPIN_FAIL
} from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const spin = (id) => (dispatch) => {
  // Spin loading
  dispatch({type: SPIN_LOADING});
  console.log(id);

  axios.post('/api/casino/slot')
}