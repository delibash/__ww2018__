import * as React from 'react';
import { SVGmultiPath, SVG, SVGCircle } from './svgs';
import * as svgStyles from './index.css';

export const SVGLoader = () => {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      className={svgStyles.loader}
    >
      <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
};

export const chatBubble = (
  <SVG
    path="M14 6.5A6.77 6.77 0 0 0 7 0a6.77 6.77 0 0 0-7 6.48A6.76 6.76 0 0 0 7 13h7z"
    className={`${svgStyles.chatBubble} ${svgStyles.chatBubbleSmall}`}
    viewBox="0 0 14 13"
  />
);

export const barsTab = (
  <SVG
    path="M0 0h18v4H0zM0 7h18v4H0zM0 14h18v4H0z"
    className={svgStyles.toggleList}
    viewBox="0 0 18 18"
  />
);

export const btnPillLinked = (
  <SVG
    path="M14 6.5A6.77 6.77 0 0 0 7 0a6.77 6.77 0 0 0-7 6.48A6.76 6.76 0 0 0 7 13h7z"
    className={`${svgStyles.chatBubble} ${svgStyles.chatBubbleSmall}`}
    viewBox="0 0 14 13"
  />
);

export const resume = (
  <SVGmultiPath
    path="M1.5 1.5h16.8v18H1.5z"
    path2="M5.58 6.9h8.64M5.58 10.5h8.64M5.58 14.1h8.64"
    className={svgStyles.resume}
    viewBox="0 0 19.8 21"
  />
);

export const checkmark = (
  <SVG
    className={`${svgStyles.checkmark} ${svgStyles.checkmarkWhite}`}
    path="M21.69 1L7.83 16 1 8.49"
    viewBox="0 0 22.69 17"
  />
);

export const dots = (
  <svg viewBox="0 0 24 4" className={svgStyles.dots}>
    <g>
      <circle cx="12" cy="2" r="2" />
      <circle cx="22" cy="2" r="2" />
      <circle cy="2" r="2" />
    </g>
  </svg>
);

export const verticalDots = (
  <svg viewBox="0 0 4 24" className={svgStyles.dotsVertical}>
    <g>
      <circle cx="2" cy="2" r="2" />
      <circle cx="2" cy="12" r="2" />
      <circle cx="2" cy="22" r="2" />
    </g>
  </svg>
);

export const avatarNew = (
  <SVGmultiPath
    viewBox="0 0 47 47"
    path="M23.5 47A23.5 23.5 0 1 1 47 23.5 23.52 23.52 0 0 1 23.5 47zm0-45A21.5 21.5 0 1 0 45 23.5 21.52 21.52 0 0 0 23.5 2z"
    path2="M33.61 29.44c-.41-.31-1.13-1.24-1.37-4-.45-5.68-2.2-8.87-5.57-10a3 3 0 0 0 .38-1.52 3.13 3.13 0 0 0-.9-2.3 3.56 3.56 0 0 0-2.65-1 3.2 3.2 0 0 0-3.5 3.25 3 3 0 0 0 .38 1.52c-3.42 1.09-5.2 4.29-5.65 10-.15 2-.66 3.51-1.36 4.05a1 1 0 0 0 .63 1.8h5.36A5.11 5.11 0 0 0 20.64 34a3.83 3.83 0 0 0 2.83 1.17A3.89 3.89 0 0 0 26.39 34a5.09 5.09 0 0 0 1.25-2.72H33a1 1 0 0 0 .61-1.8zM23.5 12.61c1.14 0 1.55.52 1.55 1.26s-.24.9-.74.9h-1.49c-.44 0-.81-.25-.8-.91s.35-1.25 1.48-1.25zm1.44 20a1.94 1.94 0 0 1-1.45.59 1.8 1.8 0 0 1-1.39-.56 3 3 0 0 1-.69-1.38h4.22a3 3 0 0 1-.69 1.33zm1.76-3.35H15.93a11.75 11.75 0 0 0 .82-3.69c.56-7.13 3.08-8.6 6.7-8.6h.1c3.62 0 6.14 1.47 6.69 8.61a12 12 0 0 0 .83 3.68z"
    className={`${svgStyles.candidateAvatar}`}
  />
);

export const avatarAdvanced = (
  <SVGCircle
    viewBox="0 0 47 47"
    path="M34 17L20.6 31 14 23.99"
    cx="23.5"
    cy="23.5"
    r="22.5"
    className={`${svgStyles.candidateAvatar} ${svgStyles.candidateAvatarAdvanced}`}
  />
);

