import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as pathToRegexp from 'path-to-regexp';
import { RoleParams } from '../../../types/routingTypes';
import api from './../../../services/api';
import { Loading, Loadable } from './../../../types/utilityTypes';
import { InboxSummary } from './../../../types/domainTypes';
import { loadingByField } from './../../higher-order-components/loadingHOC';
import { SVGLoader } from './../../svg/svgObj';
import * as styles from './inbox.css';

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
}

const InitState: Loadable<InboxSummary> & TabState = {
  job: 'loading',
  dashboard: 'loading',
  inbox: 'loading',
  held: 'loading',
  advanced: 'loading',
  rejected: 'loading',
  unqualified: 'loading',
  qualified: 'loading'
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

export default class InboxTabs extends Component<RouteComponentProps<RoleParams>, TabState & Loadable<InboxSummary>> {

  public state = InitState;

  public componentDidMount() {
    const { roleId } = this.props.match.params;

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

    api.getJobInbox(Number(roleId))
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
  }

  public render() {
    const { tab } = this.props.match.params;
    const { job, inbox, advanced, held, rejected, qualified, unqualified } = this.state;
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
            active={tab === 'dashboard'}
            label="Role Dashboard"
            qty={dashboard}
            onClick={this.curriedRouter('dashboard')}
          /> */}
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={tab === 'new'}
            label="Talent Inbox"
            qty={inbox}
            onClick={this.curriedRouter('new')}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={tab === 'held'}
            label="Held Talent"
            qty={held}
            onClick={this.curriedRouter('held')}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={tab === 'advanced'}
            label="Advanced Talent"
            qty={advanced}
            onClick={this.curriedRouter('advanced')}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={tab === 'rejected'}
            label="Rejected Talent"
            qty={rejected}
            onClick={this.curriedRouter('rejected')}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={tab === 'qualified'}
            label="All Qualified Talent"
            qty={qualified}
            onClick={this.curriedRouter('qualified')}
          />
          <LoadingTab
            loadingIndicator={<SVGLoader />}
            active={tab === 'unqualified'}
            label="Did Not Qualify"
            qty={unqualified}
            onClick={this.curriedRouter('unqualified')}
          />
        </nav>
      </section>
    );
  }

  // constructs url that will only change the tab param
  private parseTab = (dest: string): string => {
    const match = this.props.match;
    const toPath = pathToRegexp.compile(match.path);
    const newPath = toPath({ ...match.params, tab: dest });

    return newPath + this.props.location.search;
  }

  private curriedRouter = (destination: string): Handler => {
    return () => this.props.history.push(this.parseTab(destination));
  }
}
