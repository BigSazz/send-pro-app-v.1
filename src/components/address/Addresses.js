import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Address = ({ address: { addresses, loading } }) => {
  return <div>My Addresses</div>;
};

Address.propTypes = {
  addresses: PropTypes.array
};

const mapStateToProps = state => ({
  address: state.address
});

export default connect(mapStateToProps)(Address);
