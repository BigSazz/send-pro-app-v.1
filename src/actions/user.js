import axios from 'axios';

import { GET_USER, USER_ERROR } from './types';

// Get current User
export const getUser = () => async dispatch => {
  try {
    const res = await axios.get('/users/me');

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
};
