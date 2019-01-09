import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as pathToRegexp from 'path-to-regexp';
import { RoleParams } from './../../../types/routingTypes';
import { barsTab } from './../../svg/svgObj';
import * as styles from './index.css';

type Handler = () => void;

interface TabProps {
  active: boolean;
  className: string;
  label:  Object | null;
  onClick: Handler;
}

export const Tab = ({active, className, label, onClick}: TabProps) => {
  const type = className === styles.toggleSummary ? <div>{label}</div> : <span>{label}</span>;
  const aktive = active ? styles.toggleActive : '';
  return (
    <a onClick={onClick} className={`${aktive} ${className}`}>
      {type}
    </a>
  );
};

export default class ToggleTabs extends Component<RouteComponentProps<RoleParams>> {
  public render () {
    const {score} = this.props.match.params;
    return (
      <div className={styles.toggleTabs}>
        <Tab
          active={score === 'ideal'}
          className={styles.toggleSummary}
          label={barsTab}
          onClick={this.curriedRouter('ideal')}
        />
        <Tab
          active={score === 'qualified'}
          className={styles.toggleExpanded}
          label=""
          onClick={this.curriedRouter('qualified')}
        />
      </div>
    );
  }

  // constructs url that will only change the viewType param
  private parseTab = (dest: string): string => {
      const match = this.props.match;
      const toPath = pathToRegexp.compile(match.path);
      const newPath = toPath({ ...match.params, viewType: dest});

      return newPath + this.props.location.search;
  }

  private curriedRouter = (destination: string): Handler => {
      return () => this.props.history.push(this.parseTab(destination));
  }

}
