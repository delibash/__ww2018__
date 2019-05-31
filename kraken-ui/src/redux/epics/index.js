import { combineEpics } from 'redux-observable';
import {
  getOptionsRequestEpic,
  updateNodeEpic
} from './nodesEpics';

import {
  searchEpic,
  getEdgeTypesEpic,
  getVocabularyTypesEpic
} from './searchEpics';

const rootEpic = combineEpics(
  getVocabularyTypesEpic,
  getEdgeTypesEpic,
  searchEpic,
  getOptionsRequestEpic,
  updateNodeEpic
);

export default rootEpic;