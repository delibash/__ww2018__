import ACTION_TYPES from './types';
import { combineReducers } from 'redux';
import { createReducer } from './../../utils';

const collectionState = {
  selected: '',
  added: {
    selectedTitle: '',
    nondeName: '',
    connectedNodes: []
  },
  selectOptions: []
};

const collectionReducer = createReducer(collectionState)({
  [ACTION_TYPES.GET_OPTIONS_SUCCESS]: (state, action) => {
    return {...state, selectOptions: action.payload};
  },
  [ACTION_TYPES.GET_OPTIONS_FAILURE]: (state, action) => {
    return {...state, selectOptions: action.payload};
  },
  [ACTION_TYPES.SELECT_NODE_TYPE]: (state, action) => {
    const { selected } = action;
    return { ...state, selected: selected.value };
  },
  [ACTION_TYPES.ADD_SELECTED_NODE]: (state, action) => {
    const { added } = action;
    return { ...state, added: {
      ...added,
      connectedNodes: []
    } };
  },
  [ACTION_TYPES.SELECT_NEW_NODE_TYPE]: () => {
    return collectionState;
  },
  [ACTION_TYPES.CONNECT_NODE]: (state, action) => {
    const {
      payload
    } = action;

    return {
      ...state,
      added: {
        ...state.added,
        connectedNodes: [
          ...state.added.connectedNodes,
          payload.node
        ].filter((el, pos, arr) => arr.indexOf(el) === pos && payload.node)
      }
    };
  },
  [ACTION_TYPES.REMOVE_CONNECTED_NODE]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      added: {
        ...state.added,
        connectedNodes: [
          ...state.added.connectedNodes
        ].filter((_, i) => i !== payload)
      }
    };
  }
});

const uiReducer = createReducer({
  nodeAdded: false,
  nodeTypeSelected: false,
  nodeUpdateDisabled: true,
  nodeConnected: false,
  showModal: false
})({
  [ACTION_TYPES.SHOW_MODAL]: state => {
    return { ...state, showModal: true };
  },
  [ACTION_TYPES.CANCEL_MODAL]: state => {
    return { ...state, showModal: false };
  },
  [ACTION_TYPES.SELECT_NODE_TYPE]: state => {
    return { ...state, nodeTypeSelected: true };
  },
  [ACTION_TYPES.SELECT_NEW_NODE_TYPE]: state => {
    return {
      ...state,
      nodeTypeSelected: false,
      nodeAdded: false,
      showModal: false,
      nodeUpdateDisabled: true
    };
  },
  [ACTION_TYPES.ADD_SELECTED_NODE]: state => {
    return { ...state, nodeAdded: true };
  },
  [ACTION_TYPES.CONNECT_NODE]: state => {
    return { ...state, nodeConnected: true, nodeUpdateDisabled: false };
  },
  [ACTION_TYPES.UPDATE_NODE]: state => {
    return { ...state, nodeUpdateDisabled: false };
  }
});

export default combineReducers({
  collection: collectionReducer,
  ui: uiReducer,
});
