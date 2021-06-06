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

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ id });

  axios.post('/api/casino/slot', body, config)
  .then(res => 
    dispatch({
      type: SPIN_SUCCESS,
      payload: res.data
    })
  )
  .catch(err => {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'SPIN_FAIL')
    );
    dispatch({
      type: SPIN_FAIL
    });
  }) 
}