import * as React from 'react';
import * as styles from './decor.css';

interface LabelProps {
  labelType: string | any;
}

export const Label = ({labelType}: LabelProps) => {
  const Ideal = (<span>Ideal Talent</span>);
  const Qualified = (<span>Qualified Talent</span>);
  const Unqualified = (<span>Did Not Qualify</span>);
  
  const cls =
    labelType === 'ideal'
      ? styles.labelIdeal
      : labelType === 'qualified' ? styles.labelQualified : '';
  const Talent =
    labelType === 'ideal'
      ? Ideal
      : labelType === 'qualified' ? Qualified : labelType === 'unqualified' ? Unqualified : '';

  return <div className={`${styles.label} ${cls}`}>{Talent}</div>;
};

export const InfoBubble = () => (
  <i className={styles.infoBubble}>
    <i>i</i>
  </i>
);
