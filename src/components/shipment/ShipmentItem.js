import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteShipment } from '../../actions/shipment';

const ShipmentItem = ({ shipment, deleteShipment }) => {
  return (
    <div className='row'>
      <div className='col-sm-3 py-1'>
        <div className='card' style={{ width: '20rem' }}>
          <div className='card-body'>
            <h3 className='card-title text-primary'>
              Courier: {shipment.courier.name}
            </h3>
            <p className='card-text'>Sender: {shipment.origin.name}</p>
            <p className='card-text'>Street: {shipment.origin.street}</p>
            <p className='card-text'>Country: {shipment.origin.country}</p>
            <p className='card-text'>Receiver: {shipment.destination.name}</p>
            <p className='card-text'>Street: {shipment.destination.street}</p>
            <p className='card-text'>Country: {shipment.destination.country}</p>
            <div className='row'>
              <div className='col-6'>
                <Link to={`/shipment/${shipment.id}`}>
                  <button className='btn btn-outline-warning'>View</button>
                </Link>
              </div>
              <div className='col-6'>
                <input
                  type='button'
                  className='btn btn-danger'
                  value='Delete'
                  onClick={() => {
                    deleteShipment(shipment.id);
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

export default connect(null, { deleteShipment })(ShipmentItem);
