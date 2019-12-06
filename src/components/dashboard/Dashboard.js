import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import Spinner from '../layout/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    const { user, loading } = this.props.auth;

    return loading && user === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <h1 className='x-large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome{' '}
          <span className='text-primary'>{user.username}</span>
        </p>
        <Fragment>
          <div className='card m-5'>
            <div className='card-body'>
              <p className='large'>
                Click here to view all your saved addresses
              </p>
              <Link to='addresses' className='btn btn-primary my-1'>
                My Addresses
              </Link>
            </div>
          </div>
        </Fragment>
        <Fragment>
          <div className='card m-5'>
            <div className='card-body'>
              <p className='large'>
                Click here to view all your saved shipments
              </p>
              <Link to='shipments' className='btn btn-primary my-1'>
                My Shipments
              </Link>
            </div>
          </div>
        </Fragment>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
