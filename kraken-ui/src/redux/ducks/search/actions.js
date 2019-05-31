import ACTION_TYPES from './types';

const selectNodeType = payload => ({
  type: ACTION_TYPES.SELECT_SEARCH_NODE_TYPE,
  payload
});

const onChangeSearchVal = value => ({
  type: ACTION_TYPES.ON_CHANGE_SEARCH_VALUE,
  value
});

const onSubmitSearch = collection => ({
  type: ACTION_TYPES.ON_SUBMIT_SEARCH,
  collection
});

const onSubmitSearchSuccess = payload => ({
  type: ACTION_TYPES.ON_SUBMIT_SEARCH_SUCCESS,
  payload
});

const onSubmitSearchFailure = payload => ({
  type: ACTION_TYPES.ON_SUBMIT_SEARCH_FAILURE,
  payload
});

const onSearchNodeTextClick = payload => ({
  type: ACTION_TYPES.SHOW_SEARCH_NODE_INFO,
  payload
});

const onSearchNodeClick = () => ({
  type: ACTION_TYPES.SELECT_SEARCH_NODE_EDGES
});

const selectEdges = payload => ({
  type: ACTION_TYPES.ON_NODE_EDGES_SELECT,
  payload
});

const selectEdgesSuccess = payload => ({
  type: ACTION_TYPES.ON_NODE_EDGES_SELECT_SUCCESS,
  payload
});

const selectEdgesFail = payload => ({
  type: ACTION_TYPES.ON_NODE_EDGES_SELECT_FAILURE,
  payload
});

const startNewSearch = () => ({
  type: ACTION_TYPES.START_NEW_SEARCH,
});

const selectSearchListSize = payload => ({
  type: ACTION_TYPES.SELECT_LIST_SIZE,
  payload
});

const escModal = () => ({
  type: ACTION_TYPES.ESCAPE_MODAL
});

const getEdgeTypes = () => ({type: ACTION_TYPES.GET_EDGE_TYPES});
const getEdgeTypesSuccess = payload => ({type: ACTION_TYPES.GET_EDGE_TYPES_SUCCESS, payload});
const getEdgeTypesFailure = () => ({type: ACTION_TYPES.GET_EDGE_TYPES_FAILURE});

const getVocabularyTypes = () => ({type: ACTION_TYPES.GET_VOCABULARY_TYPES});
const getVocabularyTypesSuccess = payload => ({type: ACTION_TYPES.GET_VOCABULARY_TYPES_SUCCESS, payload});
const getVocabularyTypesFailure = () => ({type: ACTION_TYPES.GET_VOCABULARY_TYPES_FAILURE});

export {
  selectNodeType,
  onSubmitSearch,
  onSubmitSearchSuccess,
  onSubmitSearchFailure,
  onChangeSearchVal,
  onSearchNodeClick,
  selectEdges,
  selectEdgesSuccess,
  selectEdgesFail,
  onSearchNodeTextClick,
  startNewSearch,
  selectSearchListSize,
  escModal,

  getEdgeTypes,
  getEdgeTypesSuccess,
  getEdgeTypesFailure,

  getVocabularyTypes,
  getVocabularyTypesSuccess,
  getVocabularyTypesFailure
};