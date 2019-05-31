import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import Routes from './routes';

import {
  ResetStyles,
} from './global/styles';

const store = configureStore();

class App extends Component {
  render () {
    return (
      <>
        <ResetStyles />
        <Provider store={store}>
          <Routes />
        </Provider>
      </>
    );
  }
}

App.propTypes = {};

export default App;
