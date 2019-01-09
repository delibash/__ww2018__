import * as React from 'react';
import { Component } from 'react';
import { Paper } from './../card/cardComponent';
import LogisticQualifications from './logisticQualifications';
import SalaryReqs from './salaryRequirements';
import QualificationsSummary from './qualificationsSummary';
import JobDescription from './jobDescription';

import * as btnStyles from './../buttons/buttons.css';
import * as styles from './calibration.css';
import { RouteComponentProps } from 'react-router';
import { CalibrationParams } from '../../types/routingTypes';
import { EvaluationSummary } from '../../types/domainTypes';
import { Loading } from '../../types/utilityTypes';
import api from '../../services/api';

const chevronDown = (
  <span>
    <span>Collapse Job Description</span>
    <span className="chevron bottom"/>
  </span>
);

const chevronUp = (
  <span>
    <span>Collapse Job Description</span>
    <span className="chevron top"/>
  </span>
);

interface CalibrationState {
  toggle: boolean;
  evalSummary: Loading<EvaluationSummary>;
}

class CalibrationCards extends Component<RouteComponentProps<CalibrationParams>, CalibrationState> {
  public state: CalibrationState = {
    toggle: true,
    evalSummary: 'loading'
  };

  public componentDidMount() {
    const jobId = this.props.match.params.jobId;
    api.getEvalSummary(Number(jobId))
      .then(res => {
        this.setState({evalSummary: res});
      })
      .catch(_ => this.setState({evalSummary: 'error'}));
  }

  public render() {
    const { toggle } = this.state;
    const jobId = this.props.match.params.jobId;

    return (
      <section className={toggle ? styles.mainGrid : `${styles.mainGrid} ${styles.gridToggleOpen}`}>
        <section>
          <div className={styles.content} style={toggle ? {} : {minWidth: '60rem', maxWidth: '66%', margin: '0 auto'}}>
            <section>
              <p className="blue-border">
                Please confirm the logistic qualifications that you absolutely require. If a Talent doesn’t match to your specifications, I’ll move them to Did Not Qualify.
              </p>
            </section>
            <section>
              <form>
                <section className={styles.card}>
                  <LogisticQualifications jobId={Number(jobId)}/>
                </section>
                <section>
                  <SalaryReqs jobId={Number(jobId)}/>
                </section>
                <section className={styles.additionalRequests}>
                  <p className="blue-border">
                    Below is the summary of the information I’ll be looking for.
                  </p>
                  <button
                    className={btnStyles.lightBlueBorder}
                    style={{marginLeft: '2.8rem'}}
                  >
                    Submit Additional Requests
                  </button>
                </section>
              </form>
            </section>
            <section>
              <QualificationsSummary jobId={Number(jobId)}/>
            </section>
          </div>
        </section>
        {this.renderJobDescription()}
      </section>
    );
  }

  private renderJobDescription = () => {
    const { evalSummary, toggle } = this.state;
    if (evalSummary !== 'loading' && evalSummary !== 'error' && evalSummary.parsedJobDescription !== null) {
      return (
        <section className={toggle ? styles.sidebarWrapper : `${styles.sidebarWrapper} ${styles.sidebarWrapperHidden}`}>
          <Paper>
            <section
              className={styles.sidebar}
            >
              <div style={{position: 'relative'}}>
                <a
                  className={styles.rotatedElem}
                  href="#"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      this.setState({toggle: !toggle});
                    }
                  }
                >
                {toggle ? chevronDown : chevronUp}
                </a>
              </div>
              <div style={toggle ? {} : {display: 'none'}}>
                <JobDescription jobDescription={evalSummary.parsedJobDescription}/>
              </div>
            </section>
          </Paper>
        </section>
      );
    } else {
      return <div/>;
    }
  }
}

export default CalibrationCards;
