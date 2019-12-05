import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAddress, updateAddress } from '../../../actions/address';

const EditAddressForm = ({
  getAddress,
  updateAddress,
  address: { address, loading },
  history,
  match
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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateAddress(match.params.id, formData, history);
    // console.log(formData);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Address</h1>
      <p className='lead'>
        <i className='far fa-address-card'></i> Edit Address
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
        <input type='submit' className='btn btn-primary' value='Save' />
      </form>
    </Fragment>
  );
};

EditAddressForm.propTypes = {
  updateAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  address: state.address
});

export default connect(mapStateToProps, { getAddress, updateAddress })(
  withRouter(EditAddressForm)
);
