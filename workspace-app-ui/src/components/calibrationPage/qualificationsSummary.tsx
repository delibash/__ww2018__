import * as React from 'react';
import { Component } from 'react';
import { Paper } from './../card/cardComponent';
import api from './../../services/api';
import * as styles from './calibration.css';

interface QualificationsSummaryProps {
  jobId: number;
}

interface State {
  qualifications: Array<Object>;
  soc: string;
  title: string;
}

const InitState: State = {
  qualifications: [],
  soc: '',
  title: ''
};

class QualificationsSummary extends Component<QualificationsSummaryProps> {
  public state = InitState;

  public componentDidMount () {
    api.getEvalSummary(this.props.jobId)
      .then(res => this.setState({...res}));
  }

  public render() {
    const { soc, title, qualifications } = this.state;
    return (
      <Paper>
        <header>
          <h4>{soc} {title} Qualification Summary</h4>
          <p className="blue-border-narrow">Select up to 3 qualifications that are most important for this role.</p>
        </header>
        <section className={styles.qSummary}>
          {qualifications && qualifications.map((q: any, i) => {
            return (
              <div key={i} className={styles.summarySection}>
                <strong className={styles.sectionTitle}>{q.name}</strong>
                <ul>
                  {q.skills.map((s: any, j: any) => {
                    return (
                      <li key={j}>{s.name}</li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </section>
      </Paper>
    );
  }
}

export default QualificationsSummary;
