import * as React from 'react';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../services/auth/auth';
import ApplicantContainer from './applicants/applicantsContainer';
import JobContainer from './jobs/jobsContainer';
import Dashboard from './dashboard/dashboardContainer';
import CompanyContainer from './companies/companyContainer';
import UserContainer from './users/usersContainer';
import { LogoutIcon } from './svg/svgObj';

import * as styles from './app.css';

class App extends React.Component<RouteComponentProps<{}>> {
  private auth = new Auth();

  render() {
    if (!this.auth.isAuthenticated()) {
      // const {
      //   pathname = '',
      //   search = ''
      // } = this.props.location;
      // const state = pathname + search;
      this.auth.login();
    }

    return (
      <section className={styles.container}>
        <Switch>
          <Route path="/applicant/:id" component={ApplicantContainer} />
          <Route path="/job/:id" component={JobContainer} />
          <Route path="/company/:id" component={CompanyContainer} />
          <Route path="/user/:id" component={UserContainer} />
          <Route path="/:dashboard" component={Dashboard} />
          <Redirect to="/applicants/0/10" />
        </Switch>

        <section className={styles.logout} onClick={this.logout}>
          <LogoutIcon/>
        </section>

      </section>
    );
  }

  private logout = () => {
    this.auth.logout();
    this.auth.login();
  }
}

export default App;
