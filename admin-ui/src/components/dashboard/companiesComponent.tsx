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
import api from '../../services/api';

interface CompaniesComponentState {
  items: Loading<Company & any>;
}

const InitComponentState: CompaniesComponentState = {
  items: 'loading',
};

class Companies extends Component<RouteComponentProps<PaginationProps>> {
  public state = InitComponentState;

  public constructor (props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidMount () {
    const {
      pageNumber,
      recordsPerPage,
    } = this.props.match.params;
    
    api.pageOrganizations(+pageNumber, +recordsPerPage)
      .then(items => this.setState({items}));
  }

  public componentWillReceiveProps (nextProps: any) {
    const {
      pageNumber,
      recordsPerPage,
    } = nextProps.match.params;
    
    api.pageOrganizations(+pageNumber, +recordsPerPage)
      .then(items => this.setState({items}));
  }

  public render () {
    const LoadingContent = loadingByField(ContentList);
    const { items } = this.state;
    return (
      <>
        {items && items.totalElements > 10 ? <PaginationSelector {...this.props} /> : ''}
        <LoadingContent
          {...this.state}
          loadingIndicator={<SVGLoader />}
          handleClick={this.handleClick}
          itemKeys={['name', 'description']}
          itemHeaders={['Company Name', 'Description']}
        />
        {typeof items === 'string' || items.totalPages <= 1 ? '' : <Pagination {...this.state.items} {...this.props} />}
      </>
    );
  }

  private handleClick (id: number) {
    return this.props.history.push(`/company/${id}`);
  }
}

export default Companies;