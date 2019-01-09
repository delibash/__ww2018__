import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from './../card/cardComponent';
import { Job, ChatDescriptor } from './../../types/domainTypes';
import { Loading } from './../../types/utilityTypes';
import { loadingByField, loadingByObject } from '../higher-order-components/loadingHOC';
import { SVGLoader } from './../svg/svgObj';
import Modal from './../modal/modal';
import EditableComponent from './../editableComponent/editableComponent';
import api from './../../services/api';
import * as moment from 'moment';
import { StaticFilterBar } from './../filter-bar/staticFilterBar';
import { SelectInputComponent } from './../input-components/inputComponent';

import * as styles from './jobs.css';
import * as appStyles from './../app.css';

interface State {
  job: Loading<Job>;
}

const InitState: State = {
  job: 'loading',
};

export class JobDescriptionModal extends Component<Job> {
  public state = {...this.props};

  public componentDidUpdate() {
    api.saveJob(this.state)
      .then(v => console.log(v, 'SAVE JOB API CALL'))
      .catch(v => alert('There was an error creating this record. Most likely some of your fields are not formed correctly.'));
  }

  render() {
    const {
      title,
      location,
      source,
      soc,
      rawText,
      s3Link
    } = this.props.jobDescription;

    return (
      <Modal
        label="Job Description"
        type="jobDescription"
        body={
          <div>
            <p><EditableComponent label="Title" value={title} save={val => this.setState({...this.state, jobDescription: {...this.state.jobDescription, title: val}})} /></p>
            <p><EditableComponent label="Location" value={location} save={val => this.setState({...this.state, jobDescription: {...this.state.jobDescription, location: val}})} /></p>
            <p><EditableComponent label="Source" value={source} save={val => this.setState({...this.state, jobDescription: {...this.state.jobDescription, source: val}})} /></p>
            <p><EditableComponent label="SOC" value={soc} save={val => this.setState({...this.state, jobDescription: {...this.state.jobDescription, soc: val}})} /></p>
            <p><EditableComponent label="Raw Text" value={rawText} editType="textarea" save={val => this.setState({...this.state, jobDescription: {...this.state.jobDescription, rawText: val}})} /></p>
            <p><EditableComponent label="s3Link" value={s3Link} save={val => this.setState({...this.state, jobDescription: {...this.state.jobDescription, s3link: val}})} /></p>
          </div>
        }
      />
    );
  }
}

interface JobComponentState {
  chatDescriptors: Array<ChatDescriptor>;
}

class JobComponent extends Component<Job, JobComponentState & Job> {

  public state = { ...this.props, chatDescriptors: [{ id: 0, name: ''}]};

  constructor (props: any) {
    super(props);
    this.updateChatDescriptor = this.updateChatDescriptor.bind(this);
  }

  public componentDidMount () {
    api.getChatDescriptors()
      .then(chatDescriptors => this.setState({ chatDescriptors }));
  }

  public componentDidUpdate () {
    api.saveJob(this.state)
      .then(v => console.log(v, 'SAVE JOB API CALL'));
  }

  public render() {
    const LoadingJobDescriptionModal = loadingByField(JobDescriptionModal);
    const {
      name,
      status,
      rawText,
      evalModel,
      company,
      dateOpened
    } = this.props;
    const { chatDescriptor, chatDescriptors } = this.state;

    return (
      <>
        <p>Name: <strong>{name}</strong></p>
        <p>Company Name: <strong>{company.name}</strong></p>
        <p>Status: <strong>{status}</strong></p>
        <p>Date Opened: <strong>{moment(dateOpened).format('MM.DD.YYYY')}</strong></p>
        <p>
          <EditableComponent
            label="Raw Text"
            editType="textarea"
            value={rawText}
            save={val => this.setState({ rawText: val })}
          />
        </p>
        <p>
          <EditableComponent
            label="Eval Model"
            value={evalModel}
            editType="textarea"
            save={val => this.setState({ evalModel: val })}
          />
        </p>
        <p>
          <SelectInputComponent
            htmlLabel="chatAssociation"
            textLabel="Chat Association"
            handleChange={this.updateChatDescriptor}
            defaultValue={chatDescriptor !== null ? chatDescriptor.name : ''}
            options={chatDescriptors}
            optionKeys={['name']}
            customStyle={{marginRight: '2rem'}}
          />
        </p>
        <div className={styles.divider}>
          <LoadingJobDescriptionModal
            {...this.props}
            loadingIndicator={<SVGLoader />}
          />
        </div>
      </>
    );
  }

  private updateChatDescriptor (e: React.FormEvent<HTMLSelectElement>) {
    const objDescriptor = this.state.chatDescriptors.find((v: ChatDescriptor) => v.name === e.currentTarget.value);
    if  (objDescriptor !== undefined) {
      this.setState({ chatDescriptor: objDescriptor });
    }
  }
}

class JobContainer extends Component<RouteComponentProps<any>, State> {
  public state = InitState;

  public componentDidMount() {
    const { id } = this.props.match.params;
    api.getJobById(+id)
      .then(job => this.setState({ job }));
  }

  render() {
    const LoadingJob = loadingByObject(JobComponent);
    const { job } = this.state;
    return (
      <section className={`${appStyles.navContainerGrid} ${styles.container}`}>
        <StaticFilterBar />
        <Card>
          <LoadingJob
            loadingIndicator={<SVGLoader />}
            props={job}
          />
        </Card>
      </section>
    );
  }
}

export default JobContainer;
