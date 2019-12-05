import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterAddress, clearFilter } from '../../actions/address';

const AddressFilter = ({ filtered, filterAddress, clearFilter }) => {
  const [formData, setFormData] = useState({
    text: ''
  });

  const { text } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: filterAddress(e.target.value)
    });
  };

  return (
    <form className='form py-2'>
      <input
        type='text'
        name='text'
        placeholder='Search Address...'
        value={text}
        onChange={e => onChange(e)}
      />
    </form>
  );
};

AddressFilter.propTypes = {
  filterAddress: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filtered: state.address.filtered
});

export default connect(mapStateToProps, { filterAddress, clearFilter })(
  AddressFilter
);
