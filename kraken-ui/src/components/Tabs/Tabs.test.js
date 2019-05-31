import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import TabsComponent from './Tabs';

test('Tabs', () => {
  const tree = renderer.create(
    <TabsComponent
      tab={['Name of Tab']}
      tabPanel={[<section />]}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});