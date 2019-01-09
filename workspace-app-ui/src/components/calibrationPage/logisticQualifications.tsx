import * as React from 'react';
import { Component } from 'react';
import { Paper } from './../card/cardComponent';
import api from './../../services/api';
import { checkmark } from './../svg/svgObj';
import * as styles from './calibration.css';

interface LogisticQualificationsProps {
  jobId: number;
}

interface InputCheckboxProps {
  label: string;
  id: string;
  checked: boolean;
  handleRadioBtn: (e: any) => void;
}

interface StyleObject {
  wrapper: Object;
  selector: Object;
  radio: Object;
  active: Object;
  label: Object;
  inactiveLabel: Object;
}

interface CheckBoxState {
  checkedItems: any;
  knockOuts: Array<Object>;
}

const InitState: CheckBoxState = {
  checkedItems: new Map([]),
  knockOuts: []
};

const selectorStyles: StyleObject = {
  wrapper: {
    position: 'relative'
  },
  selector: {
    position: 'absolute',
    visibility: 'hidden'
  },
  radio: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '2rem',
    width: '2rem',
    border: '.2rem solid var(--lightBlue)',
    borderRadius: '100%'
  },
  active: {
    backgroundColor: 'var(--lightBlue)'
  },
  label: {
    fontSize: '1.4rem',
    fontWeight: 600,
    cursor: 'pointer'
  },
  inactiveLabel: {
    color: 'var(--gray)',
    fontWeight: 300
  }
};

class InputRadio extends Component<InputCheckboxProps> {
  render() {
    const { id, checked, handleRadioBtn, label } = this.props;
    return (
      <label htmlFor={id}>
        <div style={selectorStyles.wrapper}>
          <input
            style={selectorStyles.selector}
            type="checkbox"
            id={id}
            value={id}
            name="selector"
            checked={checked}
            onChange={handleRadioBtn}
          />
          <div style={checked ? { ...selectorStyles.radio, ...selectorStyles.active } : selectorStyles.radio}>
            {checked ? <div className={styles.svg}>{checkmark}</div> : ''}
          </div>
        </div>
        <span style={checked ? selectorStyles.label : { ...selectorStyles.label, ...selectorStyles.inactiveLabel }}>{label}</span>
      </label>
    );
  }
}

class LogisticQualifications extends Component<LogisticQualificationsProps> {
  public state = InitState;

  public constructor(props: any) {
    super(props);
    this.handleRadioBtn = this.handleRadioBtn.bind(this);
  }

  public handleRadioBtn(e: any) {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState((prevState: any) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));
  }

  public componentDidMount () {
    api.getEvalSummary(this.props.jobId)
      .then(res => {
        if (res) {
          res.knockOuts.map(v => {
            this.setState((prevState: any) => ({
              checkedItems: prevState.checkedItems.set(v.name, true),
              ...res
            }));
          });
        }
      });
  }

  public render() {
    const { checkedItems, knockOuts } = this.state;
    return (
      <Paper>
        <header>
          <h4>Logistic Qualifications</h4>
          <span className="blue-border-narrow" style={{ textTransform: 'uppercase' }}>Knock Out</span>
        </header>
        {knockOuts.map((k: any, i) => {
          const { name } = k;
          return (
            <section className={styles.qSection} key={i}>
              <header>
                <span>{name}</span>
                <strong />
              </header>
              <div className={styles.inputSection}>
                <InputRadio
                  label={name}
                  id={name}
                  checked={checkedItems.get(name)}
                  handleRadioBtn={this.handleRadioBtn}
                />
              </div>
            </section>
          );
        })}
      </Paper>
    );
  }
}

export default LogisticQualifications;
