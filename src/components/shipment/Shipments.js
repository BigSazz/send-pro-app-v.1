import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllShipments } from '../../actions/shipment';
import ShipmentItem from './ShipmentItem';
import Spinner from '../layout/Spinner';

class Shipment extends Component {
  componentDidMount() {
    this.props.getAllShipments(this.props.auth.user.id);
  }
  render() {
    const { shipments, loading } = this.props.shipment;
    let shipmentItem;

    if (shipments === null || loading) {
      shipmentItem = <Spinner />;
    } else {
      if (shipments.length > 0) {
        shipmentItem = shipments.map(shipment => (
          <ShipmentItem key={shipment.id} shipment={shipment} />
        ));
      } else {
        shipmentItem = <h4>You have no shipment....</h4>;
      }
    }

    return (
      <div>
        <div>
          <h1>My Shipments</h1>
          <Link to='/add-shipment'>
            <button className='btn btn-primary'>Add Shipment</button>
          </Link>
        </div>
        <div className='py-4 address-grid'>{shipmentItem}</div>
      </div>
    );
  }
}

Shipment.propTypes = {
  shipment: PropTypes.object,
  auth: PropTypes.object,
  getAllShipments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  shipment: state.shipment
});

export default connect(mapStateToProps, { getAllShipments })(Shipment);
