import * as React from 'react';
import { Component } from 'react';
import * as styles from './calibration.css';
import { ParsedJobDescription } from '../../types/domainTypes';

interface JobDescriptionProps {
  jobDescription: ParsedJobDescription;
}

class JobDescription extends Component<JobDescriptionProps> {
  public render() {
    const { jobDescription } = this.props;

    return (
      <section className={styles.roleDescriptionWrapper} style={this.props}>
        <header className={styles.roleHeader}><h4>Specific Role Information</h4></header>
        <section className={styles.roleDetails}>
          <div>
            <span>Job Title</span>
            <strong>{jobDescription.title}</strong>
          </div>
          <div>
            <span>Submitted Through</span>
            <strong>{jobDescription.source}</strong>
          </div>
        </section>
        <section className={styles.roleDescription}>
          <div>
            {jobDescription.rawText}
          </div>
        </section>
      </section>
    );
  }
}

export default JobDescription;
