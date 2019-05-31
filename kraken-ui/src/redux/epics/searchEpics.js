import 'rxjs';
import 'rxjs/add/operator/mergeMap';
import api from './../../services/api';
import { searchActions } from './../ducks/search';
import ACTION_TYPES from './../ducks/search/types';

const searchEpic = (action$, state$) => {
  return action$.ofType(ACTION_TYPES.ON_SUBMIT_SEARCH, ACTION_TYPES.SELECT_LIST_SIZE)
    .mergeMap(() => {
      const { collection } = state$.value.search;
      return api.searchGraphs(collection.value, collection.searchListSize, collection.searchNodeType)
        .then(res => searchActions.onSubmitSearchSuccess())
        .catch(err => searchActions.onSubmitSearchFailure(
          {
            'date_created': null,
            'id': '23b27e55-52bf-4406-af35-a78ec7fc4c06',
            'name': 'soldering robots',
            'source': 'onet',
            'source_id': 14593,
            'type': 'concept',
            'vocabulary_types': [
              'Thing',
              'Tool'
            ],
            'weight': 1.9666247367858887
          }
        ));
    });
};

const getEdgeTypesEpic = action$ => {
  return action$.ofType(ACTION_TYPES.GET_EDGE_TYPES)
    .mergeMap(payload => { 
      return api.getEdgeTypes()
        .then(res => searchActions.getEdgeTypesSuccess(res.data))
        .catch(err => searchActions.getEdgeTypesFailure(err));
    });
};

const getVocabularyTypesEpic = action$ => {
  return action$.ofType(ACTION_TYPES.GET_VOCABULARY_TYPES)
    .mergeMap(payload => { 
      return api.getVocabularyTypes()
        .then(res => searchActions.getVocabularyTypesSuccess(res.data))
        .catch(err => searchActions.getVocabularyTypesFailure(err));
    });
};

export {
  getVocabularyTypesEpic,
  getEdgeTypesEpic,
  searchEpic
};