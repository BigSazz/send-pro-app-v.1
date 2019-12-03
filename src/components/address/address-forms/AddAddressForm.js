import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addNewAddress } from '../../../actions/address';

const AddAddressForm = ({ addNewAddress, loggedUser, history }) => {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    email: '',
    friendly_name: '',
    user: ''
  });

  const { street, city, state, country, email, friendly_name, user } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addNewAddress(formData, history);
    console.log(formData);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Address</h1>
      <p className='lead'>
        <i className='far fa-address-card'></i> Add Address
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Street'
            name='street'
            value={street}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='City'
            name='city'
            onChange={e => onChange(e)}
            value={city}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='State'
            name='state'
            onChange={e => onChange(e)}
            value={state}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Country'
            name='country'
            value={country}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Enter Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Friendly Name'
            name='friendly_name'
            value={friendly_name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='user'
            name='user'
            value={user}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Save' />
      </form>
    </Fragment>
  );
};

AddAddressForm.propTypes = {
  // setAlert: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  addNewAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loggedUser: state.auth.user
});

export default connect(mapStateToProps, { addNewAddress })(
  withRouter(AddAddressForm)
);
