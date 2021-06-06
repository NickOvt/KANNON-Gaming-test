import {
  SPIN_LOADING,
  SPIN_SUCCESS,
  SPIN_FAIL
} from '../actions/types';

const initialState = {
  coins: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SPIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SPIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case SPIN_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}