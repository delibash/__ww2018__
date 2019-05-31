import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import AddNodes from './AddNodes';

test('Renders AddNodes', () => {
  const tree = renderer.create(
    <AddNodes
      collection={{}}
      ui={{}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});