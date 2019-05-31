import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput, StyledSearchButton, StyledLabel } from './styled';
import InlineSVG from 'svg-inline-react';
import { SVGIcons } from './../../global/constants';

const Input = ({type, disabled, ...props}) => (
  type === 'search' ? 
    <StyledLabel htmlFor={props.id}>
      <StyledInput {...props} />
      <StyledSearchButton
        type="submit"
        disabled={disabled}
      >
        <InlineSVG src={SVGIcons.search} />
      </StyledSearchButton>
    </StyledLabel>
    :
    <StyledInput type={type} {...props} />
);

Input.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Input;
