import * as React from 'react';
import { Component } from 'react';
import * as pathToRegexp from 'path-to-regexp';
import { RouteComponentProps } from 'react-router-dom';
import { loadingByField } from './../../higher-order-components/loadingHOC';
import * as styles from './../filter-bar/options.css';

type Handler = () => void;

interface Props {
    value: string;
    label: string;
    active: boolean;
    handleChange: Handler;
}

export const Option = ({value, label, active, handleChange}: Props) => {
    const aktive = active ? 'active' : 'inactive';
    return (
        <li className={`${aktive}`}>
          <label htmlFor={value}>
            <input
              type="radio"
              name={value}
              id={value}
              onChange={handleChange}
              checked={active}
            />
            <span className={styles.radio} />
            <span>{label}</span>
          </label>
        </li>
    );
};

class ViewOptions extends Component<RouteComponentProps<any>> {
  public render() {
    const { filter } = this.props.match.params;
    const LoadingOption = loadingByField(Option);
    return (
      <section className={styles.container}>
        <header><h3>Viewing</h3></header>
        <ul className={styles.containerViews}>
          <LoadingOption
            active={filter === 'all'}
            value="all"
            label="All Roles"
            handleChange={this.curriedRouter('all')}
          />
          <LoadingOption
            active={filter === 'unpublished'}
            value="unpublished"
            label={`Unpublished Roles`}
            handleChange={this.curriedRouter('unpublished')}
          />
          <LoadingOption
            active={filter === 'live'}
            value="live"
            label={`Live Roles`}
            handleChange={this.curriedRouter('live')}
          />
        </ul>
      </section>
    );
  }

  // constructs url that will only change the sort param
  private parseDestination = (dest: string): string => {
      const match = this.props.match;
      const toPath = pathToRegexp.compile(match.path);
      const newPath = toPath({ ...match.params, filter: dest});

      return newPath + location.search;
  }

  private curriedRouter = (destination: string): Handler => {
      return () => {
        this.props.history.push(this.parseDestination(destination));
      };
  }
}

export default ViewOptions;
