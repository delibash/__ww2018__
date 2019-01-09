import * as React from 'react';
import { Component } from 'react';
import { Company } from 'src/types/domainTypes';
import * as styles from './job-selection.css';

export interface CompanyProps {
    company: Company;
}

export default class CompanyComponent extends Component<CompanyProps> {
    public render() {
        const { company } = this.props;
        return (
            <h2 className={styles.company}>
              {company.name}
            </h2>
        );
    }
}
