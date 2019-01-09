import * as React from 'react';
import { Component } from 'react';
import { SVGmultiPath } from './../svg/svgs';

import * as styles from './modal.css';
import * as svgStyles from './../svg/index.css';

interface ModalProps {
  labelStyle?: object;
  labelType?: string;
  label: any;
  type?: string;
  body: any;
}

export default class Modal extends Component<ModalProps> {
  public state = {
    active: false
  };

  private modalElem: HTMLDivElement;

  public constructor(props: any) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  public showModal = () => {
    this.setState({ active: true });
  }

  public hideModal = () => {
    this.setState({ active: false });
  }

  public escFunction(e: any) {
    if (e.keyCode === 27) {
      this.setState({ active: false });
    }
  }

  public onOutsideClick(e: any) {
    const { active } = this.state;
    if (active) {
      if (!this.modalElem.contains(e.target)) {
        this.setState({ active: false });
      }
    }
  }

  public componentWillMount() {
    document.addEventListener('mousedown', this.onOutsideClick, false);
    document.addEventListener('keydown', this.escFunction, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
    document.removeEventListener('keydown', this.escFunction, false);
  }

  public render() {
    const {
      labelType,
      body,
      label
    } = this.props;

    const { active } = this.state;

    const showHide = active ? styles.active : '';

    return (
      <>
        {
          labelType === 'button' ?
            <button className="defaultBorderButton" onClick={this.showModal}>{label}</button>
            :
            <a onClick={this.showModal} style={{ display: 'inline-block' }}>{label}</a>
        }
        {
          active ?
            <div className={`${styles.container} ${showHide}`}>
              <section
                ref={(node: any) => { this.modalElem = node; }}
                className={styles.body}
                onClick={this.onOutsideClick}
              >
                {body}
              </section>
              <button className={styles.close} onClick={this.hideModal}>
                <SVGmultiPath
                  path="M.85.85l13.32 13.32"
                  path2="M14.17.85L.85 14.17z"
                  className={svgStyles.close}
                  viewBox="0 0 15.02 15.02"
                />
                <span className={styles.text}>ESC</span>
              </button>
            </div> : ''
        }
      </>
    );
  }
}
