import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import {
  ResetStyles,
} from './global/styles';

const store = configureStore();

test('Renders AddNodes', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <ResetStyles />
      <App />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});