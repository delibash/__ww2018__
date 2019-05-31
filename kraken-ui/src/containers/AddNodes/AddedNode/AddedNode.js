import React from 'react';
import PropTypes from 'prop-types';
import NewNode from './NewNode';
import {
  StyledContainer,
} from './styled';

const AddedNode = props => {
  const {
    added
  } = props;
  
  return (
    <StyledContainer>
      <NewNode {...added} />
    </StyledContainer>
  );
};

AddedNode.propTypes = {
  added: PropTypes.object
};

export default AddedNode;