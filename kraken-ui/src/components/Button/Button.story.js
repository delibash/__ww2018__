import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

storiesOf('Button', module)
  .add('Default Button', () => (
    <Button onClick={action('button-click')}>Button</Button>
  ))
  .add('Disabled Button', () => (
    <Button disabled={true} onClick={action('button-click')}>Disabled Button</Button>
  ))


