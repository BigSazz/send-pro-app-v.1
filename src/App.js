import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Addresses from './components/address/Addresses';
import AddAddressForm from './components/address/address-forms/AddAddressForm';
import EditAddressForm from './components/address/address-forms/EditAddressForm';
import ViewAddressForm from './components/address/address-forms/ViewAddressForm';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//Styling
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/addresses' component={Addresses} />
              <PrivateRoute
                exact
                path='/add-address'
                component={AddAddressForm}
              />
              <PrivateRoute
                exact
                path='/address/:id'
                component={ViewAddressForm}
              />
              <PrivateRoute
                exact
                path='/edit-address/:id'
                component={EditAddressForm}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