export const avatarHeld = (
  <SVGCircle
    viewBox="0 0 47 47"
    path="M15.94 18.74c1.6 0 2 1.3 2 2.65v-9c0-2.31 1.47-2.54 1.92-2.54S22 9.87 22 12.46v-1.57c0-2.44.91-3 2-3s2 .83 2 3.14v2.17s-.19-3.44 2.13-3.44c1.78 0 1.83 2.12 1.83 3.14v5.44c0-2.14-.24-5.2 2-5.2s1.92 2.39 1.92 4.38v8.79c0 3.59-.82 11.58-9.81 11.58-8.4 0-10.17-5.54-10.17-11v-5.45c-.03-1.44.47-2.7 2.04-2.7zM17.95 17.86v9M22 12.46v9.4M25.98 12.86v9M29.93 16.86v6"
    cx="23.36"
    cy="23.36"
    r="22.5"
    className={`${svgStyles.candidateAvatar} ${svgStyles.candidateAvatarHeld}`}
  />
);

export const avatarRejected = (
  <SVGCircle
    viewBox="0 0 47 47"
    path="M10.5 23.5h26"
    cx="23.5"
    cy="23.5"
    r="22.5"
    className={`${svgStyles.candidateAvatar} ${svgStyles.candidateAvatarDeclined}`}
  />
);

export const avatarDNQ = (
  <SVGCircle
    viewBox="0 0 47 47"
    path="M12.25 12.46l22.6 22.6M35.4 11.75l-23.65 23.7z"
    cx="23.5"
    cy="23.5"
    r="22.5"
    className={`${svgStyles.candidateAvatar} ${svgStyles.candidateAvatarDNQ}`}
  />
);

