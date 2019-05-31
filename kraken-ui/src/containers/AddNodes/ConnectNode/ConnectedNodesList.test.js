import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import ConnectedNodesList from './ConnectedNodesList';

test('Renders ConnectedNodesList', () => {
  const tree = renderer.create(
    <ConnectedNodesList
      connectedNodes={[{value: '', label: ''}]}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});