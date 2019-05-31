import React from 'react';
import PropTypes from 'prop-types';

const StyledComponent = Component => {
  return function WithStyledComponent ({children, ...props}) {
    return <Component {...props}>{children}</Component>;
  };
};

StyledComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element
  ])
};

export {
  StyledComponent
};