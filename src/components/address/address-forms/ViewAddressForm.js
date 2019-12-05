import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAddress } from '../../../actions/address';

const ViewAddressForm = ({
  getAddress,
  address: { address, loading },
  match,
  history
}) => {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    email: '',
    friendly_name: ''
  });

  useEffect(() => {
    getAddress(match.params.id);

    setFormData({
      street: loading || !address.street ? '' : address.street,
      city: loading || !address.city ? '' : address.city,
      state: loading || !address.state ? '' : address.state,
      country: loading || !address.country ? '' : address.country,
      email: loading || !address.email ? '' : address.email,
      friendly_name:
        loading || !address.friendly_name ? '' : address.friendly_name
    });

    //eslint-disable-next-line
  }, [loading]);

  const { street, city, state, country, email, friendly_name } = formData;

  return (
    <Fragment>
      <h1 className='large text-primary'>Address</h1>
      <p className='lead'>
        <i className='far fa-address-card'></i> View Address
      </p>
      <form className='form'>
        <div className='form-group'>
          <label>Street</label>
          <input
            type='text'
            placeholder='Street'
            name='street'
            value={street}
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>City</label>
          <input
            type='text'
            placeholder='City'
            name='city'
            value={city}
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>State</label>
          <input
            type='text'
            placeholder='State'
            name='state'
            value={state}
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>Country</label>
          <input
            type='text'
            placeholder='Country'
            name='country'
            value={country}
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>Email Address</label>
          <input
            type='email'
            placeholder='Enter Email'
            name='email'
            value={email}
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>Friendly Name</label>
          <input
            type='text'
            placeholder='Friendly Name'
            name='friendly_name'
            value={friendly_name}
            readOnly
          />
        </div>
        <Link to={`/edit-address/${match.params.id}`}>
          <button type='button' className='btn btn-outline-success'>
            Edit
          </button>
        </Link>
      </form>
    </Fragment>
  );
};

ViewAddressForm.propTypes = {
  address: PropTypes.object,
  getAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  address: state.address
});

export default connect(mapStateToProps, { getAddress })(
  withRouter(ViewAddressForm)
);
