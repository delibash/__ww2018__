import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledLabel,
  StyledInfoLabel,
  StyledNodeLabel,
  StyledBlueLabel
} from './styled';

const Label = ({children, ...props}) => {
  return (
    <StyledLabel
      {...props.blueLabel && StyledBlueLabel}
      {...props.infoLabel && StyledInfoLabel}
      {...props.nodeLabel && StyledNodeLabel}
      {...props}
    >
      {children}
    </StyledLabel>
  );
};

Label.propTypes = {
  children: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.node
    ]
  ),
  infoLabel: PropTypes.bool,
  nodeLabel: PropTypes.bool
};

export default Label;
