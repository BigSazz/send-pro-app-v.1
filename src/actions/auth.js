import axios from 'axios';
// import { setAlert } from './alert';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
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
    console.log(err.response.data.message);
    // const errors = err.response.data.message;

    // if (errors) {
    //   errors.forEach(error =>
    //     dispatch(setAlert(error.messages.message, 'danger'))
    //   );
    // }

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
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data.message);
    // const errors = err.response

    // if (errors) {
    //   errors.forEach(error =>
    //     dispatch(setAlert(error.messages.message, 'danger'))
    //   );
    // }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
