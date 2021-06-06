import {
  SPIN_LOADING,
  SPIN_SUCCESS,
  SPIN_FAIL
} from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const spin = () => (dispatch, getState) => {
  // Spin loading
  dispatch({type: SPIN_LOADING});

  axios
      .get('/api/casino/slot', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: SPIN_SUCCESS,
          payload: res.data,
        }))
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: SPIN_FAIL,
      });
    })


}