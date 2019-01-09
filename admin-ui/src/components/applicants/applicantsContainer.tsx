import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from './../card/cardComponent';
import { Application } from './../../types/domainTypes';
import { Loading } from './../../types/utilityTypes';
import { loadingByObject } from '../higher-order-components/loadingHOC';
import DataPoints from './dataPoints';
import { SVGLoader } from './../svg/svgObj';
import EditableComponent from './../editableComponent/editableComponent';
import EducationContainer from './education';
import Evaluation from './evaluation';
import WorkExperience from './workExperience';
import api from './../../services/api';
import { StaticFilterBar } from './../filter-bar/staticFilterBar';

import * as styles from './applicants.css';
import * as appStyles from './../app.css';

const inlineStyles = {
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toggle: {
    padding: '0 .8rem',
    border: '.2rem solid var(--blue)',
  }
};

interface ContainerState {
  application: Loading<Application>;
}

const InitContainerState: ContainerState = {
  application: 'loading'
};

class Applicant extends Component<Application> {
  public state = { ...this.props };

  render() {
    const {
      id,
      personBean,
      job
    } = this.props;

    const {
      firstName,
      lastName,
      address,
      email,
      phone,
      linkedInUrl,
    } = personBean;

    const {
      company,
      name
    } = job;

    const score = this.state.evaluation
      ? this.state.evaluation.score
      : 'Not Evaluated';

    return (
      <section>
      <h3 className={styles.masthead}>Applicant: {firstName} {lastName}</h3>
      <Card>
        <section className={styles.section} style={{display: 'flex', padding: 0, marginBottom: '1.2rem'}}>
          <p style={{flex: 1}}>First Name: <strong>{firstName}</strong></p>
          <p style={{flex: 1}}>Last Name: <strong>{lastName}</strong></p>
        </section>
        <section className={styles.section}>
          <p><strong>Applied to</strong></p>
          <Card customStyles={{maxWidth: 'none', minWidth: 'auto', margin: 0, padding: '1.4rem'}}>
            <section className={styles.section} style={{display: 'flex', paddingBottom: 0, marginBottom: '1rem'}}>
              <div style={{flex: 1}}>
                <p style={{margin: 0}}>Company: <strong>{company.name}</strong></p>
                <p>Application ID: <strong>{id}</strong></p>
              </div>
              <div style={{flex: 1}}>
                <p style={{margin: 0}}>Role: <strong>{name}</strong></p>
                <p>Role ID: <strong>{job.id}</strong></p>
              </div>
            </section>
            <section className={styles.section} style={{...inlineStyles.flexBetween, marginBottom: '1rem', paddingBottom: 0}}>
              <div>
                <p>Evaluation Score: <strong>{score}</strong></p>
                <div style={{marginBottom: '1.2rem'}}>
                  <Evaluation {...this.state} />
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'flex-end', flexFlow: 'column'}}>
                <button
                  onClick={this.reEvaluateApp}
                  className="smallButton"
                  style={{marginBottom: '1.2rem'}}
                >
                  Re-Evaluate
                </button>
                <button
                  className="defaultButton"
                  style={this.isPublishDisabled() ? {backgroundColor: '#ccc', marginBottom: '1.2rem'} : {marginBottom: '1.2rem'}}
                  disabled={this.isPublishDisabled()}
                  onClick={this.publishApplication}
                >
                  Publish Applicant
                </button>
              </div>
            </section>
            <section className={styles.section} style={{padding: 0}}>
              <a href="#">View Transcript</a>
            </section>
          </Card>
        </section>

        <section className={styles.section}>
          <header>
            <h3>Personal Info</h3>
          </header>
          <ul style={{paddingLeft: '1rem'}}>
            <li>
              <EditableComponent
                label="Address"
                value={address}
                save={val => this.setState(
                  { personBean: { ...this.state.personBean, address: val } },
                  () => this.saveApplication())}
              />
            </li>
            <li>
              <EditableComponent
                label="Phone"
                value={phone}
                save={val => this.setState(
                  { personBean: { ...this.state.personBean, phone: val } },
                  () => this.saveApplication())}
              />
            </li>
            <li>
              <EditableComponent
                label="Email"
                value={email}
                save={val => this.setState(
                  { personBean: { ...this.state.personBean, email: val } },
                  () => this.saveApplication())}
              />
            </li>
            <li>
              <EditableComponent
                label="LinkedIn Profile"
                value={linkedInUrl}
                save={val => this.setState(
                  { personBean: { ...this.state.personBean, linkedInUrl: val } },
                  () => this.saveApplication())}
              />
            </li>
          </ul>
          <p style={{margin: '1rem 0 0 0', paddingLeft: '1rem'}}>
            <a href="#">View Resume</a>
          </p>
        </section>

        <section className={styles.section} style={{paddingBottom: '1rem'}}>
          <DataPoints {...this.props} />
        </section>

        <section className={styles.section} style={{paddingBottom: '1rem'}}>
          <WorkExperience {...this.props} />
        </section>

        <section className={styles.section} style={{paddingBottom: '1rem'}}>
          <EducationContainer {...this.props} />
        </section>

      </Card>
      </section>
    );
  }

  private isPublishDisabled = (): boolean => {
    return this.state.published || !(this.state.evaluation && this.state.evaluation.outcome);
  }

  private publishApplication = () => {
    api.publishApplication(this.props.id)
      .then(app => {
        if (app === 'OK') {
          /* we dont pull in the entire application again so we artificially
          * set the state published flag to true if the api call is successful
          */
          this.setState({...this.state, published: true});
        }
      })
      .catch(console.log);
  }

  private reEvaluateApp = () => {
    api.reEvaluate(this.props.id, this.props.personBean.dataPoints || [])
      .then(evaluation => {
        this.setState({...this.state, evaluation});
      })
      .catch(console.log);
  }

  private saveApplication = () => {
    api.saveApplication(this.state);
  }
}

interface ApplicationRouteParams {
  id: string;
}

class ApplicantContainer extends Component<RouteComponentProps<ApplicationRouteParams>, ContainerState> {
  public state = InitContainerState;

  public componentDidMount() {
    const { id } = this.props.match.params;
    api.getApplicationById(+id)
      .then(application => this.setState({ application }));
  }

  render() {
    const { application } = this.state;
    const LoadingApplicant = loadingByObject(Applicant);
    return (
      <section className={`${appStyles.navContainerGrid} ${styles.container}`}>
        <StaticFilterBar />        
        <LoadingApplicant
          loadingIndicator={<SVGLoader />}
          props={application}
        />
      </section>

    );
  }
}

export default ApplicantContainer;
