import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Loading } from './../../types/utilityTypes';
import { loadingByField } from './../higher-order-components/loadingHOC';
import { Application } from './../../types/domainTypes';
import { Card } from './../card/cardComponent';
import { SVGLoader } from './../svg/svgObj';
import api from './../../services/api';
import CandidateCardDeck from './../candidate-card-component/candidateCardDeck';
import CandidateCardBrief from './../candidate-card-component/candidateCardBrief';
import CandidateCardSummary from './../candidate-card-component/candidateCardSummary';
import CandidateCardControls from './../candidate-card-component/candidateCardControls';

import * as styles from './candidate.css';

interface State {
  application: Loading<Application>;
}

const InitState: State = {
  application: 'loading'
};

const CandidateContainer = ({ application, history }: State & any) => {
  return (
    <Card>
      <CandidateCardDeck {...application}/>
      <CandidateCardBrief {...application} />
      <CandidateCardSummary {...application} />
      <CandidateCardControls
        advanced={false}
        history={history}
        {...application}
      />
    </Card>
  );
};

class CandidateDetails extends Component<RouteComponentProps<any>> {
  public state = InitState;

  public componentDidMount () {
    const { id } = this.props.match.params;
    api.getApplication(+id)
      .then(application => {
        this.setState({application});
      });
  }

  public render() {
    const LoadingCandidateContainer = loadingByField(CandidateContainer);
    return (
      <section className={styles.details}>
        <a
          onClick={() => this.props.history.goBack()}
          className={styles.backBtn}
        >
          Go Back to Inbox
        </a>
        <LoadingCandidateContainer
          loadingIndicator={<SVGLoader />}
          {...this.state}
          {...this.props}
        />
      </section>
    );
  }
}

export default CandidateDetails;
