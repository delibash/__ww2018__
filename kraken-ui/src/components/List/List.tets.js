import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import List from './List';

test('Default Modal', () => {
  const tree = renderer.create(<List list={[]}/>).toJSON();
  expect(tree).toMatchSnapshot();
});