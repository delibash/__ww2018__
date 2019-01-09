import * as React from 'react';
import { Component } from 'react';
import { SVG } from './../svg/svgs';

import * as styles from './dropdown.css';
import * as svgStyles from './../svg/index.css';

type Handler = () => void;

interface Option {
  name: string;
  value: number;
}

interface OptionProps {
  value: string;
  label: string;
  active: boolean;
  onChange: Handler;
}

interface DropdDownProps {
  options: Array<Option>;
  match?: any;
  onChange?: (option: Option) => void;
  overwriteStyles?: string;
}

const InitState = {
  isActive: false,
  activeTab: 0
};

export const Option = ({ value, label, active, onChange }: OptionProps) => {
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

class Dropdown extends Component<DropdDownProps> {
  public state = InitState;

  private dropdown: HTMLDivElement;

  public componentWillMount() {
    document.addEventListener('mousedown', this.onOutsideClick, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
  }

  public componentDidUpdate(prevProps: DropdDownProps, prevState: typeof InitState) {
    const { onChange, options } = this.props;
    const { activeTab } = this.state;

    if (onChange && prevState.activeTab !== activeTab) {
      onChange(options[activeTab]);
    }
  }

  public render() {
    const { options, overwriteStyles } = this.props;
    const { activeTab } = this.state;
    const handle = options[activeTab].name;
    return (
      <div className={!overwriteStyles ? styles.wrapper : `${styles.wrapper} ${overwriteStyles}`}>
        <div
          className={`${styles.containerSorter} ${this.state.isActive ? styles.containerSorterActive : ''}`}
          attr-id={activeTab}
          ref={(node: any) => { this.dropdown = node; }}
        >
          <div className={styles.handle} onClick={this.onOutsideClick}>
            {handle}
            <SVG viewBox="0 0 13.5 7.5" path="M.75.89l5.93 5.86 6.07-6" className={svgStyles.chevronDown} />
          </div>
          {options && options.map((opt: any, i) => {
            const { value, name } = opt;
            return (
              <Option
                key={i}
                value={value}
                label={name}
                active={activeTab === i}
                onChange={() => this.setState({activeTab: i, isActive: false})}
              />
            );
          })}
        </div>
      </div>
    );
  }

  private onOutsideClick = (e: any) => this.setState({ isActive: this.dropdown.contains(e.target) ? true : false });
}

export default Dropdown;
