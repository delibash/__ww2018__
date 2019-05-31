import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropdown from './Dropdown';

storiesOf('Dropdown', module)
  .add('Default Dropdown', () => (
    <Dropdown onChange={action('on-change')} />
  ));
