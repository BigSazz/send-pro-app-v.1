import {
  GET_ALL_ADDRESSES,
  ADDRESS_ERROR,
  ADDRESSES_ERROR,
  NEW_ADDRESS,
  GET_ADDRESS,
  UPDATE_ADDRESS
} from '../actions/types';
const initialState = {
  address: null,
  addresses: [],
  filtered: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NEW_ADDRESS:
    case GET_ADDRESS:
      return {
        ...state,
        address: payload,
        loading: false
      };
    case GET_ALL_ADDRESSES:
      return {
        ...state,
        addresses: payload,
        loading: false
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: payload,
        loading: false
      };
    case ADDRESS_ERROR:
      return {
        ...state,
        address: null,
        loading: true
      };
    case ADDRESSES_ERROR:
      return {
        ...state,
        addresses: null,
        loading: true
      };
    default:
      return state;
  }
}
