import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonDecor, TextLink } from './buttons';
import { SVG, SVGmultiPath } from './../svg/svgs';
import * as svgStyles from './../svg/index.css';
import * as btnStyles from './buttons.css';

import './../../../src/index.css';

const onClick = () => null;

const btnCheckmark = (
  <SVG
    className={`${svgStyles.checkmark} ${svgStyles.checkmarkWhite}`}
    path="M21.69 1L7.83 16 1 8.49"
    viewBox="0 0 22.69 17"
  />
);

const btnPillLinked = (
  <SVG
    path="M14 6.5A6.77 6.77 0 0 0 7 0a6.77 6.77 0 0 0-7 6.48A6.76 6.76 0 0 0 7 13h7z"
    className={`${svgStyles.chatBubble} ${svgStyles.chatBubbleSmall}`}
    viewBox="0 0 14 13"
  />
);

const btnClose = (
  <SVGmultiPath
    path="M.85.85l13.32 13.32"
    path2="M14.17.85L.85 14.17z"
    className={svgStyles.close}
    viewBox="0 0 15.02 15.02"
  />
);

const dots = (
  <svg viewBox="0 0 24 4" className={svgStyles.dots}>
    <g>
      <circle cx="12" cy="2" r="2"/>
      <circle cx="22" cy="2" r="2"/>
      <circle cy="2" r="2"/>
    </g>
  </svg>
);

storiesOf('Buttons', module)
  .add('Button - Dark Blue', () => (
    <Button
      className={btnStyles.btnBlue}
      text="Dark Blue"
      onClick={onClick}
    />
  ))
  .add('Button - Dark Blue Checkmark', () => (
    <ButtonDecor
      className={`${btnStyles.btnBlue} ${btnStyles.btnCheckmark}`}
      text="Checkmark"
      decor={btnCheckmark}
      onClick={onClick}
    />
  ))
  .add('Button - Gray', () => (
    <Button
      className={btnStyles.btnGray}
      text="Gray"
      onClick={onClick}
    />
  ))
  .add('Button - Light Blue', () => (
    <Button
      className={btnStyles.btnLightBlue}
      text="Light Blue"
      onClick={onClick}
    />
  ))
  .add('Button - Pill', () => (
    <Button
      className={btnStyles.btnPill}
      text="Pill Button"
      onClick={onClick}
    />
  ))
  .add('Button - Pill Linked', () => (
    <ButtonDecor
      className={`${btnStyles.btnPill} ${btnStyles.btnPillLinked}`}
      text="Btn Pill Linked"
      decor={btnPillLinked}
      onClick={onClick}
    />
  ))
  .add('Button - Close', () => (
    <ButtonDecor
      className={btnStyles.btnClose}
      text=""
      decor={btnClose}
      onClick={onClick}
    />
  ))
  .add('Button - Dots', () => (
    <ButtonDecor
      className={`${btnStyles.btnGray} ${btnStyles.btnMore}`}
      text=""
      decor={dots}
      onClick={onClick}
    />
  ))
  .add('Link - Text', () => (
    <TextLink
      className={btnStyles.textLink}
      text="Text Link"
      handleClick={() => null}
    />
  ));
