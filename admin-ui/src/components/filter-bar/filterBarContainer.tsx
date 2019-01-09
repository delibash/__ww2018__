import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as pathToRegexp from 'path-to-regexp';

import * as styles from './filter-bar.css';

interface TabProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export const DashboardTab = ({ label, active, onClick }: TabProps) => {
  return (
    <li
      onClick={onClick}
      className={active ? `${styles.tab} ${styles.active}` : `${styles.tab}`}
    >
      {label}
    </li>
  );
};

export default class FilterBar extends Component<RouteComponentProps<{tab: string, pageId: string, recordsPerpage: string}>> {
  render() {
    const { tab } = this.props.match.params;
    return (
      <section className={styles.container}>
        <nav>
          <ul className={styles.tabs}>
            {
              ['applicants', 'companies', 'roles', 'users'].map((v, i) => {
                return (
                  <DashboardTab
                    key={i}
                    label={v}
                    active={tab === v}
                    onClick={this.curriedRouter(v)}
                  />
                );
              })
            }
          </ul>
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

  private curriedRouter = (destination: string): () => void => {
    return () => this.props.history.push(this.parseTab(destination));
  }
}
