import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import ConnectNode from './ConnectNode';

test('Renders ConnectNode', () => {
  const tree = renderer.create(
    <ConnectNode
      selected={{value:'', label: ''}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});