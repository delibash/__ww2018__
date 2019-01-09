import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, RouteComponentProps, Route, Switch } from 'react-router-dom';
import Auth from './services/auth/auth';
import Callback from './components/callback/callack';
import './index.css';

const theme = getMuiTheme({});

const auth = new Auth();
const handleAuth = ({location, history}: RouteComponentProps) => {
  if (location && /access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
      // .then(route => history.replace(route))
      .then(_ => history.replace(''))
      .catch(console.log);
  }
};

ReactDOM.render(
  <MuiThemeProvider muiTheme={theme}>
    <Router>
      <Switch>
        <Route 
          path="/callback"
          render={(props: RouteComponentProps) => {
            handleAuth(props);
            return <Callback {...props}/>;
          }}
        /> 
        <Route component={App}/>
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
