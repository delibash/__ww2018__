import * as React from 'react';
import { Component } from 'react';
import Modal from './../modal/modal';
import { DataPointBean, PersonBean } from './../../types/domainTypes';
import { TextInputComponent, CheckBoxInputComponent } from './../input-components/inputComponent';
import api from './../../services/api';

import * as styles from './applicants.css';

const addDataPoint: DataPointBean = {
  id: null,
  conceptId: '',
  measureId: '',
  measureDataType: '',
  measurement: {
    exact: false,
    inValue: false,
    value: '',
    lowerBound: {
      value: '',
      inclusive: false
    },
    upperBound: {
      value: '',
      inclusive: false
    }
  },
  timeRecorded: null,
  person: ''
};

interface AddDataPointModalProps {
  person: PersonBean;
}

class AddDataPointsModal extends Component<AddDataPointModalProps & any> {
  public state = {...addDataPoint, person: this.props.person};

  constructor(props: any) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  render() {
    const { measurement } = this.state;

    return (
      <Modal
        label="Add Data Point"
        labelType="button"
        body={
          <form
            className={styles.form}
            onSubmit={this.onSubmitForm}
          >
            <fieldset>
              <TextInputComponent
                htmlLabel="conceptId"
                textLabel="Concept ID"
                handleChange={e => this.setState({conceptId: e.target.value})}
              />
              <TextInputComponent
                htmlLabel="measureId"
                textLabel="Measure ID"
                handleChange={e => this.setState({measureId: e.target.value})}
              />
              <TextInputComponent
                htmlLabel="measureDataType"
                textLabel="Measure Data Type"
                handleChange={e => this.setState({measureDataType: e.target.value})}
              />
              <CheckBoxInputComponent
                htmlLabel="measurement"
                textLabel="Exact Measurement"
                checked={measurement.exact}
                handleChange={
                  () => {
                    this.setState({
                      measurement: {
                        lowerBound: measurement.exact ? {
                          value: '',
                          inclusive: false
                        } : null,
                        upperBound: measurement.exact ? {
                          value: '',
                          inclusive: false
                        } : null,
                        exact: !measurement.exact,
                        value: '',
                        inValue: !measurement.inValue
                      }
                    });
                  }
                }
              />

              {
                !measurement.exact ?
                <>
                  <TextInputComponent htmlLabel="lowerBound" textLabel="Lower Bound" customStyle={{marginRight: '2rem'}} />
                  <CheckBoxInputComponent
                    htmlLabel="lowerBoundInclusive"
                    textLabel={measurement.lowerBound && measurement.lowerBound.inclusive ? 'Inclusive Lower Bound' : 'Not Inclusive Lower Bound'}
                    checked={measurement.lowerBound === null ? false : measurement.lowerBound.inclusive}
                    handleChange={
                      () => {
                        this.setState({
                          measurement: {
                            ...measurement,
                            lowerBound : {
                              ...measurement.lowerBound,
                              inclusive: measurement.lowerBound === null ? false : !measurement.lowerBound.inclusive
                            },
                          }
                        });
                      }
                    }
                  />
                  <TextInputComponent htmlLabel="upperBound" textLabel="Upper Bound" customStyle={{marginRight: '2rem'}} />
                  <CheckBoxInputComponent
                    htmlLabel="upperBoundInclusive"
                    textLabel={measurement.upperBound && measurement.upperBound.inclusive ? 'Inclusive Upper Bound' : 'Not Inclusive Upper Bound'}
                    checked={measurement.upperBound === null ? false : measurement.upperBound.inclusive}
                    handleChange={
                      () => {
                        this.setState({
                          measurement: {
                            ...measurement,
                            upperBound : {
                              ...measurement.upperBound,
                              inclusive: measurement.upperBound === null ? false : !measurement.upperBound.inclusive
                            },
                          }
                        });
                      }
                    }
                  />
                </>
                :
                <TextInputComponent
                  htmlLabel="measurementValue"
                  textLabel="Measurement Value"
                  handleChange={e => this.setState({measurement: {...measurement, value: e.target.value}})}
                />
              }

              <TextInputComponent
                htmlLabel="timeRecorded"
                textLabel="Time Recorded"
                handleChange={e => this.setState({timeRecorded: e.target.value})}
              />

            </fieldset>

            <fieldset>
              <button type="submit" className="defaultButton">Save Data Point</button>
            </fieldset>
          </form>
        }
      />
    );
  }

  private onSubmitForm (e: any) {
    e.preventDefault();
    api
      .saveDataPoint(this.props.person.id, this.state)
      .catch(v => alert('There was an error creating this record. Most likely some of your fields are not formed correctly.'));
  }

}

export default AddDataPointsModal;
