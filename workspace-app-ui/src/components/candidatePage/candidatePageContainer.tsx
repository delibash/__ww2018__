import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CandidateDetails from './candidateDetails';
import CandidateNextSteps from './candidateNextSteps';
import FilterBar from './filterBarContainer';
import * as styles from './candidate.css';

export default class CandidateContainer extends Component {
  public render() {
    console.log(this.props);
    return (
      <main className={styles.container}>
        <Switch>
          <Route
            path="/candidate/advance/:id"
            render={props => (
              <div className={styles.stepsContainer}>
                <CandidateNextSteps {...props} />
              </div>
            )}
          />
          <Route
            path="/candidate/:id"
            render={props => (
              <div>
                <FilterBar />
                <CandidateDetails {...props} />
              </div>
            )}
          />
        </Switch>
      </main>
    );
  }
}
