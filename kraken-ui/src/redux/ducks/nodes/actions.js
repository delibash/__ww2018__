import ACTION_TYPES from './types';

const selectNode = selected => ({
  type: ACTION_TYPES.SELECT_NODE_TYPE,
  selected
});

const addSelectedNode = added => ({
  type: ACTION_TYPES.ADD_SELECTED_NODE,
  added
});

const connectNode = node => ({
  type: ACTION_TYPES.CONNECT_NODE,
  payload: {
    node
  }
});

const selectNewNode = payload => ({
  type: ACTION_TYPES.SELECT_NEW_NODE_TYPE,
  payload
});

const removeConnectedNode = payload => ({
  type: ACTION_TYPES.REMOVE_CONNECTED_NODE,
  payload
});

const updateNode = payload => ({
  type: ACTION_TYPES.UPDATE_NODE,
  payload
});

const showModal = () => ({
  type: ACTION_TYPES.SHOW_MODAL
});

const cancelModal = () => ({
  type: ACTION_TYPES.CANCEL_MODAL
});

const getOptionsRequest = () => ({
  type: ACTION_TYPES.GET_OPTIONS
});

const getOptionsSuccess = payload => ({
  type: ACTION_TYPES.GET_OPTIONS_SUCCESS,
  payload
});

const getOptionsFailure = payload => ({
  type: ACTION_TYPES.GET_OPTIONS_FAILURE,
  payload
});

export {
  selectNode,
  selectNewNode,
  addSelectedNode,
  connectNode,
  removeConnectedNode,
  updateNode,
  showModal,
  cancelModal,
  getOptionsRequest,
  getOptionsSuccess,
  getOptionsFailure,
};