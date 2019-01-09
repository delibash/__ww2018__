import * as React from 'react';
import './index.css';

interface SvgProps {
    className: string;
    path: string;
    viewBox: string;
}

interface SVGmultiPathProps {
    className: string;
    path: string;
    path2: string;
    viewBox: string;
}

interface SVGCircle {
    className: string;
    path: string;
    cx: string;
    cy: string;
    r: string;
    viewBox: string;
}

export const SVG = ({className, path, viewBox}: SvgProps) => {
  return (
    <svg className={className} viewBox={viewBox}>
      <g>
        <path d={path} />
      </g>
    </svg>
  );
};

export const SVGmultiPath = ({className, path, path2, viewBox}: SVGmultiPathProps) => {
  return (
    <svg className={className} viewBox={viewBox}>
      <g>
        <path d={path} />
        <path d={path2} />
      </g>
    </svg>
  );
};

export const SVGCircle = ({className, path, cx, cy, r, viewBox}: SVGCircle) => {
  return (
    <svg className={className} viewBox={viewBox}>
      <g>
        <path d={path} />
        <circle cx={cx} cy={cy} r={r} />
      </g>
    </svg>
  );
};
