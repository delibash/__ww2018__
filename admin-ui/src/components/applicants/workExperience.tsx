import * as React from 'react';
import { Component } from 'react';
import { Application } from './../../types/domainTypes';
import AddWorkExperienceModal from './addWorkExperienceModal';
import EditableComponent from './../editableComponent/editableComponent';
import Modal from './../modal/modal';
import api from './../../services/api';

class WorkExperience extends Component<Application> {
  public state = { ...this.props };

  public componentWillReceiveProps(nextProps: Application) {
    this.setState({...this.state, ...nextProps});
  }

  public render() {
    const {
      workExperiences
    } = this.props.personBean;

    return (
      <>
        {
          workExperiences && workExperiences.length > 0 ?
          <>
          <header className="flexBetween">
            <h3>Work Experience</h3>
            <AddWorkExperienceModal {...this.props} />
          </header>
          <ul style={{paddingLeft: '1rem'}}>
          {workExperiences && workExperiences.map((v: any, i: number) => {
            const {
              isCurrentEmployer,
              description,
              startYearMonth,
              endYearMonth,
              jobTitle,
              organization,
              // attribution
            } = v;

            const updatedObject = {
              ...this.state,
              personBean: {
                ...this.state.personBean,
                workExperiences: [
                  ...this.state.personBean.workExperiences
                ]
              }
            };

            return (
              <li key={i}>
                <Modal
                  label={jobTitle || 'No Job Title'}
                  body={
                    <div>
                      <p>
                        <EditableComponent
                          label="Job"
                          value={jobTitle}
                          save={val => {
                            this.state.personBean.workExperiences[i].jobTitle = val;
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                      <p>
                        <EditableComponent
                          label="Description"
                          value={description}
                          editType="textarea"
                          save={val => {
                            this.state.personBean.workExperiences[i].description = val;
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                      <p>
                        <EditableComponent
                          label="Organization"
                          value={organization}
                          save={val => {
                            this.state.personBean.workExperiences[i].organization = val;
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                      <p>
                        <EditableComponent
                          label="Is Current Employer"
                          value={isCurrentEmployer}
                          editType="selectOption"
                          selectValues={['true', 'false']}
                          saveSelectedOption={val => {
                            this.state.personBean.workExperiences[i].isCurrentEmployer = JSON.parse(val);
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                      {/* <p>
                        <EditableComponent
                          label="Attribution"
                          value={attribution}
                          save={val => {
                            this.state.personBean.workExperiences[i].attribution = val;
                            this.setState(updatedObject);
                          }}
                        />
                      </p> */}
                      <p>
                        <EditableComponent
                          label="Start Year & Month"
                          value={startYearMonth}
                          save={val => {
                            this.state.personBean.workExperiences[i].startYearMonth = val;
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                      <p>
                        <EditableComponent
                          label="End Year & Month"
                          value={endYearMonth}
                          save={val => {
                            this.state.personBean.workExperiences[i].endYearMonth = val;
                            this.setState(updatedObject, () => api.saveApplication(this.state));
                          }}
                        />
                      </p>
                    </div>
                  }
                />
                <p style={{paddingLeft: '1rem'}}>
                  <span style={{ display: 'block' }}>Company: <strong>{organization}</strong></span>
                  <span style={{ display: 'block' }}>Start date: <strong>{startYearMonth}</strong></span>
                  <span style={{ display: 'block' }}>End date: <strong>{endYearMonth}</strong></span>
                </p>
              </li>
            );
          })}
          </ul>
          </>
          :
          <header className="flexBetween">
            <h3>Work Experience</h3>
            <AddWorkExperienceModal {...this.props} />
          </header>
        }
      </>
    );
  }
}

export default WorkExperience;
