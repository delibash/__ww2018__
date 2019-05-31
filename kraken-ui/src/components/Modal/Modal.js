import React from 'react';
import PropTypes from 'prop-types';
import { StyledModal } from './styled';

const Modal = ({children, ...props}) => (
  <StyledModal
    {...props}
  >
    {children}
  </StyledModal>
);

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.node
  ]).isRequired
};

export default Modal;
