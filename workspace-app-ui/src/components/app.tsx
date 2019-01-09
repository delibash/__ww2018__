import * as React from 'react';
import ActionBar from './action-bar/actionBar';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import RolePageContainer from './rolePage/rolePageContainer';
import CandidatePage from './candidatePage/candidatePageContainer';
import UploadActionBar from './upload/actionBar';
import JobSelection from './job-selection-page/jobSelectionContainer';
import * as styles from './app.css';
import Auth from '../services/auth/auth';
import Login from './login/loginContainer';

class App extends React.Component<RouteComponentProps<{}>> {
  private auth = new Auth();

  render() {
    if (!this.auth.isAuthenticated()) {
      const {
        pathname = '',
        search = ''
      } = this.props.location;
      const state = pathname + search;
      return <Login state={state} />;
    }

    return (
      <section
        className={
          this.props.location.pathname === '/upload' ?
          `${styles.container} ${styles.containerSideBar}`
          :
          styles.container
        }
      >
        <Switch>
          <Route
            path="/upload"
            render={props => {
              return <UploadActionBar />;
            }}
          />
          <ActionBar onClick={this.auth.logout} />
        </Switch>
        <Switch>
          <Route path="/role" component={RolePageContainer} />
          <Route path="/candidate" component={CandidatePage} />
          <Route path="" component={JobSelection}/>
        </Switch>
      </section>
    );
  }
}

export default App;
