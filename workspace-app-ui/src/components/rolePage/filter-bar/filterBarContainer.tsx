import * as React from 'react';
import { Component } from 'react';
import InboxTabs from './inboxTabsComponent';
// import Options from './filterOptionsComponent';
import ViewOptions from './viewOptions';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { SVG } from './../../svg/svgs';
// import * as svgStyles from './../../svg/index.css';
import * as styles from './filter-bar.css';

export default class FilterBar extends Component {
  public render() {
    return (
      <section className={styles.container}>
        <div className={styles.fixedContainer}>
          <header>
            <h2 className={styles.containerHeader}>
              <span>Workspace</span>
              {/* <SVG viewBox="0 0 13.5 7.5" path="M.75.89l5.93 5.86 6.07-6" className={svgStyles.chevronDown} /> */}
            </h2>
          </header>
          <Switch>
            <Route path="/role/:roleId/:tab/:score/:sort" component={InboxTabs} />
            <Redirect to="/role/1/new/all/chrono" />
          </Switch>
          <Route path="/role/:roleId/new/:score/:sort" component={ViewOptions} />
          <Route path="/role/:roleId/held/:score/:sort" component={ViewOptions} />
          <Route path="/role/:roleId/advanced/:score/:sort" component={ViewOptions} />
          <Route path="/role/:roleId/qualified/:score/:sort" component={ViewOptions} />
          <Route path="/role/:roleId/rejected/:score/:sort" component={ViewOptions} />
          {/* <Route path="/role/:roleId/:tab/:score/:sort" component={Options} /> */}
          {/* TODO Chat Component */}
          <section className="chat" />
        </div>
      </section>
    );
  }
}
