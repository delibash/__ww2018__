import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StyledComponent, Wrapper } from './../../../components/';
import StyledWrappers from './../../../components/WrapperComponent/styled';
import SearchList, { SearchListItem } from './SearchList';

const Card = StyledComponent(Wrapper);

storiesOf('Search List', module)
  .add('Card Wrapped Search List', () => (
    <Card styledtype={StyledWrappers.StyledCard} style={{width: '80vw'}}>
      <SearchList collection={{searchNodeType: 'NodeType', value: 'value + value'}} />
    </Card>
  ))
  .add('Search List Item', () => (
      <SearchListItem
        style={{width: '80vw'}}
        onClick={action('clicked')}
      />
  ));


