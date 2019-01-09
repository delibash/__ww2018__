import * as React from 'react';
import { Component } from 'react';
import { Application } from './../../types/domainTypes';
import AddEducationModal from './addEducationModal';
import EditableComponent from './../editableComponent/editableComponent';
import Modal from './../modal/modal';
import api from './../../services/api';

const selectOptionValues = [
  'UNRECOGNIZED',
  'BACHELORS',
  'BACHELOR_OF_ARTS',
  'BACHELOR_OF_SCIENCE',
  'MASTERS',
  'MASTERS_OF_ARTS',
  'MASTERS_OF_SCIENCE',
  'PHD'
];

class EducationContainer extends Component<Application> {
  public state = { ...this.props };

  public componentWillReceiveProps(nextProps: Application) {
    this.setState({...this.state, ...nextProps});
  }

  public render () {
    const {
      educations
    } = this.props.personBean;

    const updatedObject = {
      ...this.state,
      personBean: {
        ...this.state.personBean,
        educations: [
          ...this.state.personBean.educations
        ]
      }
    };

    return (
      <>
      {
        educations && educations.length > 0 ?
        <>
        <header className="flexBetween">
          <h3>Education</h3>
          <AddEducationModal {...this.props} />
        </header>
        <ul style={{paddingLeft: '1rem'}}>
          {educations.map((v: any, i: number) => {
            const {
              degree,
              gpa,
              institution,
              subject,
              graduationYearMonth
            } = v;
            return (
              <li key={i}>
                <Modal
                  label={degree}
                  type="education"
                  body={
                    <div>
                      <p>
                        <EditableComponent
                          label="Degree"
                          value={degree}
                          editType="selectOption"
                          selectValues={selectOptionValues}
                          saveSelectedOption={val => {
                            this.state.personBean.educations[i].degree = val;
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                      <p>
                        <EditableComponent
                          label="GPA"
                          value={gpa}
                          save={val => {
                            this.state.personBean.educations[i].gpa = +val;
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                      <p>
                        <EditableComponent
                          label="Institution"
                          value={institution}
                          save={val => {
                            this.state.personBean.educations[i].institution = val;
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                      <p>
                        <EditableComponent
                          label="Subject"
                          value={subject}
                          save={val => {
                            this.state.personBean.educations[i].subject = val;
                            this.setState(updatedObject), () => api.saveApplication(this.state);
                          }}
                        />
                      </p>
                      <p>
                        <EditableComponent
                          label="Graduation Year & Month"
                          value={graduationYearMonth}
                          save={val => {
                            this.state.personBean.educations[i].graduationYearMonth = val;
                            this.setState(updatedObject), () => api.saveApplication(this.state);
                          }}
                        />
                      </p>
                    </div>
                  }
                />
                {
                  graduationYearMonth ?
                  <p><sup>{graduationYearMonth}</sup></p>
                  :
                  ''
                }
              </li>
            );
          })}
        </ul>
        </>
        :
        <header className="flexBetween">
          <h3>Education</h3>
          <AddEducationModal {...this.props} />
        </header>
      }
      </>
    );
  }
}

export default EducationContainer;
