import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoleParams } from '../../../types/routingTypes';
import { Route } from 'react-router-dom';
import CandidateCardContainer from './../../candidate-card-component/candidateCardComponent';
import * as styles from './container.css';

class Cards extends Component<RouteComponentProps<RoleParams>> {
  public render() {
    return (
      <section className={styles.cards}>
        <Route
          path="/role/:roleId/:tab/:score/:sort"
          component={CandidateCardContainer}
        />
      </section>
    );
  }
}

export default Cards;
