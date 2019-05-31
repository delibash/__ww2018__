import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Modal from './Modal';

test('Default Modal', () => {
  const tree = renderer.create(<Modal>Modal</Modal>).toJSON();
  expect(tree).toMatchSnapshot();
});