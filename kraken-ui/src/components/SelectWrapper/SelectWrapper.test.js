import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import SelectWrapper from './SelectWrapper';

test('Renders React Select Wrapper Component', () => {
  const tree = renderer.create(
    <SelectWrapper
      options={[{}]}
      onChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
