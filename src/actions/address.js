import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_ADDRESS,
  NEW_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  ADDRESS_ERROR,
  GET_ALL_ADDRESSES,
  ADDRESSES_ERROR,
  FILTER_ADDRESS,
  CLEAR_FILTER
} from './types';

// Get an address
export const getAddress = id => async dispatch => {
  try {
    const res = await axios.get(`/addresses/${id}`);
    dispatch({
      type: GET_ADDRESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR
    });
  }
};

// Get all addresses
export const getAllAddresses = id => async dispatch => {
  try {
    const res = await axios.get(`/addresses?user=${id}`);

    dispatch({
      type: GET_ALL_ADDRESSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADDRESSES_ERROR
    });
  }
};

// Add Address
export const addNewAddress = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const res = await axios.post('/addresses', formData, config);

    dispatch({
      type: NEW_ADDRESS,
      payload: res.data
    });

    dispatch(setAlert('Address Created', 'success'));

    history.push('/addresses');
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR
    });
  }
};

// Edit Address
export const updateAddress = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/addresses/${id}`, formData, config);
    dispatch({ type: UPDATE_ADDRESS, payload: res.data });
    dispatch(setAlert('Address Updated', 'success'));

    history.push('/addresses');
  } catch (err) {
    dispatch({ type: ADDRESS_ERROR });
  }
};

// Delete an Address
export const deleteAddress = id => async dispatch => {
  try {
    await axios.delete(`/addresses/${id}`);
    dispatch({
      type: DELETE_ADDRESS
    });
    dispatch(setAlert('Address Deleted', 'success'));
    // history.push('/addresses');
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR
    });
  }
};

// Filter Addresses
export const filterAddress = text => dispatch => {
  dispatch({ type: FILTER_ADDRESS, payload: text });
};

// Clear Filter
export const clearFilter = () => dispatch => {
  dispatch({ type: CLEAR_FILTER });
};
