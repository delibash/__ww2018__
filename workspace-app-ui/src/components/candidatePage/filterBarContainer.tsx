import * as React from 'react';
import { Component } from 'react';
import { SVG } from './../svg/svgs';
import InboxTabs from './inboxTabs';
import { Route } from 'react-router-dom';
import * as svgStyles from './../svg/index.css';
import * as styles from './../rolePage/filter-bar/filter-bar.css';

export default class FilterBar extends Component {
  public render() {
    return (
      <section className={styles.container}>
        <div className={styles.fixedContainer}>
          <header>
            <h2 className={styles.containerHeader}>
              <span>Workspace</span>
              <SVG viewBox="0 0 13.5 7.5" path="M.75.89l5.93 5.86 6.07-6" className={svgStyles.chevronDown} />
            </h2>
          </header>
          <Route path="/candidate/:candidateId" component={InboxTabs} />
          {/* TODO Chat Component */}
          <section className="chat" />
        </div>
      </section>
    );
  }
}
