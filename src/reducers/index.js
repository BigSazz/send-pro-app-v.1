import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import address from './address';

export default combineReducers({
  alert,
  auth,
  user,
  address
});
