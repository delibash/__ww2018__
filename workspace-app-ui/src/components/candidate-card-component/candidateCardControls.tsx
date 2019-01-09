import * as React from 'react';
import { Component } from 'react';
import { Button } from './../buttons/buttons';
import { SVG } from './../svg/svgs';

import * as styles from './controls.css';
import * as svgStyles from './../svg/index.css';
import * as btnStyles from './../buttons/buttons.css';
import api from 'src/services/api';
import { Inbox, ApplicationStatus } from 'src/types/domainTypes';

interface CandidateCardControlsProps {
  id: number;
  advanced: boolean;
  history: any;
  tab: Inbox;
  externalStatus: ApplicationStatus;
  onStatusUpdate: () => void;
}

interface HeldDropDownProps {
  onStatusUpdate: () => void;
  id: number;
  externalStatus: ApplicationStatus;
}

class HeldDropDown extends Component<HeldDropDownProps> {
  public state = { active: false };
  private dropdown: HTMLSpanElement;
  private advanced: Set<string>  = new Set(['RECRUITER_SCREEN', 'HM_SCREEN', 'ONSITE_INTERVIEW', 'OTHER_ADVANCED', 'HIRED']);
  private rejected: Set<string> = new Set(['DNQ', 'NOT_AUTHORIZED', 'NOT_HIRED', 'PIVOTED', 'OTHER_REJECTED']);
  private held: string = 'HELD';

  public componentWillMount() {
    document.addEventListener('mousedown', this.onOutsideClick, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
  }

  public render () {
    const { externalStatus, id } = this.props;
    return (
      <span
        className={styles.heldDropDown}
        ref={(node: any) => { this.dropdown = node; }}
        onClick={() => this.setState({ active: true })}
      >
        <span>
          <span onClick={() => null}>{this.parseTab(externalStatus)}</span>
          <SVG viewBox="0 0 13.5 7.5" path="M.75.89l5.93 5.86 6.07-6" className={svgStyles.chevronDown} />
        </span>
        {
          this.state.active ?
          <ul>
            {externalStatus !== this.held && <li onClick={this.holdCandidate.bind(this, id)}>Hold</li>}
            {!this.rejected.has(externalStatus) && <li onClick={this.declineCandidate.bind(this, id)}>Decline</li>}
            {!this.advanced.has(externalStatus) && <li onClick={this.advanceCandidate.bind(this, id)}>Advance</li>}
          </ul>
          :
          ''
        }
      </span>
    );
  }

  private parseTab = (tab: ApplicationStatus): string => {
    if (this.advanced.has(tab)) {
      return 'Advanced';
    }
    if (this.rejected.has(tab)) {
      return 'Rejected';
    }
    if (tab === 'HELD') {
      return 'Held';
    }

    return 'New';
  }

  private onOutsideClick = (e: any) => this.setState({ active: this.dropdown.contains(e.target) ? true : false });

  private declineCandidate = (id: number) => {
     api.updateStatus(id, 'OTHER_REJECTED')
      .then(this.props.onStatusUpdate);
  }

  private holdCandidate = (id: number) => {
    api.updateStatus(id, 'HELD')
     .then(this.props.onStatusUpdate);
 }

  private advanceCandidate = (id: number) => {
    api.updateStatus(id, 'OTHER_ADVANCED')
      .then(this.props.onStatusUpdate);
  }
}

export default class CandidateCardControls extends Component<CandidateCardControlsProps> {
  public render() {
    return (
      <section>
        {this.renderButtons()}
      </section>
    );
  }

  private renderButtons = () => {
    const { tab, id, onStatusUpdate } = this.props;

    if (tab === 'new') {
      return (
        <div className={styles.container}>
          <div>
            <Button
              style={{background: 'none', boxShadow: 'inset 0 0 0 .1rem var(--gray)'}}
              className={`${btnStyles.btnGray}`}
              text="Feedback for Wendy?"
              onClick={() => window.location.href = `mailto:support@wadeandwendy.ai?subject=Wendy%20Feedback`}
            />
          </div>

          <div>
            <Button
              style={{background: 'none', boxShadow: 'inset 0 0 0 .1rem var(--gray)'}}
              className={`${btnStyles.btnGray}`}
              text="Decline"
              onClick={() => api.updateStatus(id, 'OTHER_REJECTED').then(() => onStatusUpdate())}
            />
          </div>

          <div>
            <Button
              style={{background: 'none', boxShadow: 'inset 0 0 0 .1rem var(--gray)'}}
              className={`${btnStyles.btnGray}`}
              text="Hold"
              onClick={() => api.updateStatus(id, 'HELD').then(() => onStatusUpdate())}
            />
          </div>

          <div>
            <Button
              className={`${btnStyles.btnGray} ${btnStyles.btnGrayActive}`}
              text="Advance"
              onClick={() => api.updateStatus(id, 'OTHER_ADVANCED').then(() => onStatusUpdate())}
            />
          </div>
        </div>
      );

    } else {
      return (
        <div className={styles.container}>
          <div>
            <Button
              style={{background: 'none', boxShadow: 'inset 0 0 0 .1rem var(--gray)'}}
              className={`${btnStyles.btnGray}`}
              text="Feedback for Wendy?"
              onClick={() => window.location.href = `mailto:support@wadeandwendy.ai?subject=Wendy%20Feedback`}
            />
          </div>

          <div/>
          <div/>
          <div>
            <HeldDropDown {...this.props}/>
          </div>
        </div>
      );
    }
  }
}
