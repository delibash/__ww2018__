import * as React from 'react';
import { Component } from 'react';
import ViewOptions from './viewOptions';
import { Route } from 'react-router-dom';
import { SVG } from './../../svg/svgs';
import * as svgStyles from './../../svg/index.css';
import * as inboxStyles from './../../rolePage/filter-bar/inbox.css';
import * as styles from './../../rolePage/filter-bar/filter-bar.css';

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
          <section style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
            <nav className={inboxStyles.containerNav} style={{padding: 0}}>
              <ul>
                <li className={inboxStyles.tab}>
                  <div className={inboxStyles.tabHandle}/>
                  <p className={`${inboxStyles.tabActive} ${inboxStyles.tabLabel}`}>Recruiter Dashboard</p>
                </li>
              </ul>
            </nav>
          </section>
          <Route
            path="/dashboard/:filter"
            render={props => {
              return(<ViewOptions {...props} />);
            }}
          />
          {/* TODO Chat Component */}
          <section className="chat" />
        </div>
      </section>
    );
  }
}
