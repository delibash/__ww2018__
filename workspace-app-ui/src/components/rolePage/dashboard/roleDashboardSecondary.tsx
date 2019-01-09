import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoleParams } from '../../../types/routingTypes';
import { kpisBell, kpisChats, KpisAdvanced, kpisCompetition } from './../../svg/svgObj';
import { Loading, Loadable } from './../../../types/utilityTypes';
import { JobMetrics } from './../../../types/domainTypes';
import { SVGLoader } from './../../svg/svgObj';
import { loadingByField } from './../../higher-order-components/loadingHOC';
import { Paper } from './../../card/cardComponent';
import { WorkingRobot } from './../../static/images';
import * as styles from './dashboard.css';
import api from '../../../services/api';

const kpisAdvanced = (<KpisAdvanced/>);

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

export const Message = ({text}: any) => {
  return (
    <div className={styles.message}>
      <p>{text}</p>
    </div>
  );
};

class RoleDashboard extends Component<RouteComponentProps<RoleParams>> {
  public state = InitState;

  public componentDidMount() {
    const { roleId } = this.props.match.params;
    api.getJobMetrics(Number(roleId))
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
      .then(jobs => jobs.find(summary => summary.id === +roleId))
      .then(job => {
        job !== undefined ?
          this.setState({ role: job.name })
          :
          this.setState({ role: 'error' });
      });
  }

  public render() {
    const {
      newCandidates,
      advancedCandidates,
      chatsInLastWeek,
      totalChats,
      chatCompletion,
    } = this.state;
    const completion = chatCompletion === 'loading' || chatCompletion === 'error'
      ? chatCompletion : Math.round(chatCompletion * 100) + '%';

    const LoadingDashboardItem = loadingByField(DashboardItem);

    return (
      <section className={styles.wrapper}>
        <Paper
          className={styles.roleInfo}
        >
          <a href="#">View Role Info</a>
        </Paper>
        <div className={styles.container}>
          <h2 className={styles.role}>Role Metrics</h2>
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
              content={completion}
            />
          </div>
        </div>
        <div className={styles.robot}>{WorkingRobot}</div>
      </section>
    );
  }
}

export default RoleDashboard;
