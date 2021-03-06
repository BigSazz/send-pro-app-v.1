import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllAddresses } from '../../actions/address';
import AddressItem from './AddressItem';
import Spinner from '../layout/Spinner';

class Address extends Component {
  componentDidMount() {
    this.props.getAllAddresses(this.props.auth.user.id);
  }
  render() {
    const { addresses, loading } = this.props.address;
    let addressItem;

    if (addresses === null || loading) {
      addressItem = <Spinner />;
    } else {
      if (addresses.length > 0) {
        addressItem = addresses.map(address => (
          <AddressItem key={address.id} address={address} />
        ));
      } else {
        addressItem = <h4>You have no address saved....</h4>;
      }
    }

    return (
      <div>
        <div>
          <h1>My Addresses</h1>
          <Link to='/add-address'>
            <button className='btn btn-primary'>Add Address</button>
          </Link>
        </div>
        <div className='py-4 address-grid'>{addressItem}</div>
      </div>
    );
  }
}

Address.propTypes = {
  address: PropTypes.object,
  auth: PropTypes.object,
  getAllAddresses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  address: state.address
});

export default connect(mapStateToProps, { getAllAddresses })(Address);
