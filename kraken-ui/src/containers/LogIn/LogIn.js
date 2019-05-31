import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import {
  StyledLogin
} from './styled';
import { Input } from './../../components';

class LogIn extends PureComponent {
  render () {
    return (
      <StyledLogin>
        <form>
          <label>
            <strong>User Name:</strong>
            <Input
              onChange={() => {}}
              type="text"
              required={true}
              placeholder="User Name"
            />
          </label>
          <label>
            <strong>Password:</strong>
            <Input
              onChange={() => {}}
              required={true}
              type="password"
              placeholder="Password"
            />
          </label>
        </form>
      </StyledLogin>
    );
  }
}

LogIn.propTypes = {};

export default LogIn;