import * as React from 'react';
import { Component } from 'react';
import * as pathToRegexp from 'path-to-regexp';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RoleParams } from '../../../types/routingTypes';
import { SVG } from './../../svg/svgs';
import * as styles from './options.css';
import * as svgStyles from './../../svg/index.css';

type Handler = () => void;

interface OptionProps {
    value: string;
    label: string;
    active: boolean;
    onChange: Handler;
}

export const Option = ({value, label, active, onChange}: OptionProps) => {
    const aktive = active ? 'active' : 'inactive';
    return (
        <div className={`${aktive} ${styles.option}`}>
          <label htmlFor={value}>
            {label}
            <input
              type="radio"
              name={value}
              id={value}
              onChange={onChange}
              checked={aktive === 'active'}
            />
          </label>
        </div>
    );
};

class FilterOptions extends Component<RouteComponentProps<RoleParams>, any> {

    private dropdown: HTMLDivElement;

    constructor(props: any) {
        super(props);
        this.state = { isActive: false };
    }

    onOutsideClick = (e: any) => {
      this.dropdown.contains(e.target) ?
        this.setState({ isActive: true }) :
        this.setState({ isActive: false });
    }

    componentWillMount () {
      document.addEventListener('mousedown', this.onOutsideClick, false);
    }

    componentWillUnmount () {
      document.removeEventListener('mousedown', this.onOutsideClick, false);
    }

    public render() {
        const { sort } = this.props.match.params;
        const handle = sort === 'chrono' ?
                          'Most Recent' : sort === 'match' ?
                          'Best Match' : sort === 'rubric' ?
                          'Rubrics' : '';

        return (
            <section className={styles.container}>
              <header className="options-header"><h3>Sort By</h3></header>
                <div
                  ref={(node: any) => { this.dropdown = node; }}
                  attr-id={sort}
                  className={`${styles.containerSorter} ${this.state.isActive ? styles.containerSorterActive : ''}`}
                >
                  <div className={styles.handle} onClick={this.onOutsideClick}>
                    {handle}
                    <SVG viewBox="0 0 13.5 7.5" path="M.75.89l5.93 5.86 6.07-6" className={svgStyles.chevronDown} />
                  </div>

                  <Option
                    active={sort === 'chrono'}
                    value="chrono"
                    label="Most Recent"
                    onChange={this.curriedRouter('chrono')}
                  />

                  <Option
                    active={sort === 'match'}
                    value="match"
                    label="Best Match"
                    onChange={this.curriedRouter('match')}
                  />

                  <Option
                    active={sort === 'rubric'}
                    value="rubric"
                    label="Rubrics"
                    onChange={this.curriedRouter('rubric')}
                  />
                </div>
            </section>
        );
    }

    // constructs url that will only change the sort param
    private parseDestination = (dest: string): string => {
        const match = this.props.match;
        const toPath = pathToRegexp.compile(match.path);
        const newPath = toPath({ ...match.params, sort: dest});

        return newPath + location.search;
    }

    private curriedRouter = (destination: string): Handler => {
        return () => {
          this.props.history.push(this.parseDestination(destination));
          this.setState({isActive: false});
        };
    }

}

export default withRouter(FilterOptions);
