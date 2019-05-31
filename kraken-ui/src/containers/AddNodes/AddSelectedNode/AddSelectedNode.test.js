import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import AddSelectedNode from './AddSelectedNode';

test('Renders AddSelectedNode', () => {
  const tree = renderer.create(
    <AddSelectedNode />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});