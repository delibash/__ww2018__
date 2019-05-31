import React from 'react';
import PropTypes from 'prop-types';
import { SelectWrapper } from './../../../components';
import ConnectedNodesList from './ConnectedNodesList';
import {
  StyledConnectNode
} from './styled';

const options = [
  { label: 'Sales', value: 'Sales' },
  { label: 'Sales Representative', value: 'Sales Representative' },
  { label: 'Sales Manager', value: 'Sales Manager' },
];

const ConnectNode = ({ collection, ...props }) => {
  return (
    <StyledConnectNode>
      <h3>Connect <strong>{collection && collection.added && collection.added.nodeName}</strong> with {collection && collection.selected.value}:</h3>
      <p style={{fontSize: '1.3rem'}}>Are there existing {collection && collection.selected.value} that youd like to connect?</p>
      <SelectWrapper
        placeholder="Search Alternate Titltes Here"
        isSearchable={true}
        options={options}
        onChange={newNode => props.connectNode(newNode)}
      />
      <ConnectedNodesList {...props} {...collection && {...collection.added}}/>
    </StyledConnectNode>
  );
};

ConnectNode.propTypes = {
  collection: PropTypes.object,
  connectNode: PropTypes.func
};

export default ConnectNode;