export const Logo = () => (
  <svg
    viewBox="0 0 174.37 25.26"
    width="180"
    height="26"
  >
    <g fill="#646bff">
      <polygon points="36.65 6.74 32.64 19.34 30.58 19.34 24.59 1.67 27.59 1.67 31.57 14.26 35.58 1.67 37.69 1.67 41.7 14.26 45.69 1.67 48.68 1.67 42.69 19.34 40.63 19.34 36.65 6.74"/>
      <path d="M59.38,7.45V19.24H56.64v-1.6A4.4,4.4,0,0,1,53,19.54a6,6,0,0,1-6-6.2,6,6,0,0,1,6-6.19A4.42,4.42,0,0,1,56.64,9V7.45Zm-2.74,5.89a3.46,3.46,0,1,0-6.9,0,3.46,3.46,0,1,0,6.9,0Z"/>
      <path d="M70.4,17.67a4.41,4.41,0,0,1-3.62,1.87,6,6,0,0,1-6-6.1,6,6,0,0,1,6-6.1A4.41,4.41,0,0,1,70.4,9.21V1.81h2.75V19.24H70.4Zm0-4.23a3.46,3.46,0,1,0-6.9,0,3.46,3.46,0,1,0,6.9,0Z"/>
      <path d="M77.29,14.18c.13,1.69.85,3.06,3.12,3.06a2.29,2.29,0,0,0,2.46-1.54h2.74c-.32,2-2.24,3.84-5.2,3.84-3.92,0-5.81-2.73-5.81-6.2s2.07-6.19,5.73-6.19a5.27,5.27,0,0,1,5.38,5.31,10.22,10.22,0,0,1-.12,1.72Zm0-2h5.78a2.7,2.7,0,0,0-2.81-2.91A2.74,2.74,0,0,0,77.29,12.13Z"/>
      <path d="M98.12,17.25a6.24,6.24,0,0,1-4.64,2.34c-3.28,0-5-2.24-5-4.48s1.17-3.39,2.94-4.72l.17-.12L91.26,10A5.75,5.75,0,0,1,89.32,6.2a4.38,4.38,0,0,1,4.54-4.36c2.66,0,4.64,1.69,4.64,4.24a5.09,5.09,0,0,1-2.39,3.86l-.74.55,2.82,3,3.4-3.7.88,2.63-2.56,2.88,3.83,4H100Zm-1.77-1.8,0,0-3.13-3.34-.57.43a2.85,2.85,0,0,0-1.39,2.41,2.18,2.18,0,0,0,2.25,2.14A3.89,3.89,0,0,0,96.35,15.45ZM93.17,8.18l.48.53,1-.73A2.38,2.38,0,0,0,95.78,6,1.83,1.83,0,0,0,93.89,4.2,1.79,1.79,0,0,0,92,6,3.33,3.33,0,0,0,93.17,8.18Z"/>
      <polygon points="114.21 6.74 110.2 19.34 108.14 19.34 102.15 1.67 105.15 1.67 109.13 14.26 113.14 1.67 115.25 1.67 119.26 14.26 123.25 1.67 126.24 1.67 120.25 19.34 118.2 19.34 114.21 6.74"/>
      <path d="M127.37,14.18c.12,1.69.83,3.06,3,3.06a2.25,2.25,0,0,0,2.41-1.54h2.68c-.31,2-2.19,3.84-5.09,3.84-3.83,0-5.69-2.73-5.69-6.2s2-6.19,5.61-6.19a5.22,5.22,0,0,1,5.27,5.31,10.22,10.22,0,0,1-.12,1.72Zm0-2H133a2.68,2.68,0,0,0-2.76-2.91A2.71,2.71,0,0,0,127.37,12.13Z"/>
      <path d="M137.33,7.31H140V9a4,4,0,0,1,3.71-2,3.81,3.81,0,0,1,3.43,1.63,6.33,6.33,0,0,1,.73,3.56V19.3H145.2V13.12c0-2.07-.56-3.64-2.47-3.64S140,11.05,140,13.12V19.3h-2.67Z"/>
      <path d="M159,17.67a4.43,4.43,0,0,1-3.63,1.87,6,6,0,0,1-6-6.1,6,6,0,0,1,6-6.1A4.43,4.43,0,0,1,159,9.21V1.81h2.74V19.24H159Zm0-4.23a3.46,3.46,0,1,0-6.9,0,3.46,3.46,0,1,0,6.9,0Z"/>
      <path d="M168.79,25.21a6,6,0,0,1-3.86-1.2,4.53,4.53,0,0,1-1.6-3.58h2.75a2.56,2.56,0,0,0,2.74,2.49c1.67,0,2.84-.6,2.84-2.77V17.49a4.14,4.14,0,0,1-3.79,1.92,4,4,0,0,1-3.49-1.57,5.87,5.87,0,0,1-.75-3.44V7.5h2.72v6c0,2,.57,3.51,2.52,3.51s2.79-1.52,2.79-3.51v-6h2.71V20.15A4.88,4.88,0,0,1,172.93,24a6.08,6.08,0,0,1-4.14,1.27Z"/>
      <path d="M20.64,9.22a7,7,0,0,0-7.18-5.09A7,7,0,0,0,.11,7a7.09,7.09,0,0,0,1.2,3.91,7,7,0,0,0-.15,7.92,6.91,6.91,0,0,0,4.43,3A6.68,6.68,0,0,0,7,21.94,7,7,0,0,0,13.25,18a6.77,6.77,0,0,0,2.54-.22,7,7,0,0,0,4.85-8.6Zm-9.35.21A6.85,6.85,0,0,0,7.88,8h0L7.56,8A6.88,6.88,0,0,0,3.13,9.14a2.83,2.83,0,0,0-.28.2A4.92,4.92,0,0,1,2.23,7,4.86,4.86,0,0,1,12,7,4.76,4.76,0,0,1,11.29,9.43ZM2.22,14a4.87,4.87,0,0,1,4.7-3.89,8.14,8.14,0,0,0,.47,3.46h0l.05.11a.64.64,0,0,0,0,.07l0,0a3.13,3.13,0,0,0,.19.44l0,0a6.87,6.87,0,0,0,2.79,2.91,6.36,6.36,0,0,0,.64.32A4.93,4.93,0,0,1,9.67,19h0a4.86,4.86,0,0,1-7.44-5ZM12.8,11a7,7,0,0,0,1.28-4c0-.25,0-.49,0-.74A4.83,4.83,0,0,1,18.6,9.79a4.81,4.81,0,0,1-.45,3.69h0a4.85,4.85,0,0,1-8.46,0,7.18,7.18,0,0,0,2.89-2.18L12.8,11Z"/>
    </g>
  </svg>
);

