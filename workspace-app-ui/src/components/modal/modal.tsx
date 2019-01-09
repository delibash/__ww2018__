import * as React from 'react';
import { Component } from 'react';
import { SVGmultiPath } from './../svg/svgs';

import * as styles from './modal.css';
import * as svgStyles from './../svg/index.css';

interface ModalProps {
  node: any;
  handleOutsideClick: any;
  active: boolean;
  handleClose: () => void;
  body: any;
  type: string;
}

const InitState = {
  active: false
};

export default class Modal extends Component<ModalProps> {
  public state = InitState;

  public render () {
    const {
      active,
      handleClose,
      type,
      body,
      handleOutsideClick,
      node } = this.props;
    const showHide = active ? styles.active : '';
    const t = styles[type];
    return (
      <div className={`${styles.container} ${showHide} ${t}`}>
        <section
          ref={node}
          className={styles.body}
          onClick={handleOutsideClick}
        >
          {body}
        </section>
        <button className={styles.close} onClick={handleClose}>
          <SVGmultiPath
            path="M.85.85l13.32 13.32"
            path2="M14.17.85L.85 14.17z"
            className={svgStyles.close}
            viewBox="0 0 15.02 15.02"
          />
          <span className={styles.text}>ESC</span>
        </button>
      </div>
    );
  }
}

export const ChatModal = ({ id, type, messages, job, person }: any) => {
  return (
    <div>
      <header>
        <h2 className={styles.header}>{person ? person.name : 'Null Name'}</h2>
        <span className={styles.date}>{job ? job.date : 'Null Job Date'}</span>
      </header>
      <div className={styles.chatContent}>
        {messages && messages.map((msg: any, i: number) => {
          const botClass = msg.sentByBot ? styles.wendy : styles.candidate;
          const botName = msg.sentByBot ? 'Wendy' : person ? person.firstName : 'Null First Name';
          return (
            <div className={`${styles.chat} ${botClass}`} key={i}>
              <div className={styles.id}>
                <p>{botName}</p>
              </div>
              <div className={styles.message}>
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
