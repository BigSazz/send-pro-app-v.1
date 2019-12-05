import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAddress } from '../../actions/address';

const AddressItem = ({ address, deleteAddress }) => {
  return (
    <div className='row'>
      <div className='col-sm-3 py-1'>
        <div className='card' style={{ width: '20rem' }}>
          <div className='card-body'>
            <h1 className='card-title'>{address.friendly_name}</h1>
            <p className='card-text'>Street: {address.street}</p>
            <p className='card-text'>State: {address.state}</p>
            <p className='card-text'>Country: {address.country}</p>
            <div className='row'>
              <div className='col-6'>
                <Link to={`/address/${address.id}`}>
                  <button className='btn btn-outline-warning'>View</button>
                </Link>
              </div>
              <div className='col-6'>
                <input
                  type='button'
                  className='btn btn-danger'
                  value='Delete'
                  onClick={() => {
                    deleteAddress(address.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { deleteAddress })(AddressItem);
