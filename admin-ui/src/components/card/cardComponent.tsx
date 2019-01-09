import * as React from 'react';
import * as styles from './card.css';

export const Card = (props: any) => (
  <article className={styles.container} style={props.customStyles}>{props.children}</article>
);
