import * as React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import FilterOptions from './filterOptionsComponent';
import './../../../../src/index.css';

storiesOf('Filter Options', module)
  .addDecorator(StoryRouter())
  .add('Filter Options', () => <FilterOptions />);
