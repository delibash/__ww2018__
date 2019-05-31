import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './../Button';
import Modal from './Modal';

storiesOf('Modal', module)
  .add('Default Modal', () => (
    <Modal
      style={{width: '20%'}}
    >
      <p>Modal Text</p>
      <nav>
        <Button onClick={action('cancel')}>Cancel</Button>
        <Button onClick={action('submit')}>Ok</Button>
      </nav>
    </Modal>
  ))

