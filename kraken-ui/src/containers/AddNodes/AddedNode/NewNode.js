import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledItem,
  StyledItemHeader,
} from './styled';
import { Label } from './../../../components';

const NewNode = props => {
  const { nodeName } = props;
  return (
    <StyledItem>
      <StyledItemHeader>
        <Label>{ nodeName }</Label>
        <Label infoLabel>Node Added!</Label>
      </StyledItemHeader>
    </StyledItem>
  );
};

NewNode.propTypes = {
  nodeName: PropTypes.string.isRequired
};

export default NewNode;
