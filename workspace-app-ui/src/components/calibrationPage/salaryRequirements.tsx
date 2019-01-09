import * as React from 'react';
import { Component } from 'react';
import { Paper } from './../card/cardComponent';
import api from './../../services/api';
import * as styles from './calibration.css';

interface InputFieldProps {
  label: string;
  icon?: any;
  min?: number;
  max?: number;
}

interface StyleObject {
  inputContainer: Object;
  input: Object;
  label: Object;
}

interface SalaryReqsProps {
  jobId: number;
}

const inputStyles: StyleObject = {
  inputContainer: {
    boxShadow: '0 0 6px 0 rgba(0,0,0,0.21)',
    padding: '.6rem 1.2rem'
  },
  input: {
    border: 'none',
    outline: 'none',
    padding: 0,
    fontSize: '1.4rem'
  },
  label: {
    display: 'flex',
    justifyContent: 'center'
  }
};

interface State {
  salaryMax: number;
  salaryMin: number;
}

const InitState: State = {
  salaryMax: 0,
  salaryMin: 0
};

const NumberInput = ({ label, icon, min, max }: InputFieldProps) => {
  return (
    <div
      style={inputStyles.inputContainer}
    >
      <label htmlFor={label} style={inputStyles.label}>
        {icon}
        <input
          id={label}
          type="number"
          style={inputStyles.input}
          placeholder={label}
          min={min}
          max={max}
        />
      </label>
    </div>
  );
};

class SalaryReqs extends Component<SalaryReqsProps> {
  public state = InitState;

  public componentDidMount () {
    api.getEvalSummary(this.props.jobId)
      .then(res => this.setState({...res}));
  }

  public render() {
    const { salaryMax, salaryMin } = this.state;
    return (
      <Paper>
        <header>
          <h4>Salary Requirements</h4>
          <p className="blue-border-narrow">If you’d like me to ask about the salary range, please make sure the fields are filled out.</p>
        </header>
        <section className={styles.salaryRange}>
          <div className={styles.rangeLeft}>
            <NumberInput
              label="Min"
              icon={<span style={{marginRight: '2rem'}}>$</span>}
              min={salaryMin}
              max={salaryMax}
            />
          </div>
          <div>&mdash;</div>
          <div className={styles.rangeRight}>
            <NumberInput
              label="Max"
              icon={<span style={{marginRight: '2rem'}}>$</span>}
              max={salaryMax}
              min={salaryMin}
            />
          </div>
        </section>
      </Paper>
    );
  }
}

export default SalaryReqs;
