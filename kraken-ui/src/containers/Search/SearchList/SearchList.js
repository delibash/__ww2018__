import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchListItem,
  StyledSearchList,
  StyledSearchKeys,
  StyledDeck,
  StyledLabel
} from './styled';

import {
  Label,
  Dropdown,
} from './../../../components';

const filterOptions = [
  {value: 10, label: 10},
  {value: 25, label: 25},
  {value: 50, label: 50},
  {value: 75, label: 75},
  {value: 100, label: 100},
];

const SearchListItem = ({item, ...props}) => {
  return (
    <StyledSearchListItem {...props}>
      <StyledLabel>{item.name}</StyledLabel>
      <Label infoLabel>{item.source}</Label>
    </StyledSearchListItem>
  );
};

const SearchList = ({results, history, deck, ...props}) => {
  const handleClick = id => e => (
    e.currentTarget === e.target ?
      props.onSearchNodeClick() : props.onSearchNodeTextClick(id)
  );
  return (
    <>
    {deck &&
    <StyledDeck>
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
        <p>Results ({results && results.length})</p>
      </StyledSearchKeys>
      <Dropdown
        options={filterOptions}
        onChange={e => props.selectSearchListSize(+e.target.value)}
      />
    </StyledDeck>}
    <StyledSearchList>
      {results && results.map((item, i) => {
        return (
          <SearchListItem
            key={i}
            item={item}
            onClick={handleClick(i)}
          />
        );
      })}
    </StyledSearchList>
    </>
  );
};

SearchList.propTypes = {
  results: PropTypes.array,
  history: PropTypes.array,
  deck: PropTypes.bool
};

SearchListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.object
};

export {
  SearchListItem
};

export default SearchList;