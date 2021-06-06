import { SPIN_LOADING, SPIN_SUCCESS, SPIN_FAIL, GET_CASINO_COINS } from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';
import { tokenConfig } from './authActions';

// Check token and load coins
export const loadCoins = () => (dispatch, getState) => {
  // Coins loading
  dispatch({ type: SPIN_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_CASINO_COINS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: SPIN_FAIL,
      });
    });
};

export const spin = () => (dispatch, getState) => {
  // Spin loading
  dispatch({ type: SPIN_LOADING });

  axios
    .get('/api/casino/slot', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SPIN_SUCCESS,
        payload: res.data,
      })
    }
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, 'SPIN_FAIL'));
      dispatch({
        type: SPIN_FAIL,
      });
    });
};
