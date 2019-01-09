import * as React from 'react';
import { Component } from 'react';
import Modal from './../modal/modal';
import api from './../../services/api';
import { Application, EducationBean } from './../../types/domainTypes';
import { TextInputComponent, SelectInputComponent } from './../input-components/inputComponent';

import * as styles from './applicants.css';

const addEducation: EducationBean = {
  id: null,
  subject: '',
  degree: 'UNRECOGNIZED',
  institution: '',
  graduationYearMonth: '',
  gpa: null,
  attribution: 'other',
};

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

const attributionKeys = [
  'linkedIn',
  'resume',
  'chat',
  'ats',
  'other'
];

class AddEducationModal extends Component<Application> {
  public state = {...this.props};

  constructor(props: any) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  render() {
    return (
      <Modal
        label="Add Education"
        labelType="button"
        body={
          <form
            onSubmit={this.onSubmitForm}
            className={styles.form}
          >
            <fieldset>
              <SelectInputComponent
                htmlLabel="degree"
                textLabel="Degree"
                handleChange={(e: any) => addEducation.degree = e.target.value}
                defaultValue={addEducation.degree}
                options={selectOptionValues}
              />
              <TextInputComponent
                htmlLabel="subject"
                textLabel="Subject"
                handleChange={(e: any) => addEducation.subject = e.target.value}
              />
              <TextInputComponent
                htmlLabel="institution"
                textLabel="Institution"
                handleChange={(e: any) => addEducation.institution = e.target.value}
              />
              <TextInputComponent
                htmlLabel="graduation"
                textLabel="Graduation Date"
                handleChange={(e: any) => addEducation.graduationYearMonth = e.target.value}
              />
              <TextInputComponent
                htmlLabel="gpa"
                textLabel="GPA"
                handleChange={(e: any) => addEducation.gpa = +e.target.value}
              />
              <SelectInputComponent
                htmlLabel="attribution"
                textLabel="Attribution"
                handleChange={(e: any) => addEducation.attribution = e.target.value}
                defaultValue={addEducation.attribution}
                options={attributionKeys}
              />
            </fieldset>

            <fieldset>
              <button type="submit" className="defaultButton">Save Education</button>
            </fieldset>
          </form>
        }
      />
    );
  }

  private onSubmitForm (e: any) {
    e.preventDefault();
    api.saveApplication(this.state)
      .then(v => console.log(v, ':ADD EDUCATION API CALL'))
      .catch(v => alert('There was an error creating this record. Most likely some of your fields are not formed correctly.'));
  }

}

export default AddEducationModal;
