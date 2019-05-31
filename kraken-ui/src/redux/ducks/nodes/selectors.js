import { createSelector } from 'reselect';

const reduceOptions = opts => opts && opts.reduce((acc, val) => {
  acc.push({
    value: val,
    label: val
  });
  return acc;
}, []);

const getCollection = createSelector(
  state => state.nodes.collection,
  collection => ({
    ...collection,
    selectOptions: reduceOptions(collection.selectOptions)
  })
);

const getUI = createSelector(
  state => state.nodes.ui,
  ui => ui
);

export {
  getCollection,
  getUI,
};