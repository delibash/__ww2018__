import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ActionBar from './actionBar';

import './../../../src/index.css';

storiesOf('Action Bar', module)
  .add('Main Container', () => (
    <ActionBar onClick={action('click')} />
  ));
