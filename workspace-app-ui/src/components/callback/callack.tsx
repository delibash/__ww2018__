import { Component, CSSProperties } from 'react';
import * as React from 'react';
// import loading from './loading.svg';

export default class Callback extends Component {
  render() {
    const style: CSSProperties = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <svg
          x="0"
          y="0"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
        >
            <path fill="rgba(100, 107, 255, 1)" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform
                 attributeName="transform"
                 type="rotate"
                 dur="1s"
                 from="0 50 50"
                 to="360 50 50"
                 repeatCount="indefinite"
              />
          </path>
        </svg>
      </div>
    );
  }
}
