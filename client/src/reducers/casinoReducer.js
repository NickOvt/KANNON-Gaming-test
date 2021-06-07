import {
  SPIN_LOADING,
  SPIN_SUCCESS,
  SPIN_FAIL,
  GET_CASINO_COINS,
} from '../actions/types';

const initialState = {
  isLoading: null,
  coinsTotal: 0,
  coinsWon: 0,
  spinResult: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
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
        isLoading: false,
      };
    case GET_CASINO_COINS: {
      return {
        ...state,
        coinsTotal: action.payload.coins,
      };
    }
    default:
      return state;
  }
}
