import * as React from 'react';
import { Component } from 'react';
import * as pathToRegexp from 'path-to-regexp';

class PaginationSelector extends Component<any> {
  render () {
    return (
      <label htmlFor="records" style={{marginBottom: '2rem', display: 'flex', alignItems: 'center'}}>
        <strong style={{marginRight: '1rem'}}>Records per page:</strong>
        <span className="dropdownWrapper">
          <select
            className="dropdown"
            value={this.props.match.params.recordsPerPage}
            style={{fontSize: '1.2rem'}}
            onChange={(e) => this.curriedRouter(e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </span>
      </label>
    );
  }

  private parseDestination = (dest: string): string => {
    const match = this.props.match;
    const toPath = pathToRegexp.compile(match.path);
    const newPath = toPath({ ...match.params, recordsPerPage: dest});
    return newPath + location.search;
  }

  private curriedRouter = (page: string): () => void => this.props.history.push(this.parseDestination(page));
}

export default PaginationSelector;