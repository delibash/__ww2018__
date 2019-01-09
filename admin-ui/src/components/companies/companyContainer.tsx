import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from './../card/cardComponent';
import { Company } from './../../types/domainTypes';
import { Loading } from './../../types/utilityTypes';
import { loadingByObject } from '../higher-order-components/loadingHOC';
import { SVGLoader } from './../svg/svgObj';
import EditableComponent from './../editableComponent/editableComponent';
import api from './../../services/api';
import { StaticFilterBar } from './../filter-bar/staticFilterBar';

import * as styles from './companies.css';
import * as appStyles from './../app.css';

interface CompanyState {
  company: Loading<Company>;
}

const InitState: CompanyState = {
  company: 'loading'
};

class CompanyComponent extends Component<Company> {

  public state = { ...this.props };

  public componentDidUpdate() {
    console.log(this.state);
    // api.saveCompany(this.state).then(v => console.log(v));
  }

  render() {
    const {
      name,
      description
    } = this.props;
    return (
      <>
        <p>
          <EditableComponent
            label="Company Name"
            value={name}
            save={val => this.setState({ name: val })}
          />
        </p>
        <p>
          <EditableComponent
            label="Description"
            value={description}
            editType="textarea"
            save={val => this.setState({ description: val })}
          />
        </p>
      </>
    );
  }
}

class CompanyContainer extends Component<RouteComponentProps<any>, CompanyState> {
  public state = InitState;

  public componentDidMount() {
    const { id } = this.props.match.params;
    api.getOrganizationById(+id)
      .then(company =>  this.setState({ company }));
  }

  render() {
    const LoadingCompany = loadingByObject(CompanyComponent);
    const { company } = this.state;
    return (
      <section className={`${appStyles.navContainerGrid} ${styles.container}`}>
        <StaticFilterBar />
        <Card>
          <LoadingCompany
            loadingIndicator={<SVGLoader />}
            props={company}
          />
        </Card>
      </section>
    );
  }
}

export default CompanyContainer;
