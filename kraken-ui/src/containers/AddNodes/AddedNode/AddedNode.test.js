import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import AddedNode from './AddedNode';

test('Renders AddedNode Container', () => {
  const tree = renderer.create(
    <AddedNode
      added={{nodeName: ''}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});