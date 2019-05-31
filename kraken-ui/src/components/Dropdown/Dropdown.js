import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import { StyledDropdown } from './styled';
import { SVGIcons } from './../../global/constants';

const DropdownOption = ({value, label}) => <option value={value}>{label}</option>;

const Dropdown = ({options, ...props}) => {
  return (
    <StyledDropdown>
      <select
        onChange={props.onChange}
      >
        {options && options.map((opt, i) => <DropdownOption key={i} {...opt} />)}
      </select>
      <InlineSVG src={SVGIcons.arrowDown} />
    </StyledDropdown>
  );
};

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]))
};

DropdownOption.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  label: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default Dropdown;
