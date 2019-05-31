import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Dropdown from './Dropdown';

test('Default Button', () => {
  const tree = renderer.create(<Dropdown onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});