export const kpisBell = (
  <SVG
    viewBox="0 0 17 19.24"
    path="M16.8 15c-.47-.36-1.08-1.28-1.29-3.64-.38-5-1.91-7.55-5-8.25a1.93 1.93 0 0 0 .29-1.08 2 2 0 0 0-.55-1.41A2.38 2.38 0 0 0 8.5 0a2 2 0 0 0-2.25 2.06 1.85 1.85 0 0 0 .31 1.07c-3.13.68-4.69 3.26-5.08 8.27C1.33 13.19.87 14.52.2 15a.49.49 0 0 0 .3.89h4.83a4 4 0 0 0 1 2.43 2.9 2.9 0 0 0 2.14.88 3 3 0 0 0 2.19-.91 4 4 0 0 0 1-2.4h4.84a.48.48 0 0 0 .47-.34.49.49 0 0 0-.17-.55zM8.5 1c1 0 1.31.44 1.3 1.06s-.2.75-.61.75H7.93a.67.67 0 0 1-.68-.77c0-.55.3-1.04 1.25-1.04zM10 17.64a2 2 0 0 1-1.46.6 1.79 1.79 0 0 1-1.44-.57 3 3 0 0 1-.74-1.74h4.36a3 3 0 0 1-.72 1.71zm1.23-2.71H1.57a8.38 8.38 0 0 0 .9-3.46c.5-6.25 2.75-7.54 6-7.54h.08c3.83 0 5.56 2.19 6 7.55a8.38 8.38 0 0 0 .91 3.45z"
    className={`${svgStyles.dashboardIcon}`}
  />
);

export const kpisChats = (
  <SVG
    viewBox="0 0 13 12.61"
    path="M12.5 6.31A5.9 5.9 0 0 0 6.51.5a5.91 5.91 0 0 0-6 5.79 5.9 5.9 0 0 0 6 5.82h6zM4.5 5.16h4.48M4.5 7.89h4.48"
    className={`${svgStyles.dashboardIcon} ${svgStyles.kpisChats}`}
  />
);

export const kpisCompetition = (
  <SVG
    viewBox="0 0 9.5 11.86"
    path="M.56 1.64h3.38v5.48H.56zM4 8.11V2.64h5L7 5.38l2 2.73H4zM.5.5v10.86"
    className={`${svgStyles.dashboardIcon} ${svgStyles.kpisCompetition}`}
  />
);

export const KpisAdvanced = () => (
  <svg
    viewBox="0 0 13 12.86"
    className={`${svgStyles.dashboardIcon} ${svgStyles.kpisAdvanced}`}
  >
    <g>
      <path d="M9.5 4.45L5.48 8.41 3.5 6.43" />
      <ellipse cx="6.5" cy="6.43" rx="6" ry="5.93" />
    </g>
  </svg>
);

export const Search = () => (
  <svg
    viewBox="0 0 20 20"
    style={{ width: '20px', height: '20px' }}
  >
    <g>
      <line x1="15" y1="15" x2="20" y2="20" stroke="white" strokeWidth="2" />
      <circle cx="10" cy="10" r="8" strokeWidth="2" fill="none" stroke="white" />
    </g>
  </svg>
);

export const Plus = ({ viewBox, style, stroke, strokeWidth }: any) => (
  <svg
    viewBox={viewBox}
    style={style}
  >
    <g>
      <line x1="10" y1="0" x2="10" y2="20" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="20" y1="10" x2="0" y2="10" stroke={stroke} strokeWidth={strokeWidth} />
    </g>
  </svg>
);

