import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_SHIPMENT,
  CLEAR_ADDRESS
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/users/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({
  username,
  email,
  password,
  phone
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, email, password, phone });

  try {
    const res = await axios.post('/auth/local/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    if (err.response.data.statusCode === 400) {
      dispatch(
        setAlert('Refresh Page & Please fill in correct details', 'danger')
      );
    } else if (err.response.data.statusCode === 500) {
      dispatch(setAlert('Refresh page and try again', 'danger'));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (identifier, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ identifier, password });

  try {
    const res = await axios.post('/auth/local', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    if (err.response.data.statusCode === 400) {
      dispatch(
        setAlert('Invalid Credentials, Refresh Page & Try again', 'danger')
      );
    } else if (err.response.data.statusCode === 500) {
      dispatch(setAlert('Please refresh page', 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_ADDRESS });
  dispatch({ type: CLEAR_SHIPMENT });
  dispatch({ type: LOGOUT });
};
