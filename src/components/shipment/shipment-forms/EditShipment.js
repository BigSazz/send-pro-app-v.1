import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getShipment, updateShipment } from '../../../actions/shipment';

const EditShipment = ({
  getShipment,
  updateShipment,
  shipment: { shipment, loading },
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    origin: {
      city: '',
      name: '',
      phone: '',
      state: '',
      street: '',
      country: ''
    },
    destination: {
      city: '',
      name: '',
      phone: '',
      state: '',
      street: '',
      country: ''
    },
    courier: '',
    item: {
      quantity: '',
      description: ''
    },
    weight: ''
  });

  useEffect(() => {
    getShipment(match.params.id);

    setFormData({
      origin: {
        city: loading || !shipment.origin.city ? '' : shipment.origin.city,
        name: loading || !shipment.origin.name ? '' : shipment.origin.name,
        phone: loading || !shipment.origin.phone ? '' : shipment.origin.phone,
        state: loading || !shipment.origin.state ? '' : shipment.origin.state,
        street:
          loading || !shipment.origin.street ? '' : shipment.origin.street,
        country:
          loading || !shipment.origin.country ? '' : shipment.origin.country
      },
      destination: {
        city:
          loading || !shipment.destination.city
            ? ''
            : shipment.destination.city,
        name:
          loading || !shipment.destination.name
            ? ''
            : shipment.destination.name,
        phone:
          loading || !shipment.destination.phone
            ? ''
            : shipment.destination.phone,
        state:
          loading || !shipment.destination.state
            ? ''
            : shipment.destination.state,
        street:
          loading || !shipment.destination.street
            ? ''
            : shipment.destination.street,
        country:
          loading || !shipment.destination.country
            ? ''
            : shipment.destination.country
      },
      courier: loading || !shipment.courier.id ? '' : shipment.courier.id,
      item: {
        quantity:
          loading || !shipment.item.quantity ? '' : shipment.item.quantity,
        description:
          loading || !shipment.item.description ? '' : shipment.item.description
      },
      weight: loading || !shipment.weight ? '' : shipment.weight
    });

    //eslint-disable-next-line
  }, [loading]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onNestedChange = e => {
    const parent = e.target.name.split('.', 2)[0];
    const child = e.target.name.split('.', 2)[1];
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [child]: e.target.value
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateShipment(match.params.id, formData, history);
    // console.log(formData);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Shipment</h1>
      <p className='lead'>
        <i className='far fa-address-card'></i> Edit Shipment
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <h1>Origin:</h1>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Origin City'
            name='origin.city'
            value={formData.origin.city}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name of Sender'
            name='origin.name'
            onChange={e => onNestedChange(e)}
            value={formData.origin.name}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Phone Number'
            name='origin.phone'
            onChange={e => onNestedChange(e)}
            value={formData.origin.phone}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='State'
            name='origin.state'
            value={formData.origin.state}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Street'
            name='origin.street'
            value={formData.origin.street}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Country'
            name='origin.country'
            value={formData.origin.country}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <h1>Destination:</h1>
        <div className='form-group'>
          <input
            type='text'
            placeholder='City'
            name='destination.city'
            value={formData.destination.city}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name of Recipient'
            name='destination.name'
            onChange={e => onNestedChange(e)}
            value={formData.destination.name}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Phone Number'
            name='destination.phone'
            onChange={e => onNestedChange(e)}
            value={formData.destination.phone}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='State'
            name='destination.state'
            value={formData.destination.state}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Street'
            name='destination.street'
            value={formData.destination.street}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Country'
            name='destination.country'
            value={formData.destination.country}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <h1>Courier:</h1>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Courier'
            name='courier'
            value={formData.courier}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Type 1 for DHL</small>
          <small className='form-text'>Type 2 for FedEX</small>
        </div>
        <h1>Items:</h1>
        <div className='form-group'>
          <input
            type='text'
            placeholder='quantity'
            name='item.quantity'
            value={formData.item.quantity}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Description'
            name='item.description'
            value={formData.item.description}
            onChange={e => onNestedChange(e)}
          />
        </div>
        <h1>weight:</h1>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Weight'
            name='weight'
            value={formData.weight}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Save' />
      </form>
    </Fragment>
  );
};

EditShipment.propTypes = {
  updateShipment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  shipment: state.shipment
});

export default connect(mapStateToProps, { getShipment, updateShipment })(
  withRouter(EditShipment)
);
