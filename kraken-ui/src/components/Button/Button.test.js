import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Button from './Button';

test('Default Button', () => {
  const tree = renderer.create(<Button>Button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('cursor', 'pointer');
  expect(tree).toHaveStyleRule('border', 'none');
});