import React, { PureComponent } from 'react';
import { StyledGrid } from './../../global/styles';
import { gridProps, gridColumns } from './styled';
import { StyledComponent, Wrapper } from './../../components/';
import StyledWrappers from './../../components/WrapperComponent/styled';
import { SearchItemInfo, SearchSelectors, SearchResults, SearchEdges } from './SearchList';

const Card = StyledComponent(Wrapper);

const cardPosition = {
  position: 'absolute',
  top: '10rem',
  width: '80%',
  left: '2%',
};

class Search extends PureComponent {
  constructor (props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }

  escFunction (e) {
    e.keyCode === 27 && this.props.ui.searchNodeInfoModal && this.props.escModal();
  }

  componentDidMount () {
    this.props.getEdgeTypes();
    this.props.getVocabularyTypes();
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render () {
    const {
      ui
    } = this.props;

    const {
      searchSelectors,
      searchResults,
      searchNodeInfoModal,
      searchEdges
    } = ui;

    return (
      <StyledGrid
        {...gridProps}
        {...searchSelectors && {...gridColumns}}
        {...searchResults && {...gridColumns}}
        {...searchEdges && {...gridColumns}}
      >
        {searchSelectors && <SearchSelectors {...this.props} />}
        {searchResults && <SearchResults {...this.props} />}
        {searchEdges && <SearchEdges {...this.props} />}
        {searchNodeInfoModal &&
          <Card style={cardPosition} styledtype={StyledWrappers.StyledCard}>
            <SearchItemInfo {...this.props} />
          </Card>}
      </StyledGrid>
    );
  }
}

Search.propTypes = {};

export default Search;
