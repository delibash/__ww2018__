import React from 'react';
import PropTypes from 'prop-types';
import { StyledHeader, StyledContent } from './styled';

const Panel = ({children, ...props}) => {
  return (
    <>
      <StyledHeader>{props.header}</StyledHeader>
      <StyledContent>{children}</StyledContent>
    </>
  );
};

Panel.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired
};

export default Panel;