export const Star = () => (
  <svg width="10px" height="11px" viewBox="0 0 10 11">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(-746.000000, -41.000000)" stroke="#FFFFFF">
        <g transform="translate(495.000000, 21.000000)">
          <g transform="translate(177.000000, 16.000000)">
            <g transform="translate(9.000000, 1.000000)">
              <polygon points="70 10.8919861 66.9076655 12.5121951 67.5 9.07142857 65 6.63240418 68.4494774 6.1271777 70 3 71.5418118 6.1271777 75 6.63240418 72.5 9.07142857 73.0923345 12.5121951" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export const Markert = () => (
  <svg viewBox="0 0 26 33" width="26px" height="33px">
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g
        transform="translate(-517.000000, -159.000000)"
        stroke="#646BFF"
        strokeWidth="1.5"
      >
        <g transform="translate(518.000000, 160.000000)">
          <rect id="Rectangle-path" x="0" y="0" width="24" height="31" />
          <rect id="Rectangle-path" x="9" y="22" width="6" height="9" />
          <rect id="Rectangle-path" x="4" y="3" width="6" height="6" />
          <rect id="Rectangle-path" x="14" y="3" width="6" height="6" />
          <rect id="Rectangle-path" x="4" y="12" width="6" height="6" />
          <rect id="Rectangle-path" x="14" y="12" width="6" height="6" />
        </g>
      </g>
    </g>
  </svg>
);

export const WorkGap = () => (
  <svg width="28px" height="29px" viewBox="0 0 28 29">
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g
        transform="translate(-514.000000, -563.000000)"
        stroke="#FF817E"
        strokeWidth="1.5"
      >
        <g transform="translate(515.000000, 564.000000)">
          <rect x="0" y="12" width="26" height="4" />
          <rect x="15" y="16" width="10" height="4" />
          <path d="M26,14 L26,27" />
          <path d="M0,14 L0,27" />
          <rect x="3.41407686" y="0" width="11" height="8" />
          <path d="M9,9 L9,12" />
        </g>
      </g>
    </g>
  </svg>
);

export const StarLabel = () => (
  <svg width="10px" height="11px" viewBox="0 0 10 11">
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(-746.000000, -41.000000)" stroke="#FFFFFF">
        <g transform="translate(495.000000, 21.000000)">
          <g transform="translate(177.000000, 16.000000)">
            <g transform="translate(9.000000, 1.000000)">
              <polygon points="70 10.8919861 66.9076655 12.5121951 67.5 9.07142857 65 6.63240418 68.4494774 6.1271777 70 3 71.5418118 6.1271777 75 6.63240418 72.5 9.07142857 73.0923345 12.5121951" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export const Employees = () => (
  <svg width="27px" height="25px" viewBox="0 0 27 25">
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinejoin="round"
    >
      <g
        transform="translate(-514.000000, -494.000000)"
        stroke="#646BFF"
        strokeWidth="1.5"
      >
        <g transform="translate(515.000000, 495.000000)">
          <path d="M9.94299818,14 C9.21490274,14.3775685 8.38279368,14.5933219 7.50044074,14.5933219 C6.61632485,14.5933219 5.78509726,14.3775685 5.05700182,14 C2.11553153,15.2885274 0,18.8261986 0,23 L15,23 C15,18.8261986 12.8844685,15.2885274 9.94299818,14 Z" />
          <path d="M13,9 C13,11.7609913 10.7608013,14 7.99957559,14 C5.23750106,14 3,11.7609913 3,9 C3,6.23900866 5.23750106,4 7.99957559,4 C10.7608013,4 13,6.23900866 13,9 Z" />
          <path d="M20.1707422,9 C19.4754369,9.37756849 18.6808022,9.59332192 17.8381863,9.59332192 C16.993887,9.59332192 16.200094,9.37756849 15.5047887,9 C13.3978282,9.96575342 10.1586816,13.8390411 11.2016397,14.4143836 C12.2673257,15.0025685 13.4794803,17.6284247 13.3178597,18 L25,18 C25,13.8261986 22.9797423,10.2885274 20.1707422,9 Z" />
          <path d="M24,5 C24,7.76099134 21.7608013,10 18.9995756,10 C16.2375011,10 14,7.76099134 14,5 C14,2.23900866 16.2375011,0 18.9995756,0 C21.7608013,0 24,2.23900866 24,5 Z" />
        </g>
      </g>
    </g>
  </svg>
);

export const InsightIcon = () => (
  <svg width="26px" height="26px" viewBox="0 0 26 26">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(-518.000000, -163.000000)" stroke="#646BFF" strokeWidth="1.5">
            <g transform="translate(519.000000, 164.000000)">
                <polygon points="12 15.7857143 7.67073171 18 8.5 13.297619 5 9.96428571 9.82926829 9.27380952 12 5 14.1585366 9.27380952 19 9.96428571 15.5 13.297619 16.3292683 18"/>
                <circle cx="12" cy="12" r="12"/>
            </g>
        </g>
    </g>
  </svg>
);

export const LogoutIcon = () => (
  <svg width="23px" height="26px" viewBox="0 0 23 26" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(-14.000000, -858.000000)" stroke="#FFFFFF" strokeWidth="2">
            <g transform="translate(15.000000, 859.000000)">
                <polyline points="4.88872404 16.5268555 0 12.086066 5 7.52685547"/>
                <path d="M0,12 L14,12"/>
                <polyline points="9 6.2389339 9 0.298339844 20.7763672 0.298339844 20.7763672 24 9 24 9 17.8583984"/>
            </g>
        </g>
    </g>
  </svg>
);
