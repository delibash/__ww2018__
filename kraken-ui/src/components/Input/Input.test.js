import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Input from './Input';

test('Default Button', () => {
  const tree = renderer.create(
    <Input
      type="text"
      onChange={() => {}}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});