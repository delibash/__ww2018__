import * as React from 'react';
import { Component } from 'react';
import { loadingByObject } from '../higher-order-components/loadingHOC';
// import { User } from './../../types/domainTypes';
import { RouteComponentProps } from 'react-router-dom';
// import { Loading } from './../../types/utilityTypes';
import { SVGLoader } from './../svg/svgObj';
import { Card } from './../card/cardComponent';
import { StaticFilterBar } from './../filter-bar/staticFilterBar';

import * as styles from './users.css';
import * as appStyles from './../app.css';

// interface UserComponentState {
//   user: Loading<User>;
// }

const InitUserState = {
  user : {
    id: null,
    auth0Id: ''
  }
};

class UserComponent extends Component<any> {
  render () {
    const { user } = this.props;
    return (
      <div>
        <h3>{user.auth0Id}</h3>
      </div>
    );
  }
}

class UserContainer extends Component<RouteComponentProps<any>, {}> {
  public state = InitUserState;

  public componentDidMount () {
    this.setState({
      user: {
        id: null,
        auth0Id: '[TODO]: User to come from an updated API method'
      }
    });
  }

  render () {
    const LoadingUser = loadingByObject(UserComponent);
    return (
      <section className={`${appStyles.navContainerGrid} ${styles.container}`}>
        <StaticFilterBar />
        <Card>
          <LoadingUser
            loadingIndicator={<SVGLoader />}
            props={this.state}
          />
        </Card>
      </section>
    );
  }
}

export default UserContainer;