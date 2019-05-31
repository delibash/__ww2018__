import { connect } from 'react-redux';
import Search from './Search';
import {
  searchActions,
  searchSelectors,
} from './../../redux/ducks/search';

const mapActionsToProps = { ...searchActions };

const mapStateToProps = state => ({
  collection: searchSelectors.getReducedCollection(state),
  ui: searchSelectors.getSearchUI(state),
  history: searchSelectors.getHistory(state),
  results: searchSelectors.getResults(state),
  edges: searchSelectors.getEdges(state)
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Search);
