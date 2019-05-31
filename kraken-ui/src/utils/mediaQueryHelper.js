import { css } from 'styled-components';

const breakPoints = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

const mediaQuery = Object.keys(breakPoints)
  .reduce((acc, label) => {
    const emSize = breakPoints[label] / 16;
    acc[label] = (...args) => css`
      @media (max-width: ${emSize}em) {
        ${css(...args)}
      }
    `;
    return acc;
  }, {});

export {
  mediaQuery
};