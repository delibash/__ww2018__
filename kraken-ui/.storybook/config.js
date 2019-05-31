import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { configureActions } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import {
  ResetStyles,
} from './../src/global/styles/ResetStyles';

const reset = storyFn => (
  <>
    <ResetStyles />
    { storyFn() }
  </>
);

configureActions({
  depth: 100,
  limit: 20,
});

addDecorator(reset);
addDecorator(centered);

withOptions({
  name: 'kraken-ui Storybook v4.1.11',
  url: 'https://github.com/wadeandwendy/KG_UI_POC/',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  sortStoriesByKind: true,
});

const req = require.context('../src/', true, /.story\.js$/);

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module);