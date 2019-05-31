import { connect } from 'react-redux';
import LogIn from './LogIn';

const mapActionsToProps = {};

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LogIn);
