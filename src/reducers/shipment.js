import {
  GET_SHIPMENT,
  GET_ALL_SHIPMENTS,
  NEW_SHIPMENT,
  UPDATE_SHIPMENT,
  DELETE_SHIPMENT,
  SHIPMENT_ERROR,
  SHIPMENTS_ERROR,
  CLEAR_SHIPMENT
} from '../actions/types';

const initialState = {
  shipment: null,
  shipments: [],
  filtered: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SHIPMENT:
    case NEW_SHIPMENT:
      return {
        ...state,
        shipment: payload,
        loading: false
      };
    case GET_ALL_SHIPMENTS:
      return {
        ...state,
        shipments: payload,
        loading: false
      };
    case UPDATE_SHIPMENT:
      return {
        ...state,
        shipment: payload,
        loading: false
      };
    case DELETE_SHIPMENT:
      return {
        ...state,
        shipment: null,
        loading: true
      };
    case SHIPMENT_ERROR:
      return {
        ...state,
        shipment: null,
        loading: true
      };
    case SHIPMENTS_ERROR:
      return {
        ...state,
        shipments: null,
        loading: true
      };
    case CLEAR_SHIPMENT:
      return {
        ...state,
        shipment: null,
        shipments: [],
        loading: true
      };
    default:
      return state;
  }
}
