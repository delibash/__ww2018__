import * as React from 'react';
import * as styles from './filter-bar.css';
import { Link } from 'react-router-dom';

export const StaticFilterBar = () => (
  <nav className={styles.container}>
    <ul className={styles.tabs}>
      <li><Link className={styles.tab} to="/applicants/0/10">Applicants</Link></li>
      <li><Link className={styles.tab} to="/companies/0/10">Companies</Link></li>
      <li><Link className={styles.tab} to="/roles/0/10">Roles</Link></li>
      <li><Link className={styles.tab} to="/users/0/10">Users</Link></li>
    </ul>
  </nav>
);