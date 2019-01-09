import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ContentList } from './dashboardContent';
import Pagination from './paginationComponent';
import PaginationSelector from './paginationSelector';
import { SVGLoader } from './../svg/svgObj';
import { PaginationProps } from './../../types/domainTypes';
import { loadingByField } from '../higher-order-components/loadingHOC';
import { Loading } from './../../types/utilityTypes';
import AddApplicantModal from './addApplicantModal';
import api from '../../services/api';

interface ApplicationsComponentState {
  items: Loading<any>;
}

const InitComponentState: ApplicationsComponentState = {
  items: 'loading',
};

class Applicants extends Component<RouteComponentProps<PaginationProps>> {
  public state = InitComponentState;

  public constructor (props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidMount() {
    const {
      pageNumber,
      recordsPerPage,
    } = this.props.match.params;

    api
      .pageApplications(+pageNumber, +recordsPerPage)
      .then(items => this.setState({items}));
  }

  public componentWillReceiveProps (nextProps: any) {
    const {
      pageNumber,
      recordsPerPage,
    } = nextProps.match.params;
    
    api.pageApplications(+pageNumber, +recordsPerPage)
      .then(items => this.setState({items}));
  }

  public render() {
    const LoadingContent = loadingByField(ContentList);
    const {
      items,
    } = this.state;

    return (
      <>
      <div className="flexSpaceBetween">
      {
        items && items.totalElements > 10 ?
        <PaginationSelector
          {...this.props}
        />
        :
        ''
      }
      {
        typeof items === 'string' ?
        ''
        :
        <div className="flexEnd">
          <AddApplicantModal
            label="Add Application"
          />
        </div>
      }
      </div>
      <LoadingContent
        {...this.state}
        loadingIndicator={<SVGLoader />}
        handleClick={this.handleClick}
        itemKeys={['personName', 'orgName', 'jobName', 'status']}
        itemHeaders={['Applicant Name', 'Company Name', 'Role Name', 'Status']}
      />
      {
        typeof items === 'string' || items.totalPages <= 1 ?
        ''
        :
        <Pagination
          {...this.state.items}
          {...this.props}
        />
      }
      </>
    );
  }

  private handleClick (id: number) {
    return this.props.history.push(`/applicant/${id}`);
  }

}

export default Applicants;