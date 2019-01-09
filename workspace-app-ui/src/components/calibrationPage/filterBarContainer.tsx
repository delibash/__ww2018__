import * as React from 'react';
import { Component } from 'react';
import { SVG } from './../svg/svgs';
import { VerticalMoreButton, Button } from './../buttons/buttons';
import * as svgStyles from './../svg/index.css';
import * as inboxStyles from './../rolePage/filter-bar/inbox.css';
import * as btnStyles from './../buttons/buttons.css';
import * as styles from './filter-bar.css';

export default class FilterBar extends Component {
  public render() {
    return (
      <section className={styles.container}>
        <div className={styles.fixedContainer}>
          <header>
            <h2 className={styles.containerHeader}>
              <span>Randstad USA</span>
              <SVG viewBox="0 0 13.5 7.5" path="M.75.89l5.93 5.86 6.07-6" className={svgStyles.chevronDown} />
            </h2>
          </header>
          <section style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <div className={styles.draftRole}>
              <div>
                <strong>Sales Account Manager</strong>
                <span>Draft Role</span>
              </div>
              <div>
                <VerticalMoreButton
                  hoverText="Text in Overlay"
                  active={`${btnStyles.btnClear}`}
                  className={`${btnStyles.btnMore} ${btnStyles.btnMoreVertical} ${btnStyles.btnClear}`}
                />
              </div>
            </div>
            <nav className={inboxStyles.containerNav} style={{ padding: 0 }}>
              <ul>
                <li className={inboxStyles.tab}>
                  <div className={inboxStyles.tabHandle} />
                  <p className={`${inboxStyles.tabActive} ${inboxStyles.tabLabel}`}>Role Profile</p>
                </li>
              </ul>
            </nav>
          </section>
          <section style={{textAlign: 'right'}}>
            <Button
              style={{width: 'auto'}}
              className={btnStyles.btnLightBlue}
              text="Set Role Live"
              onClick={() => null}
              disabled={false}
            />
          </section>
        </div>
      </section>
    );
  }
}
