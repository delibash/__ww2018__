import 'rxjs';
import 'rxjs/add/operator/mergeMap';
import api from './../../services/api';
import { nodeActions } from './../ducks/nodes';
import ACTION_TYPES from './../ducks/nodes/types';

const getOptionsRequestEpic = action$ => {
  return action$.ofType(ACTION_TYPES.GET_OPTIONS)
    .mergeMap(() => {
      return api.getOptions()
        .then(res => nodeActions.getOptionsSuccess(res.data))
        .catch(err => nodeActions.getOptionsFailure(err.data));
    });
};

const updateNodeEpic = action$ => {
  return action$.ofType(ACTION_TYPES.UPDATE_NODE)
    .mergeMap(() => {
      return api.saveNode()
        .then(res => ({type: 'UPDATE_NODE_SUCESS', res}))
        .catch(err => ({type: 'UPDATE_NODE_FAIL', err}));
    });
};

export {
  getOptionsRequestEpic,
  updateNodeEpic
};