import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Job } from '../../types/domainTypes';

interface AppBarProps {
    options: Array<Job>;
    selectedJob: Job | null;
    selectJob: (job: Job) => void;
}

class TopBar extends React.Component<AppBarProps> {
  public render() {
    return (
        <AppBar
            style={{height: '60px'}}
            title={this.dropDown()}
            showMenuIconButton={false}
        />
    );
  }

  private dropDown = (): JSX.Element => {
      const { options, selectedJob, selectJob } = this.props;

      return (
        <DropDownMenu
            value={selectedJob}
        >
          <MenuItem value={null} primaryText="Recruiter Dashboard" />
          {options.map(job => (
            <MenuItem
                onSelect={selectJob.bind(this, job)}
                key={job.id}
                value={job.id}
                primaryText={job.name}
            />))}
        </DropDownMenu>
      );
  }
}

export default TopBar;
