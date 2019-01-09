import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ContentList } from './dashboardContent';
import Pagination from './paginationComponent';
import PaginationSelector from './paginationSelector';
import { SVGLoader } from './../svg/svgObj';
import { PaginationProps, Company } from './../../types/domainTypes';
import { loadingByField } from '../higher-order-components/loadingHOC';
import { Loading } from './../../types/utilityTypes';
import AddRoleModal from './addRoleModal';
import api from '../../services/api';

interface RolesComponentState {
  items: Loading<any>;
  companiesSelect?: Array<Company>;
}

const InitComponentState: RolesComponentState = {
  items: 'loading',
  companiesSelect: []
};

class Roles extends Component<RouteComponentProps<PaginationProps>> {
  public state = InitComponentState;

  public constructor (props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidMount () {
    const {
      pageNumber,
      recordsPerPage
    } = this.props.match.params;
    
    api.pageJobs(+pageNumber, +recordsPerPage)
      .then(items => this.setState({items}));

    api
      .getOrganizations()
      .then(companiesSelect => {
        this.setState({
          items: this.state.items,
          companiesSelect
        });
      });
  }

  public componentWillReceiveProps (nextProps: any) {
    const {
      pageNumber,
      recordsPerPage
    } = nextProps.match.params;
    
    api.pageJobs(+pageNumber, +recordsPerPage)
      .then(items => this.setState({items}));
  }

  public render() {
    const LoadingContent = loadingByField(ContentList);
    const { items, companiesSelect} = this.state;

    return (
      <>
      <div className="flexSpaceBetween">
        {items && items.totalElements > 10 ? <PaginationSelector {...this.props} /> : ''}
        {
          typeof items === 'string' ?
          ''
          :
          <div className="flexEnd">
            <AddRoleModal
              companiesSelect={companiesSelect}
              label="Add Job"
            />
          </div>
        }
      </div>
      <LoadingContent
          {...this.state}
          loadingIndicator={<SVGLoader />}
          handleClick={this.handleClick}
          itemKeys={['name', 'id', [ 'company', 'name' ], 'status']}
          itemHeaders={['Job Name', 'Job ID', 'Company Name', 'Status']}
      />
      {typeof items === 'string' || items.totalPages <= 1 ? '' : <Pagination {...this.state.items} {...this.props} />}
      </>
    );
  }

  private handleClick (id: number) {
    return this.props.history.push(`/job/${id}`);
  }
}

export default Roles;