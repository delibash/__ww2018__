import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Label from './Label';

test('Default Label', () => {
  const tree = renderer.create(<Label>Label</Label>).toJSON();
  expect(tree).toMatchSnapshot();
});