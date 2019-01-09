import * as React from 'react';
import { Component } from 'react';
import { DataPointBean } from './../../types/domainTypes';
import EditableComponent from './../editableComponent/editableComponent';
import Modal from './../modal/modal';
import api from './../../services/api';

interface DataPointModalProps {
  person: number;
}

class DataPointModal extends Component<DataPointBean & DataPointModalProps> {
    public state = {
      ...this.props,
    };

    render() {
      const {
        conceptId,
        measureId,
        measureDataType,
        measurement,
        timeRecorded
      } = this.props;

      const {
        exact,
        inValue,
      } = measurement;

      return (
        <Modal
          label={this.props.id}
          body={
            <div>
              <p>
                <EditableComponent
                  label="Concept ID"
                  value={conceptId}
                  save={val => this.setState({ conceptId: val }, () => this.saveDataPoint())}
                />
              </p>
              <p>
                <EditableComponent
                  label="Measure ID"
                  value={measureId}
                  save={val => this.setState({ measureId: val }, () => this.saveDataPoint())}
                />
              </p>
              <p>
                <EditableComponent
                  label="Measure Data Type"
                  value={measureDataType}
                  save={val => this.setState({ measureDataType: val }, () => this.saveDataPoint())}
                />
              </p>
              <p>
                <EditableComponent
                  label="Exact Measurement"
                  value={exact}
                  editType="selectOption"
                  selectValues={['true', 'false']}
                  saveSelectedOption={val => this.setState({ measurement: { exact: JSON.parse(val) } }, () => this.saveDataPoint())}
                />
              </p>
              <p>
                <EditableComponent
                  label="inValue"
                  value={inValue}
                  editType="selectOption"
                  selectValues={['true', 'false']}
                  saveSelectedOption={val => this.setState({ measurement: { inValue: JSON.parse(val) } }, () => this.saveDataPoint())}
                />
              </p>
              {
                this.state.measurement.exact ?
                  <p>
                    <EditableComponent
                      label="Exact measurement value"
                      value={measurement.value !== null ? measurement.value : ''}
                      save={val => this.setState({ measurement: { value: val } }, () => this.saveDataPoint())}
                    />
                  </p>
                  :
                  <>
                    <p>
                      <EditableComponent
                        label="Lower Bound Value"
                        value={this.props.measurement.lowerBound !== null ? this.props.measurement.lowerBound.value : ''}
                        save={val => this.setState(
                          { measurement: { ...measurement, lowerBound : { ...measurement.lowerBound, value: val }} },
                          () => this.saveDataPoint())}
                      />
                    </p>
                    <p>
                      <EditableComponent
                        label="Lower Bound: Inclusive | Not Inclusive"
                        value={this.props.measurement.lowerBound !== null ? this.props.measurement.lowerBound.inclusive : false}
                        editType="selectOption"
                        selectValues={['true', 'false']}
                        saveSelectedOption={val => this.setState(
                          { measurement: { ...measurement, lowerBound : { ...measurement.lowerBound, inclusive: JSON.parse(val) }} },
                          () => this.saveDataPoint())}
                      />
                    </p>
                    <p>
                      <EditableComponent
                        label="Upper Bound Value"
                        value={this.props.measurement.upperBound !== null ? this.props.measurement.upperBound.value : ''}
                        save={val => this.setState(
                          { measurement: { ...measurement, upperBound : { ...measurement.upperBound, value: val }} },
                          () => this.saveDataPoint())}
                      />
                    </p>
                    <p>
                      <EditableComponent
                        label="Upper Bound: Inclusive | Not Inclusive"
                        value={this.props.measurement.upperBound !== null ? this.props.measurement.upperBound.inclusive : false}
                        editType="selectOption"
                        selectValues={['true', 'false']}
                        saveSelectedOption={val => this.setState(
                          { measurement: { ...measurement, upperBound : { ...measurement.upperBound, inclusive: JSON.parse(val) }}},
                          () => this.saveDataPoint())}
                      />
                    </p>
                  </>
              }
              <p>
                <EditableComponent
                  label="Measurement Value"
                  value={measurement.value}
                  save={val => this.setState({ measurement: {value: val} }, () => this.saveDataPoint())}
                />
              </p>
              <p>
                <EditableComponent
                  label="Time Recorded"
                  value={timeRecorded}
                  save={val => this.setState({ timeRecorded: val }, () => this.saveDataPoint())}
                />
              </p>
            </div>
          }
        />
      );
    }

    private saveDataPoint = (): void => {
      api
        .saveDataPoint(this.state.person, this.state);
    }
}

export default DataPointModal;
