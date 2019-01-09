import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Tab } from './toggle-tabs';
import { barsTab } from './../../svg/svgObj';
import * as styles from './index.css';
import './../../../../src/index.css';

const css = {
  display: 'flex'
};

storiesOf('Toggle Tabs', module)
  .add('Tabs', () => (
    <div style={css}>
      <Tab
        active={true}
        className={styles.toggleSummary}
        label={barsTab}
        onClick={() => { console.log(); }}
      />
      <Tab
        active={false}
        className={styles.toggleExpanded}
        label=""
        onClick={() => { console.log(); }}
      />
    </div>
  ));
