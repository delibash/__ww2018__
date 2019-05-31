import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({children, ...props}) => {
  return (
    <props.styledtype
      {...props}
    >
      {children}
    </props.styledtype>
  );
};

Wrapper.propTypes = {
  styledtype: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element
  ])
};

export default Wrapper;