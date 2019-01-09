import * as React  from 'react';
import { Component } from 'react';
import { Job, PersonProfile } from './../../types/domainTypes';

import * as styles from './modal.css';
import api from './../../services/api';

interface AddApplicantModalStateProps {
  active: boolean;
  jobId: number;
  profileId: number;
  selectJobsSize: number;
  selectProfilesSize: number;
  selectJobs: Array<Job>;
  selectProfile: Array<PersonProfile>;
}

interface AddApplicantModalProps {
  label: string;
}

const AddApplicantModalState: AddApplicantModalStateProps = {
  active: false,
  jobId: 0,
  profileId: 0,
  selectJobsSize: 20,
  selectProfilesSize: 20,
  selectJobs: [],
  selectProfile: []
};

export default class AddApplicantModal extends Component<AddApplicantModalProps> {
  public state = AddApplicantModalState;

  private selectJobsElem: HTMLSelectElement;
  private selectProfilesElem: HTMLSelectElement;

  public constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
    this.handleProfileIdChange = this.handleProfileIdChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.handleJobsScroll = this.handleJobsScroll.bind(this);
    this.handleProfilesScroll = this.handleProfilesScroll.bind(this);
  }

  public handleJobChange (e: any) {
    const { selectJobs } = this.state;
    const jobID = selectJobs.find(v => v.name === e.target.value);
    this.setState({
      ...this.state,
      jobId: jobID && jobID.id || 0
    });
  }

  public handleProfileIdChange (e: any) {
    const { selectProfile } = this.state;
    const profileID = selectProfile.find(v => v.firstName === e.target.value);
    this.setState({
      ...this.state,
      profileId: profileID && profileID.id || 0
    });
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    const { jobId, profileId } = this.state;
    api
      .createApplication(jobId, profileId)
      .then(application => console.log('CREATED NEW APPLICATION: ', application))
      .catch(err => console.error('ERROR CREATING NEW APPLICATION: ', err));
    this.setState({ active: false });
  }

  public handleCancel() {
    this.setState({ active: false });
  }

  public showModal() {
    this.setState({ active: true });
  }

  public escFunction(e: any) {
    if (e.keyCode === 27) {
      this.setState({ active: false });
    }
  }
  
  public componentWillMount () {
    document.addEventListener('keydown', this.escFunction, false);
    api
      .pageJobs(0, this.state.selectJobsSize)
      .then(selectJobs => {
        this.setState({
          ...this.state,
          selectJobs: selectJobs.content
        });
      })
      .catch(err => console.error('ERROR GETTING JOBS: ', err));

    api
      .pagePeopleProfiles(0, this.state.selectJobsSize)
      .then(selectProfile => {
        this.setState({
          ...this.state,
          selectProfile: selectProfile.content
        });
      })
      .catch(err => console.error('ERROR GETTING PROFILES: ', err));
  }

  public componentDidUpdate () {
    this.selectJobsElem && this.selectJobsElem.addEventListener('scroll', this.handleJobsScroll, false);
    this.selectProfilesElem && this.selectProfilesElem.addEventListener('scroll', this.handleProfilesScroll, false);
  }

  public componentWillUnmount () {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    const { label } = this.props;
    const { active, selectJobs, selectProfile } = this.state;
    return (
      <>
        <button className={styles.btn} style={{margin: '0 3rem 1.2rem 0' }} onClick={this.showModal}>{label}</button>
        {
          active ?
            <div
              style={
                {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(74,74,74,0.7)',
                  zIndex: 1
                }
              }
            >
              <form
                onSubmit={this.handleSubmit}
                style={
                  {
                    position: 'relative',
                    width: '55rem',
                    maxHeight: '100%',
                    top: '5%',
                    left: '50%',
                    backgroundColor: 'var(--white)',
                    boxShadow: 'var(--box-shadow-all)',
                    transform: 'translate(-50%, 0)',
                    padding: '2rem',
                    overflow: 'scroll'
                  }
                }
              >
                <section>
                  <header><h2>Add Application</h2></header>
                  <fieldset style={{margin: '3rem 0', display: 'block'}}>
                    <legend style={{display: 'none'}}>Application</legend>
                    <label htmlFor="job" className={styles.label}>
                      <span>Job:</span>
                      <div className={styles.selectWrapper}>
                        <select
                          ref={(node: HTMLSelectElement) => { this.selectJobsElem = node; }}
                          size={this.state.selectJobsSize}
                          multiple={true}
                          style={{height: '20rem'}}
                          id="job"
                          required={true}
                          onChange={this.handleJobChange}
                        >
                          <option value="none">None</option>
                          {
                          selectJobs && selectJobs.map((v: any, i: number) => {
                            return <option value={v.name} key={v.id}>{v.name}</option>;
                          })
                        }
                        </select>
                      </div>
                    </label>

                    <label htmlFor="profile" className={styles.label}>
                      <span>Profile:</span>
                      <div className={styles.selectWrapper}>
                        <select
                          ref={(node: HTMLSelectElement) => { this.selectProfilesElem = node; }}
                          size={this.state.selectProfilesSize}
                          multiple={true}
                          id="profile"
                          style={{height: '20rem'}}
                          required={true}
                          onChange={this.handleProfileIdChange}
                        >
                          <option value="none">None</option>
                        {
                          selectProfile && selectProfile.map((v: any, i: number) => {
                            return <option value={v.firstName} key={v.id}>{v.firstName} {v.lastName}</option>;
                          })
                        }
                        </select>
                      </div>
                    </label>
                  </fieldset>
                  <fieldset>
                    <button onClick={this.handleCancel} className={styles.btn}>Cancel</button>
                    <button type="submit" className={styles.btn} style={{backgroundColor: 'var(--blue)', float: 'right' }}>Create Application</button>
                  </fieldset>
                </section>
              </form>
            </div>
            :
            ''
        }
      </>
    );
  }

  private handleJobsScroll (e: any) {

    if (this.selectJobsElem.scrollTop + this.selectJobsElem.offsetHeight >= this.selectJobsElem.scrollHeight + 2) {
      api
        .pageJobs(0, this.state.selectJobsSize + 20)
        .then(selectJobs => {
          this.setState((prevState: AddApplicantModalStateProps) => ({
            ...prevState,
            selectJobs: selectJobs.content,
            selectJobsSize: prevState.selectJobsSize + 20
          }));
        })
        .catch(err => console.error('ERROR GETTING JOBS: ', err));
    }
  }

  private handleProfilesScroll (e: any) {

    if (this.selectProfilesElem.scrollTop + this.selectProfilesElem.offsetHeight >= this.selectProfilesElem.scrollHeight + 2) {
      api
        .pagePeopleProfiles(0, this.state.selectProfilesSize + 20)
        .then(selectProfile => {
          this.setState((prevState: AddApplicantModalStateProps) => ({
            ...prevState,
            selectProfile: selectProfile.content,
            selectProfilesSize: prevState.selectProfilesSize + 20
          }));
        })
        .catch(err => console.error('ERROR GETTING PROFILES: ', err));
    }
  }

}
