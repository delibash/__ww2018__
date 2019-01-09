import * as React from 'react';
import { Component } from 'react';
import ReactPaginate from 'react-paginate';
import * as pathToRegexp from 'path-to-regexp';

import * as styles from './dashboard.css';

interface PaginationProps {
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

class Pagination extends Component<PaginationProps & any> {
  render () {
    return (
      <>
        <ReactPaginate
          pageCount={this.props.totalPages}
          breakLabel={'...'}
          pageRangeDisplayed={10}
          marginPagesDisplayed={0}
          containerClassName={styles.pagination}
          activeClassName={styles.selected}
          disabledClassName={styles.disabled}
          initialPage={+this.props.match.params.pageNumber}
          onPageChange={(data: any) => this.curriedRouter(data.selected)}
        />
      </>
    );
  }

  private parseDestination = (dest: string): string => {
    const match = this.props.match;
    const toPath = pathToRegexp.compile(match.path);
    const newPath = toPath({ ...match.params, pageNumber: dest});
    return newPath + location.search;
  }

  private curriedRouter = (page: string): () => void => this.props.history.push(this.parseDestination(page));

}

export default Pagination;