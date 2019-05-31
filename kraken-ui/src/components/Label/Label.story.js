import React from 'react';
import { storiesOf } from '@storybook/react';
import { colors } from './../../global/constants';
import Label from './Label';

storiesOf('Label', module)
  .add('Default Label', () => (
    <Label>Label</Label>
  ))
  .add('Square Label', () => (
    <Label
      borderRadius=".2rem"
      color={colors.BLACK}
      fontWeight="300"
      border="0 none"
      backgroundColor={colors.LIGHTER_GRAY}
    >Label</Label>
  ));


