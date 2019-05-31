import ACTION_TYPES from './types';
import { combineReducers } from 'redux';
import { createReducer } from './../../utils';

const collectionState = {
  searchListSize: 10,
  searchNodeInfoID: 0,
  searchNodeType: '',
  value: '',
  selectedEdge: '',
  edgeTypes: [],
  vocabularyTypes: []
};

const uiState = {
  searchSelectors: true,
  searchResults: false,
  searchEdges: false,
  searchNodeInfoModal: false,
  onSearchValueChange: true,
};

const collectionReducer = createReducer(collectionState)({
  [ACTION_TYPES.SELECT_SEARCH_NODE_TYPE]: (state, action) => {
    const { payload } = action;
    return { ...state, searchNodeType: payload.value };
  },
  [ACTION_TYPES.ON_CHANGE_SEARCH_VALUE]: (state, action) => {
    const { value } = action;
    return { ... state, value };
  },
  [ACTION_TYPES.START_NEW_SEARCH]: state => {
    return { ...state, searchNodeType: '', value: '' };
  },
  [ACTION_TYPES.ON_SUBMIT_SEARCH]: (state, action) => {
    const { collection } = action;
    return { ...state, collection };
  },
  [ACTION_TYPES.SHOW_SEARCH_NODE_INFO]: (state, action) => {
    const { payload } = action;
    return { ...state, searchNodeInfoID: payload };
  },
  [ACTION_TYPES.SELECT_SEARCH_NODE_EDGES]: state => {
    return { ...state };
  },
  [ACTION_TYPES.SELECT_LIST_SIZE]: (state, action) => {
    return { ...state, searchListSize: action.payload };
  },
  [ACTION_TYPES.ON_NODE_EDGES_SELECT]: (state, action) => {
    return { ...state, selectedEdge: action.payload.value };
  },
  [ACTION_TYPES.GET_EDGE_TYPES_SUCCESS]: (state, action) => {
    return { ...state, edgeTypes: action.payload };
  },
  [ACTION_TYPES.GET_EDGE_TYPES_FAILURE]: state => {
    return { ...state };
  },
  [ACTION_TYPES.GET_VOCABULARY_TYPES_SUCCESS]: (state, action) => {
    return { ...state, vocabularyTypes: action.payload };
  },
  [ACTION_TYPES.GET_VOCABULARY_TYPES_FAILURE]: state => {
    return { ...state };
  }
});

const searchUI = createReducer(uiState)({
  [ACTION_TYPES.ON_SUBMIT_SEARCH]: state => {
    return { ...state,  searchSelectors: false, searchResults: true };
  },
  [ACTION_TYPES.ON_CHANGE_SEARCH_VALUE]: (state, payload) => {
    const { value } = payload;
    return { ...state, onSearchValueChange: value.length < 1 };
  },
  [ACTION_TYPES.SHOW_SEARCH_NODE_INFO]: state => {
    return { ...state, searchNodeInfoModal: true };
  },
  [ACTION_TYPES.SELECT_SEARCH_NODE_EDGES]: state => {
    return { ...state, searchNodeInfoModal: false, searchEdges: true, searchResults: false };
  },
  [ACTION_TYPES.ESCAPE_MODAL]: state => {
    return { ...state, searchNodeInfoModal: false };
  },
  [ACTION_TYPES.START_NEW_SEARCH]: state => {
    return {
      ...state,
      onSearchValueChange: true,
      searchSelectors: true,
      searchResults: false,
      searchEdges: false,
      searchNodeInfoModal: false
    };
  },
});

const searchHistory = createReducer([])({
  [ACTION_TYPES.ON_SUBMIT_SEARCH]: (state, payload) => {
    return [ ...state, payload.collection];
  }
});

const resultsState = [
  {
    'date_created': null,
    'id': '1f90b1bb-56b4-4efa-9026-7743792e3633',
    'name': 'robot machines',
    'source': 'onet',
    'source_id': 23101519,
    'type': 'concept',
    'vocabulary_types': [
      'Thing',
      'Tool'
    ],
    'weight': 2.4582810401916504
  },
  {
    'date_created': null,
    'id': '8c618c24-cde2-4134-8e8c-026d74b7b706',
    'name': 'articulated robots',
    'source': 'onet',
    'source_id': 711,
    'type': 'concept',
    'vocabulary_types': [
      'Thing',
      'Tool'
    ],
    'weight': 1.9666247367858887
  },
  {
    'date_created': null,
    'id': '43228f2f-983d-446a-a0b2-161bc2888a3d',
    'name': 'assembly robots',
    'source': 'onet',
    'source_id': 753,
    'type': 'concept',
    'vocabulary_types': [
      'Thing',
      'Tool'
    ],
    'weight': 1.9666247367858887
  }
];

const searchResults = createReducer(resultsState)({
  [ACTION_TYPES.ON_SUBMIT_SEARCH_FAILURE]: (state, action) => {
    return [...state, action.payload];
  },
  [ACTION_TYPES.START_NEW_SEARCH]: () => {
    return [];
  },
});

const searchEdges = createReducer([])({
  [ACTION_TYPES.ON_NODE_EDGES_SELECT_SUCCESS]: (state, action) => {
    return [...state, action.payload];
  },
  [ACTION_TYPES.ON_NODE_EDGES_SELECT_FAILURE]: (state, action) => {
    return [...state, action.payload];
  }
});


export default combineReducers({
  collection: collectionReducer,
  history: searchHistory,
  ui: searchUI,
  results: searchResults,
  edges: searchEdges
});
