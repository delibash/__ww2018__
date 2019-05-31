import { createGlobalStyle } from 'styled-components';
import { StylesConstants } from './StylesConstants';

export const ResetStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, 
  *:before, 
  *:after {
    box-sizing: inherit;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
  v2.0 | 20110126
  License: none (public domain)
  */

  html, 
  body, 
  div, 
  span, 
  applet, 
  object, 
  iframe,
  h1, 
  h2, 
  h3, 
  h4, 
  h5, 
  h6, 
  p, 
  blockquote, 
  pre,
  a, 
  abbr, 
  acronym, 
  address, 
  big, 
  cite, 
  code,
  del, 
  dfn, 
  em, 
  img, 
  ins, 
  kbd, 
  q, 
  s, 
  samp,
  small, 
  strike, 
  strong, 
  sub, 
  sup, 
  tt, 
  var,
  b, 
  u, 
  i, 
  center,
  dl, 
  dt, 
  dd, 
  ol, 
  ul, 
  li,
  fieldset, 
  form, 
  label, 
  legend,
  table, 
  caption, 
  tbody, 
  tfoot, 
  thead, 
  tr, 
  th, 
  td,
  article, 
  aside, 
  canvas, 
  details, 
  embed,
  figure, 
  figcaption, 
  footer, 
  header, 
  hgroup,
  menu, 
  nav, 
  output, 
  ruby, 
  section, 
  summary,
  time, 
  mark, 
  audio, 
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, 
  aside, 
  details, 
  figcaption, 
  figure,
  footer, 
  header, 
  hgroup, 
  menu, 
  nav, 
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, 
  q {
    quotes: none;
  }

  blockquote:before, 
  blockquote:after,
  q:before, 
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button:focus {
    outline:0;
  }    
  a,
  a:focus,
  a:hover,
  a:active,
  a:visited {
    text-decoration: none;
  }

  /*
  html is set to 62.5% so that all the REM measurements throughout
  are based on 10px sizing. So basically 1.5rem = 15px */
  
  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    ${StylesConstants.FONT_SIZE.HTML}
  }

  body {
    ${StylesConstants.FONT_SIZE.DEFAULT}
    ${StylesConstants.FONT.DEFAULT}
    line-height: 1.6;
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2 {
    font-weight: 600;
  }
  h3, h4, h5 {
    font-weight: 500;
  }
`;