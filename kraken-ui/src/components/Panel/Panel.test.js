import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Panel from './Panel';

test('Panel', () => {
  const tree = renderer.create(<Panel header="Some Header">{<section />}</Panel>).toJSON();
  expect(tree).toMatchSnapshot();
  // expect(tree).toHaveStyleRule('cursor', 'pointer');
});
