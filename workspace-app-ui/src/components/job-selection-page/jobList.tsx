import * as React from 'react';
import { Component } from 'react';
import { JobSummary } from '../../types/domainTypes';
import { RouteComponentProps, withRouter } from 'react-router';
import { Paper } from '../card/cardComponent';

export interface JobListProps {
    jobSummaries: Array<JobSummary>;
}

export class JobList extends Component<RouteComponentProps & JobListProps> {

    public render() {
        return (
            <ul>
              {this.props.jobSummaries.map(this.renderJobSummary)}
            </ul>
        );
    }

    private renderJobSummary = (summary: JobSummary, key: number) => (
        <li
            onClick={() => this.props.history.push(`/role/${summary.id}/new/all/chrono`)}
            key={key}
        >
            <Paper>{summary.name} {summary.externalId}</Paper>
        </li>
    )
}

export default withRouter(JobList);
