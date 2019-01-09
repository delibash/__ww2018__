import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Loading } from './../../types/utilityTypes';
import { loadingByField } from '../higher-order-components/loadingHOC';
import { ContentList } from './dashboardContent';
import AddUserModal from './addUserModal';
import Pagination from './paginationComponent';
import PaginationSelector from './paginationSelector';
import { SVGLoader } from './../svg/svgObj';
import { PaginationProps, Company } from './../../types/domainTypes';
import api from '../../services/api';

interface UsersComponentState {
  items: Loading<any>;
  companiesSelect?: Array<Company>;
}

const InitComponentState: UsersComponentState = {
  items: 'loading',
  companiesSelect: []
};

class Users extends Component<RouteComponentProps<PaginationProps>> {
  public state = InitComponentState;

  public componentDidMount() {
    const {
      pageNumber,
      recordsPerPage
    } = this.props.match.params;
    
    api.pageUsers(+pageNumber, +recordsPerPage)
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
    
    api.pageUsers(+pageNumber, +recordsPerPage)
      .then(items => this.setState({items}));
  }

  public render() {
    const LoadingContent = loadingByField(ContentList);
    const { items, companiesSelect } = this.state;
    return (
      <div>
        <div className="flexSpaceBetween">
          {items && items.totalElements > 10 ? <PaginationSelector {...this.props} /> : ''}
          {
            typeof items === 'string' ?
            ''
            :
            <div className="flexEnd">
              <AddUserModal
                companiesSelect={companiesSelect}
                label="Add User"
              />
            </div>
          }
        </div>
        <LoadingContent
          {...this.state}
          loadingIndicator={<SVGLoader />}
          handleClick={this.handleClick}
          itemKeys={['lastName', ['company', 'name'], 'email']}
          itemHeaders={['Recruiter Name', 'Company Name', 'Email']}
        />
        {typeof items === 'string' || items.totalPages <= 1 ? '' : <Pagination {...this.state.items} {...this.props} />}
      </div>
    );
  }

  private handleClick (id: number) {
    return this.props.history.push(`/user/${id}`);
  }
}

export default Users;