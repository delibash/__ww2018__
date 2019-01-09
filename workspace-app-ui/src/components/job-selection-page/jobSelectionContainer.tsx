import * as React from 'react';
import { Component } from 'react';
import { JobSummary, Company } from 'src/types/domainTypes';
import { Loading } from 'src/types/utilityTypes';
import JobList from './jobList';
import { loadingByField } from '../higher-order-components/loadingHOC';
import { SVGLoader } from './../svg/svgObj';
import api from '../../services/api';
import { container, dashboard, email, list } from './job-selection.css';
import CompanyComponent from './company';

interface JobSelectionState {
    jobSummaries: Loading<Array<JobSummary>>;
    company: Loading<Company>;
}

export default class JobSelectionContainer extends Component<{}, JobSelectionState> {
    public state: JobSelectionState = {
        jobSummaries: 'loading',
        company: 'loading'
    };

    public componentDidMount() {
        api.getJobSummaries()
            .then(jobSummaries => this.setState({jobSummaries}));

        api.getCompany()
            .then(company => this.setState({company}));
    }

    public render() {
        const LoadingJobSummaries = loadingByField(JobList);
        const LoadingCompany = loadingByField(CompanyComponent);
        const { jobSummaries, company } = this.state;

        return (
            <section className={container}>
                <section className={dashboard}>
                  <LoadingCompany loadingIndicator={<SVGLoader />} company={company}/>
                  <h4>Company Dashboard</h4>
                  <p className="blue-border">
                    <span>Welcome to your company dashboard! I’m working hard on finding you Talent for all the Roles listed here.</span>
                  </p>
                  <p className="blue-border">
                    <span>If you need any help, don’t hesitate to reach out to my human team!</span>
                  </p>
                  <p style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <a className={email} href="mailto:help@wadeandwendy.ai">Email Wendy's human team</a>
                  </p>
                </section>

                <section className={list}>
                  <LoadingJobSummaries loadingIndicator={<SVGLoader />} jobSummaries={jobSummaries}/>
                </section>
            </section>
        );
    }
}
