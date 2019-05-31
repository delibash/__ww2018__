import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { colors } from './../../global/constants';

const customStyles = {
  control: (base, state) => ({
    ...base,
    cursor: 'pointer',
    borderRadius: '.3rem',
    boxShadow: state.isFocused ? 'none' : 'none',
    borderColor: state.isFocused ? `${colors.BLUE}` : `${colors.GRAY}` 
  }),
  option: (base, state) => ({
    ...base,
    color: state.isFocused ? `${colors.WHITE}` : state.color,
    backgroundColor: state.isFocused ? `${colors.BLUE}` : `${colors.WHITE}`,
  }),
  menu: base => ({
    ...base,
    borderRadius: 'none',
  })
};

const SelectWrapper = props => <Select styles={customStyles} {...props} />;

SelectWrapper.propTypes = {
  isDisabled: PropTypes.bool,
  styles: PropTypes.object,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired
};

export default SelectWrapper;
