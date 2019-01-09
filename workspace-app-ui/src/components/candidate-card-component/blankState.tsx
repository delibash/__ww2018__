import * as React from 'react';
import { WorkingRobot } from './../static/images';
import * as styles from './card.css';

export const BlankState = () => (
  <div className={styles.blankState}>
    {WorkingRobot}
    <p className="blue-border">Nothing here yet!</p>
  </div>
);
