import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CandidateParams } from './../../types/routingTypes';
import api from './../../services/api';
import { Loading, Loadable } from './../../types/utilityTypes';
import { InboxSummary, Application } from './../../types/domainTypes';
import { loadingByField } from './../higher-order-components/loadingHOC';
import { SVGLoader } from './../svg/svgObj';

import * as styles from './../rolePage/filter-bar/inbox.css';

type Handler = () => void;

interface TabProps {
  active: boolean;
  label: string;
  qty?: any;
  onClick: Handler;
}

interface TabState {
  job: Loading<string>;
  dashboard: Loading<string>;
  roleId: Loading<number>;
}

const InitState: Loadable<InboxSummary> & TabState = {
  job: 'loading',
  dashboard: 'loading',
  inbox: 'loading',
  held: 'loading',
  advanced: 'loading',
  rejected: 'loading',
  unqualified: 'loading',
  qualified: 'loading',
  roleId: 'loading'
};

export const InboxTab = ({ active, label, qty, onClick }: TabProps) => {
  const font = active ? styles.tabActive : '';
  const handle = active ? <div className={styles.tabHandle} /> : <div />;

  return (
    <li className={styles.tab} onClick={onClick}>
      {handle}
      <p className={`${font} ${styles.tabLabel}`}>
        <span>{label}</span>
        {qty ? <span className={styles.qty}>({qty})</span> : ''}
      </p>
    </li>
  );
};

export const Role = ({role}: any) => (
  <header>
    <h2 className={styles.containerRoleHeader}>{role}</h2>
  </header>
);

export default class InboxTabs extends Component<RouteComponentProps<CandidateParams>, TabState & Loadable<InboxSummary>> {

  public state = InitState;

  public componentDidMount() {
    const { candidateId } = this.props.match.params;

    api.getApplication(+candidateId)
      .then((application: Application)  => {
        const roleId = application.jobId;

        this.setState({roleId});

        api.getJobSummaries()
          .then(jobs => jobs.find(summary => summary.id === +roleId))
          .then(job => {
            if (job) {
              this.setState({
                job: job.name,
                dashboard: ''
              });
            }
          });

        api.getJobInbox(roleId)
          .then(inboxState => {
            inboxState !== null ?
              this.setState({ ...inboxState })
              :
              this.setState({
                held: 'error',
                inbox: 'error',
                advanced: 'error',
                rejected: 'error',
                qualified: 'error',
                unqualified: 'error'
              });
          });
      });
  }

  public render() {
    const { job, inbox, advanced, held, rejected, qualified, unqualified, roleId } = this.state;
    const LoadingTab = loadingByField(InboxTab);
    const LoadingRole = loadingByField(Role);
    return (
      <section className={styles.container}>
        <LoadingRole
          loadingIndicator={<SVGLoader />}
          role={job}
        />
        <nav className={styles.containerNav}>
          {/* <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={false}
            qty={dashboard}
            label="Role Dashboard"
            onClick={() => this.props.history.push(`/role/${roleId}/dashboard/all/chrono`)}
          /> */}
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={false}
            label="Talent Inbox"
            qty={inbox}
            onClick={() => this.props.history.push(`/role/${roleId}/new/all/chrono`)}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={false}
            label="Held Talent"
            qty={held}
            onClick={() => this.props.history.push(`/role/${roleId}/held/all/chrono`)}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={false}
            label="Advanced Talent"
            qty={advanced}
            onClick={() => this.props.history.push(`/role/${roleId}/advanced/all/chrono`)}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={false}
            label="Rejected Talent"
            qty={rejected}
            onClick={() => this.props.history.push(`/role/${roleId}/rejected/all/chrono`)}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={false}
            label="All Qualified Talent"
            qty={qualified}
            onClick={() => this.props.history.push(`/role/${roleId}/qualified/all/chrono`)}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={false}
            label="Did Not Qualify"
            qty={unqualified}
            onClick={() => this.props.history.push(`/role/${roleId}/unqualified/all/chrono`)}
          />
        </nav>
      </section>
    );
  }
}
