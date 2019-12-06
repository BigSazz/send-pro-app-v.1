import axios from 'axios';
import { setAlert } from './alert';

import {
  NEW_SHIPMENT,
  GET_SHIPMENT,
  GET_ALL_SHIPMENTS,
  UPDATE_SHIPMENT,
  DELETE_SHIPMENT,
  SHIPMENT_ERROR,
  SHIPMENTS_ERROR
} from './types';

// Get a shipment
export const getShipment = id => async dispatch => {
  try {
    const res = await axios.get(`/shipments/${id}`);
    dispatch({
      type: GET_SHIPMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHIPMENT_ERROR
    });
  }
};

// Get all Shipments
export const getAllShipments = id => async dispatch => {
  try {
    const res = await axios.get(`/shipments?user=${id}`);

    dispatch({
      type: GET_ALL_SHIPMENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHIPMENTS_ERROR
    });
  }
};

// Add Shipment
export const addNewShipment = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const res = await axios.post('/shipments', formData, config);

    dispatch({
      type: NEW_SHIPMENT,
      payload: res.data
    });

    dispatch(setAlert('Shipment Created', 'success'));

    history.push('/shipments');
  } catch (err) {
    dispatch({
      type: SHIPMENT_ERROR
    });
  }
};

// Update Shipment
export const updateShipment = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/shipments/${id}`, formData, config);
    dispatch({ type: UPDATE_SHIPMENT, payload: res.data });
    dispatch(setAlert('Shipment Updated', 'success'));

    history.push('/shipments');
  } catch (err) {
    dispatch({ type: SHIPMENT_ERROR });
  }
};

// Delete Shipment
export const deleteShipment = id => async dispatch => {
  try {
    await axios.delete(`/shipments/${id}`);
    dispatch({
      type: DELETE_SHIPMENT
    });
    dispatch(setAlert('Shipment Deleted', 'success'), window.location.reload());
  } catch (err) {
    dispatch({
      type: SHIPMENT_ERROR
    });
  }
};
