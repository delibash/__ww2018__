import React from 'react';
import PropTypes from 'prop-types';
import { Label, List } from './../../../components/';
import { StyledItemInfoList, StyledItemInfo } from './styled';

const SearchItemInfo = ({results, collection}) => {
  const { searchNodeInfoID } = collection;
  return (
    <StyledItemInfo>
      <Label blueLabel style={{display: 'inline-block'}}>{results[searchNodeInfoID].name}</Label>
      <p>
        Node Type: <strong>{results[searchNodeInfoID].type}</strong>
      </p>
      <p>
        Node ID: <strong>{results[searchNodeInfoID].id}</strong>
      </p>
      <p>Associated Measures:</p>
      <List
        list={results[searchNodeInfoID].vocabulary_types}
        styled={StyledItemInfoList}
        wrapper={Label}
      />
    </StyledItemInfo>
  );
};

SearchItemInfo.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  collection: PropTypes.object
};

export { SearchItemInfo };