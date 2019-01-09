import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { kpisBell, kpisChats, KpisAdvanced, kpisCompetition } from './../../svg/svgObj';
import { Loading, Loadable } from './../../../types/utilityTypes';
import { JobMetrics } from './../../../types/domainTypes';
import { TextLink } from './../../buttons/buttons';
import { SVGLoader } from './../../svg/svgObj';
import { loadingByField } from './../../higher-order-components/loadingHOC';
import FilterBar from './filterBarContainer';
import api from '../../../services/api';
// import { MockApi } from '../../../services/api/mockApi';
// const api = new MockApi();

import * as btnStyles from './../../buttons/buttons.css';
import * as styles from './dashboard.css';

const kpisAdvanced = (<KpisAdvanced />);

interface DashboardItemProps {
  icon: object;
  label: string;
  content: number | string;
}

interface DashboardState {
  role: Loading<string>;
}

const InitState: Loadable<JobMetrics> & DashboardState = {
  role: 'loading',
  newCandidates: 'loading',
  advancedCandidates: 'loading',
  chatsInLastWeek: 'loading',
  totalChats: 'loading',
  chatCompletion: 'loading'
};

export const UnpublishedRole = ({ type, label }: any) => {
  const t = type === 'requested' ? `${styles.requested}` : '';
  return (
    <div className={`${styles.container} ${styles.unpublished}`}>
      <div className={`${styles.mast} ${t}`}>{label}</div>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.normal}>
            <strong>Technical Recruiter</strong>
            <span>#849271</span>
          </p>
          <p>Submitted through Gr8 People</p>
        </div>
        <div className={styles.feedback}>
          <TextLink
            className={btnStyles.transcriptLink}
            handleClick={() => null}
            text="Provide Feedback"
          />
          <p>New York, NY</p>
        </div>
      </div>
    </div>
  );
};

export const DashboardItem = ({ icon, label, content }: DashboardItemProps) => {
  return (
    <div className={`${styles.item}`}>
      <h3 className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <span>{label}</span>
      </h3>
      <p className={styles.digit}>{content}</p>
    </div>
  );
};

export const LiveRole = ({
  newCandidates,
  advancedCandidates,
  chatsInLastWeek,
  totalChats,
  chatCompletion,
  role,
  completion,
  type
}: any) => {
  const LoadingDashboardItem = loadingByField(DashboardItem);
  return (
    <div className={`${styles.container} ${styles.live}`}>
      {
        type === 'new' ?
          <div className={styles.mast}>
            <Link
              className={styles.mast}
              to="/role/3/new/all/chrono"
            >
              New Talent (2) to Review
            </Link>
          </div>
          :
          ''
      }
      <div className={styles.mainHeader}>
        <h2 className={styles.role}>
          <strong>{role}</strong>
          <span>#834456</span>
          <p>Live for 3d</p>
        </h2>
        <div className={styles.location}>
          <TextLink
            className={btnStyles.transcriptLink}
            handleClick={() => null}
            text="View Transcript"
          />
          <p>New York, NY</p>
        </div>
      </div>
      <div className={styles.content}>
        <LoadingDashboardItem
          loadingIndicator={<SVGLoader />}
          icon={kpisBell}
          label="New"
          content={newCandidates}
        />
        <LoadingDashboardItem
          loadingIndicator={<SVGLoader />}
          icon={kpisAdvanced}
          label="Advanced"
          content={advancedCandidates}
        />
        <LoadingDashboardItem
          loadingIndicator={<SVGLoader />}
          icon={kpisChats}
          label="Past 7 Days"
          content={chatsInLastWeek}
        />
        <LoadingDashboardItem
          loadingIndicator={<SVGLoader />}
          icon={kpisChats}
          label="Total Chats"
          content={totalChats}
        />
        <LoadingDashboardItem
          loadingIndicator={<SVGLoader />}
          icon={kpisCompetition}
          label="Completion"
          content={`${completion}`}
        />
      </div>
      <div className={styles.footer}>
        <a onClick={() => null} href="#">Expand Metrics</a>
      </div>
    </div>
  );
};

export const Message = () => {
  return (
    <div className={styles.message}>
      <p>Message</p>
    </div>
  );
};

export const SectionDivider = ({ type, label }: any) => {
  return (
    <div className={styles.sectionDivider}>
      <span className={styles.line} />
      <span className={styles.label}>{label}</span>
    </div>
  );
};

class RoleDashboard extends Component<RouteComponentProps<any>> {
  public state = InitState;

  public componentDidMount() {
    const { roleId } = this.props.match.params;
    api.getJobMetrics(roleId)
      .then(metrics =>
        metrics !== null ?
          this.setState({ ...metrics })
          :
          this.setState({
            newCandidates: 'error',
            advancedCandidates: 'error',
            chatsInLastWeek: 'error',
            totalChats: 'error',
            chatCompletion: 'error'
          })
      );
    api.getJobSummaries()
      .then(jobs => jobs.find(summary => summary.id === 1))
      .then(job => {
        job !== undefined ?
          this.setState({ role: job.name })
          :
          this.setState({ role: 'error' });
      });
  }

  public render() {
    const {
      chatCompletion,
    } = this.state;
    const completion = chatCompletion === 'loading' || chatCompletion === 'error'
      ? chatCompletion : chatCompletion * 100;

    const { filter } = this.props.match.params;

    return (
      <main className={styles.main}>
        <FilterBar />
        <section className={styles.wrapper}>
          {
            filter === 'all' ?
              <div>
                <UnpublishedRole type="requested" label="Requested" />
                <UnpublishedRole label="Goes Live on 8/8 at 8 AM EST" />
                <LiveRole {...this.state} completion={completion} type="new" />
                <LiveRole {...this.state} completion={completion} />
              </div>
              :
              filter === 'unpublished' ?
              <div>
                <UnpublishedRole type="requested" label="Requested" />
                <UnpublishedRole label="Goes Live on 8/8 at 8 AM EST"/>
              </div>
              :
              filter === 'live' ?
              <div>
                <LiveRole {...this.state} completion={completion} type="new" />
                <LiveRole {...this.state} completion={completion} />
              </div>
              :
              ''
          }
        </section>
      </main>
    );
  }
}

export default RoleDashboard;
