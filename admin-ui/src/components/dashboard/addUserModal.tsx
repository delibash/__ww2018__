import * as React from 'react';
import { Component } from 'react';
import { CreateUserRequest, Company } from './../../types/domainTypes';
import { TextInputComponent, SelectInputComponent } from './../input-components/inputComponent';

import * as styles from './modal.css';
import api from './../../services/api';

interface AddUserModalProps {
  label: string;
  companiesSelect?: any;
}

const user: CreateUserRequest = {
  email: '',
  username: '',
  password: '',
  company: {
    name: '',
    id: null,
    description: ''
  }
};

export default class AddUserModal extends Component<AddUserModalProps> {
  public state = {
    user,
    active: false
  };

  public constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  public handleChange (e: any) {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value
      }
    });
  }

  public handleCompanyChange (e: any) {
    const name = e.target.value; 
    this.setState({
      user: {
        ...this.state.user,
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
      .createWSAUser(this.state.user)
      .then(newUser => {
        console.log('NEW USER CREATED: ', newUser);
        alert('User Created!');
      })
      .catch(err => {
        console.error('ERROR CREATING NEW USER: ', err);
        alert('Error Creating User!');
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
      user: {
        ...this.state.user,
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
                  <header><h2>Add User</h2></header>
                  <fieldset style={{margin: '3rem 0', display: 'block'}}>
                    <legend style={{display: 'none'}}>User Data</legend>
                    <TextInputComponent
                      htmlLabel="name"
                      textLabel="User Name"
                      customClass={styles.label}
                      handleChange={this.handleChange}
                    />
                    <TextInputComponent
                      htmlLabel="email"
                      textLabel="Email"
                      customClass={styles.label}
                      handleChange={this.handleChange}
                    />
                    <TextInputComponent
                      htmlLabel="password"
                      textLabel="Pw"
                      customClass={styles.label}
                      handleChange={this.handleChange}
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
                    <button type="submit" className={styles.btn} style={{backgroundColor: 'var(--blue)', float: 'right' }}>Create User</button>
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
