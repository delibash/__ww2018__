import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import NewNode from './NewNode';

test('Renders NewNode', () => {
  const tree = renderer.create(
    <NewNode
      nodeName="Node String"
    >
      <>Children</>
    </NewNode>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});