import * as React from 'react';
import { Component } from 'react';
import { SFC } from 'react';
import * as styles from './buttons.css';
import { verticalDots } from '../svg/svgObj';

type Handler = () => void;

interface BtnProps {
  className: string;
  text: string;
  onClick: Handler;
  disabled?: boolean;
  style?: Object;
}

interface BtnDecorProps {
  className: string;
  text: string;
  decor: Object;
  onClick: Handler;
  disabled?: boolean;
}

interface LinkProps {
  className: string;
  text: string;
  handleClick: Handler;
}

interface VerticalMoreProps {
  hoverText: string;
  className: string;
  active: string;
  onClick?: Handler;
  disabled?: boolean;
}

const initVerticalState = {
  hover: false
};

export class VerticalMoreButton extends Component<VerticalMoreProps, typeof initVerticalState> {
  public state = {
    hover: false
  };

  private share: HTMLDivElement;

  constructor (props: any) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  public onOutsideClick (e: any) {
    this.share.contains(e.target) ?
      this.setState({ hover: true }) :
      this.setState({ hover: false });
  }

  public componentWillMount() {
    document.addEventListener('mousedown', this.onOutsideClick, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
  }

  render() {
    const { hover } = this.state;
    const { className, active, disabled, hoverText } = this.props;

    if (hover) {
      return (
        <div className={styles.shareHover}>
          <div onClick={this.onOutsideClick}>
            <div
              className={styles.shareText}
              onClick={() => this.setState({hover: false})}
            >
              {hoverText}
            </div>
          </div>
          <button
            ref={(node: any) => { this.share = node; }}
            className={this.state.hover ? `${className} ${active}` : className}
            onClick={() => this.setState({hover: true})}
            disabled={disabled}
          >
            {verticalDots}
          </button>
        </div>
      );
    }

    return (
      <button
        ref={(node: any) => { this.share = node; }}
        className={className}
        onClick={() => this.setState({hover: true})}
        disabled={disabled}
      >
        {verticalDots}
      </button>
    );
  }
}

export const ButtonDecor = ({disabled, className, text, decor, onClick}: BtnDecorProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {decor}
      <span>{text}</span>
    </button>
  );
};

export const Button: SFC<BtnProps> = ({style, disabled, className, text, onClick, children }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
    {text}
    {children}
    </button>
  );
};

export const TextLink = ({className, text, handleClick}: LinkProps) => {
  return (
    <a
      className={className}
      onClick={handleClick}
    >
      {text}
      {className === styles.textLink || className === styles.transcriptLink ? <span> &rarr;</span> : ''}
    </a>
  );
};
