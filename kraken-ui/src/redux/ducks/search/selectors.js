import { createSelector } from 'reselect';

const reduceOptions = opts => opts && opts.reduce((acc, val) => {
  acc.push({
    value: val,
    label: val
  });
  return acc;
}, []);

const getReducedCollection = createSelector(
  state => state.search.collection,
  collection => ({
    ...collection,
    value: collection.value.indexOf(' ') >= 0 ? collection.value.split(' ').join(' + ') : collection.value,
    edgeTypes: reduceOptions(collection.edgeTypes),
    vocabularyTypes: reduceOptions(collection.vocabularyTypes)
  })
);

const getSearchUI = createSelector(
  state => state.search.ui,
  ui => ui
);

const getHistory = createSelector(
  state => state.search.history,
  history => history
);

const getResults = createSelector(
  state => state.search.results,
  results => results
);

const getEdges = createSelector(
  state => state.search.edges,
  edges => edges
);

export {
  getHistory,
  getReducedCollection,
  getSearchUI,
  getResults,
  getEdges
};
