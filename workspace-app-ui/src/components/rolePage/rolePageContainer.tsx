import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FilterBar from './filter-bar/filterBarContainer';
import Cards from './candidate-card/cardsContainer';
import RoleDashboard from './dashboard/roleDashboardSecondary';
import { loadingByField } from './../higher-order-components/loadingHOC';
import * as styles from './role.css';

export default class RolePageContainer extends Component {
  public render() {
    const LoadingCards = loadingByField(Cards);
    const LoadingDashboard = loadingByField(RoleDashboard);
    return (
      <main className={styles.container}>
        <FilterBar />
        <Switch>
          <Route
            path="/role/:roleId/:tab/:score/:sort"
            render={props => {
              const { tab } = props.match.params;
              if (tab === 'dashboard') {
                return(<LoadingDashboard {...props} />);
              }
              return(<LoadingCards {...props} />);
            }}
          />
        </Switch>
      </main>
    );
  }
}
