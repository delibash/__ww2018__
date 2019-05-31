import React from 'react';
import { storiesOf } from '@storybook/react';
import TabsComponent from './Tabs';

storiesOf('Tabs', module)
  .add('All Tabs', () => (
    <TabsComponent
      onSelect={(x, y, z) => console.log(x, y, z)}
      defaultIndex={0}
      tab={['Name of Tab 1', 'Name of Tab 2']}
      tabPanel={[
        <section>Tab Content One</section>,
        <section>Tab Content Two</section>
      ]}
    />
  ));