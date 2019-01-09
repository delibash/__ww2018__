import * as React from 'react';
import { Component } from 'react';
import { Application } from './../../types/domainTypes';
import api from 'src/services/api';

const evalKeys = [
  'IDEAL',
  'QUALIFIED',
  'UNQUALIFIED'
];

class Evaluation extends Component<Application> {
  public state = {...this.props};

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  public componentWillReceiveProps(nextProps: Application) {
      this.setState({...this.state, ...nextProps});
  }

  render () {
    return (
      <div className="dropdownWrapper">
        <select
          className="dropdown"
          onChange={this.handleChange}
          defaultValue={this.props.evaluation !== null ? this.props.evaluation.outcome : ''}
        >
          <option
            disabled={this.state.evaluation && this.state.evaluation.outcome !== null}
          >
            No Outcome
          </option>
          {evalKeys.map((opt, i) => <option key={i}>{opt}</option>)} 
        </select>
      </div>
    );
  }

  private handleChange (e: any) {
    e.preventDefault();
    this.setState(
      {
        evaluation: {
          ...this.props.evaluation,
          outcome: e.target.value
        }
      }, 
      () => api.saveApplication(this.state));
  }

}

export default Evaluation;