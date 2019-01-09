import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FilterBar from './../filter-bar/filterBarContainer';
import Applicants from './applicantsComponent';
import Companies from './companiesComponent';
import Roles from './rolesComponent';
import Users from './usersComponent';

import * as styles from './dashboard.css';

export default class Dashboard extends Component {
  public render() {
    return (
      <section className={styles.grid}>
        <Route path="/:tab/:pageId/:recordsPerPage" component={FilterBar} />
        <section className={styles.content}>
          <Switch>
            <Route path="/applicants/:pageNumber/:recordsPerPage" component={Applicants} />
            <Route path="/companies/:pageNumber/:recordsPerPage" component={Companies} />
            <Route path="/roles/:pageNumber/:recordsPerPage" component={Roles} />
            <Route path="/users/:pageNumber/:recordsPerPage" component={Users} />
          </Switch>
        </section>
      </section>
    );
  }
}
