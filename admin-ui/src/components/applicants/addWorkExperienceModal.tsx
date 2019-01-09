import * as React from 'react';
import { Component } from 'react';
import Modal from './../modal/modal';
import { Application, WorkExperienceBean } from './../../types/domainTypes';
import { TextInputComponent, SelectInputComponent } from './../input-components/inputComponent';
import api from './../../services/api';

import * as styles from './applicants.css';

const addWorkExperience: WorkExperienceBean = {
  id: null,
  organization: '',
  description: '',
  jobTitle: '',
  startYearMonth: '',
  endYearMonth: '',
  isCurrentEmployer: false,
  attribution: 'other'
};

const attributionKeys = [
  'linkedIn',
  'resume',
  'chat',
  'ats',
  'other'
];

class AddWorkExperienceModal extends Component<Application> {
  public state = {...this.props};

  constructor(props: any) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  render() {

    return (
      <Modal
        label="Add Work Experience"
        labelType="button"
        body={
          <form
            className={styles.form}
            onSubmit={this.onSubmitForm}
          >
            <fieldset>
              <TextInputComponent
                htmlLabel="jobTitle"
                textLabel="Job Title"
                handleChange={(e: any) => addWorkExperience.jobTitle = e.target.value}
              />
              <TextInputComponent
                htmlLabel="description"
                textLabel="Description"
                handleChange={(e: any) => addWorkExperience.description = e.target.value}
              />
              <TextInputComponent
                htmlLabel="organization"
                textLabel="Organization"
                handleChange={(e: any) => addWorkExperience.organization = e.target.value}
              />
              <TextInputComponent
                htmlLabel="startYearMonth"
                textLabel="Start Year & Month"
                handleChange={(e: any) => addWorkExperience.startYearMonth = e.target.value}
              />
              <TextInputComponent
                htmlLabel="endYearMonth"
                textLabel="End Year & Month"
                handleChange={(e: any) => addWorkExperience.endYearMonth = e.target.value}
              />
              <SelectInputComponent
                htmlLabel="attribution"
                textLabel="Attribution"
                handleChange={(e: any) => addWorkExperience.attribution = e.target.value}
                defaultValue={addWorkExperience.attribution}
                options={attributionKeys}
              />
            </fieldset>

            <fieldset>
              <button type="submit" className="defaultButton">Save Work Experience</button>
            </fieldset>
          </form>
        }
      />
    );
  }

  private onSubmitForm (e: any) {
    e.preventDefault();
    this.state.personBean.workExperiences.push(addWorkExperience);
    api
      .saveApplication(this.state)
      .then(v => console.log(v, ':ADD WORK EXPERIENCE API UPDATE'))
      .catch(v => alert('There was an error creating this record. Most likely some of your fields are not formed correctly.'));
  }

}

export default AddWorkExperienceModal;
