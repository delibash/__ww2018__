import React from 'react';
import PropTypes from 'prop-types';
import SearchList from './SearchList';
import { SelectWrapper, StyledComponent, Wrapper, Dropdown, Input } from './../../../components/';
import StyledWrappers from './../../../components/WrapperComponent/styled';
import { colors } from './../../../global/constants';
import { StyledGrid } from './../../../global/styles';
import {
  StyledForm,
  StyledSearchKeys,
  StyledLabel,
} from './styled';

const filterOptions = [
  {value: 10, label: 10},
  {value: 25, label: 25},
  {value: 50, label: 50},
  {value: 75, label: 75},
  {value: 100, label: 100},
];

const Card = StyledComponent(Wrapper);

const toggle = {
  cursor: 'pointer',
  position: 'absolute',
  right: 0,
  top: '-4rem',
  fontWeight: 600,
  color: `${colors.BLUE}`
};

const SearchSelectors = ({collection, ui, ...props}) => (
  <StyledForm onSubmit={e => {
    e.preventDefault();
    props.onSubmitSearch(collection);
  }}>
    <Input
      onChange={e => props.onChangeSearchVal(e.target.value)}
      placeholder='Search KG'
      type='search'
      id='search-KG'
      disabled={ui.onSearchValueChange}
    />
    <SelectWrapper
      placeholder='Type of Node'
      options={collection.vocabularyTypes}
      onChange={newNode => props.selectNodeType(newNode)}
    />
  </StyledForm>
);

const SearchResults = ({startNewSearch, ...props}) => {
  return (
    <>
    <span
      onClick={() => startNewSearch()}
      style={toggle}
    >
      Start New Search
    </span>
    <Card
      styledtype={StyledWrappers.StyledCard}
      style={{minHeight: '90vh'}}
    >
      <SearchList deck={true} {...props} />
    </Card>
    </>
  );
};

const SearchEdges = ({history, collection, results, ...props}) => {
  return (
    <>
    <span
      onClick={() => props.startNewSearch()}
      style={toggle}
    >
      Start New Search
    </span>
    <Card
      styledtype={StyledWrappers.StyledCard}
      style={{minHeight: '90vh'}}
    >
      <StyledSearchKeys>
        {history && history.map((v, i) => {
          return (
            <p key={i}>
              <span>
                {v.value}
                {v.searchNodeType.length > 0 && ` / ${v.searchNodeType}`}
              </span>
            </p>
          );
        })}
      </StyledSearchKeys>
      <StyledLabel>{results[collection.searchNodeInfoID].name}</StyledLabel>
      <StyledGrid
        grid
        gridGap='1rem'
        templateColumns='1fr 10rem'
        style={{margin: '1rem 0'}}
      >
        <SelectWrapper
          placeholder='Search Edges'
          options={collection.edgeTypes}
          onChange={newNode => props.selectEdges(newNode)}
        />
        <Dropdown
          options={filterOptions}
          onChange={() => {}}
        />
      </StyledGrid>
      <SearchList deck={false} results={results} {...props} />
    </Card>
    </>
  );
};

SearchSelectors.propTypes = {
  ui: PropTypes.object,
  collection: PropTypes.object,
  onChangeSearchVal: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  selectNodeType: PropTypes.func
};

SearchResults.propTypes = {
  startNewSearch: PropTypes.func
};

SearchEdges.propTypes = {
  collection: PropTypes.object,
  history: PropTypes.arrayOf(PropTypes.object)
};

export {
  SearchSelectors,
  SearchResults,
  SearchEdges
};
