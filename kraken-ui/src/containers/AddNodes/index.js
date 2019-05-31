import { connect } from 'react-redux';
import AddNodes from './AddNodes';
import {
  nodeActions,
  nodeSelectors
} from './../../redux/ducks/nodes';

const mapActionsToProps = { ...nodeActions };

const mapStateToProps = state => ({
  collection: nodeSelectors.getCollection(state),
  ui: nodeSelectors.getUI(state),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddNodes);
