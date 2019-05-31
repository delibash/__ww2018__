import React from 'react';
import { storiesOf } from '@storybook/react';
import SelectWrapper from './SelectWrapper';
import { action } from '@storybook/addon-actions';

const customStyles = {
  container: base => ({
    ...base,
    minWidth: '90vw'
  })
};

storiesOf('Select Wrapper', module)
  .add('Default Select', () => (
    <SelectWrapper
      options={[{value: 'Value', label: 'Label'}]}
      styles={customStyles}
      onChange={action('onChange')}
    />
  ));
