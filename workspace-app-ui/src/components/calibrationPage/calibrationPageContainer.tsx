import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FilterBar from './filterBarContainer';
import CalibrationCards from './calibrationCards';
import * as styles from './calibration.css';

export default class CalibrationPageContainer extends Component {
  public render() {
    return (
      <main className={styles.container}>
        <FilterBar />
        <Switch>
          <Route path="/calibration/:jobId" component={CalibrationCards} />
        </Switch>
      </main>
    );
  }
}
