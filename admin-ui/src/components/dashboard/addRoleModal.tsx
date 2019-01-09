import * as React from 'react';
import { Component } from 'react';
import { Company, Job } from './../../types/domainTypes';
import { TextInputComponent, SelectInputComponent } from './../input-components/inputComponent';

import * as styles from './modal.css';
import api from './../../services/api';

interface AddRoleModalProps {
  label: string;
  companiesSelect?: any;
}

const job: Job = {
  id: null,
  externalId: '',
  name: '',
  status: '',
  rawText: '',
  evalModel: '',
  recruiterFirstName: '',
  recruiterLastName: '',
  recruiterEmail: '',
  jobDescription: {
    id: null,
    title: '',
    location: '',
    source: '',
    rawText: '',
    soc: '',
    s3Link: ''
  },
  chatDescriptor: null,
  dateOpened: 0,
  company: {
    name: '',
    id: null,
    description: ''
  }
};

export default class AddRoleModal extends Component<AddRoleModalProps> {
  public state = {
    job,
    active: false
  };

  public constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  public handleChange (e: any) {
    this.setState({
      job: {
        ...this.state.job,
        [e.target.id]: e.target.value
      }
    });
  }

  public handleCompanyChange (e: any) {
    const name = e.target.value; 
    this.setState({
      job: {
        ...this.state.job,
        company: this.props.companiesSelect.filter((v: Company) => v.name === name)[0]
      }
    });
  }

  public showModal() {
    this.setState({ active: true });
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    api
      .saveJob(this.state.job)
      .then(newJob => {
        alert('New Job Added!');
        console.log('CREATE JOB: ', newJob);
      })
      .catch(err => {
        alert('Error Creating New Job!');
        console.error('ERROR CREATING NEW JOB: ', err);
      });

    this.setState({ active: false });
  }

  public handleCancel() {
    this.setState({ active: false });
  }

  public escFunction(e: any) {
    if (e.keyCode === 27) {
      this.setState({ active: false });
    }
  }

  public componentWillReceiveProps (nextProps: any) {
    this.setState({
      job: {
        ...this.state.job,
        company: nextProps.companiesSelect[0]
      }
    });
  }

  public componentWillMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    const { label, companiesSelect } = this.props;
    const { active } = this.state;

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
                    top: '20%',
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
                  <header><h2>Add Job</h2></header>
                  <fieldset style={{margin: '3rem 0', display: 'block'}}>
                    <legend style={{display: 'none'}}>Job Data</legend>

                    <TextInputComponent
                      htmlLabel="externalId"
                      textLabel="External ID"
                      handleChange={this.handleChange}
                      customClass={styles.label}
                    />

                    <TextInputComponent
                      htmlLabel="name"
                      textLabel="Job"
                      handleChange={this.handleChange}
                      customClass={styles.label}
                    />

                    <SelectInputComponent
                      htmlLabel="company"
                      textLabel="Company"
                      customClass={styles.label}
                      handleChange={this.handleCompanyChange}
                      options={companiesSelect}
                      defaultValue="none"
                      optionKeys={['name']}
                      dropDownClass={styles.selectWrapper}
                    />

                  </fieldset>
                  <fieldset>
                    <button onClick={this.handleCancel} className={styles.btn}>Cancel</button>
                    <button type="submit" className={styles.btn} style={{backgroundColor: 'var(--blue)', float: 'right' }}>Create Job</button>
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
}
