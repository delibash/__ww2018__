import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './styled';

const Button = ({children, ...props}) => (
  <StyledButton
    {...props}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};

export default Button;
