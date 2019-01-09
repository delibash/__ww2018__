import * as React from 'react';
import * as styles from './card.css';

export const Paper = (props: any) => (
  <div
    className={`${styles.paper} ${props.className}`}
    onClick={props.onClick}
  >
    {props.children}
  </div>
);

export const Card = (props: any) => (
  <div className={styles.container}>{props.children}</div>
);
