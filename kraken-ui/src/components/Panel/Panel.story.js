import React from 'react';
import { storiesOf } from '@storybook/react';
import Panel from './Panel';

storiesOf('Panel', module)
  .add('Default Panel', () => (
    <Panel header="Panel Header">
      <section>Panel Conent</section>
    </Panel>
  ));
