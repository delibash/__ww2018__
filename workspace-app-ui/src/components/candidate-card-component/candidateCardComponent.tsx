import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoleParams } from './../../types/routingTypes';
import { Loading } from './../../types/utilityTypes';
import { loadingByField } from './../higher-order-components/loadingHOC';
import { Application } from './../../types/domainTypes';
import { Card } from './../card/cardComponent';
import { SVGLoader } from './../svg/svgObj';
import api from './../../services/api';
import CandidateCardDeck from './candidateCardDeck';
import CandidateCardBrief from './candidateCardBrief';
import CandidateCardControls from './candidateCardControls';
import { BlankState } from './blankState';

const wrapper = {
  marginBottom: '2.6rem',
};

interface State {
  applications: Loading<Array<Application>>;
}

const InitState: State = {
  applications: 'loading',
};

const CandidateContainer = ({ applications, history, match }: any) => {

  const scoreLabel = (label?: any) => applications.length < 1 ? <BlankState /> : applications
    .filter((app: any) => app.score === label)
    .map((app: any, i: number) => {
      return (
        <Card key={i}>
          <CandidateCardDeck {...app} />
          <CandidateCardBrief {...app} />
          <CandidateCardControls
            advanced={false}
            history={history}
            tab={match.params.tab}
            onStatusUpdate={() => window.location.reload()}
            {...app}
          />
        </Card>
      );
    });

  const labels = [
    { obj: scoreLabel('ideal'), label: 'Ideal' },
    { obj: scoreLabel('qualified'), label: 'Qualified' },
    { obj: scoreLabel('unqualified'), label: 'Unqualified' },
    { obj: scoreLabel(null), label: 'Un-evaluated'}
  ];

  return (
    <div>
      {
        labels.map((v, i) => {
          const { obj } = v;
          return (
            obj.length > 0 ?
              <div style={wrapper} key={i}>
                {obj}
              </div>
              : <div key={i}>{obj}</div>
          );
        })
      }
    </div>
  );
};

class CandidateCardContainer extends Component<RouteComponentProps<RoleParams>, State> {
  public state = InitState;

  public componentDidMount() {
    const { roleId, tab, sort, score } = this.props.match.params;

    if (tab !== 'dashboard' && tab !== 'qualified' && tab !== 'unqualified') {
      if (score === 'all') {
        api.getApplications(+roleId, tab, sort, 'ALL_QUALIFIED')
          .then(applications => {
            if (applications) {
              this.setState({ applications });
            }
          });
      } else {
        api.getApplications(+roleId, tab, sort, score)
          .then(applications => {
            if (applications) {
              this.setState({ applications });
            }
          });
      }
    }

    if (tab === 'qualified') {
      api.getAllQualifiedApps(+roleId)
        .then(applications => {
          if (applications) {
            this.setState({ applications });
          }
        });
    }

    if (tab === 'unqualified') {
      api.getAllUnQualifiedApps(+roleId)
        .then(applications => {
          if (applications) {
            this.setState({ applications });
          }
        });
    }
  }

  public render() {
    const LoadingCandidateContainer = loadingByField(CandidateContainer);
    return (
      <LoadingCandidateContainer
        loadingIndicator={<SVGLoader />}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default CandidateCardContainer;
