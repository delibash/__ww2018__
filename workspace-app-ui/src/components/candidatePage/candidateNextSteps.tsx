import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Loading } from './../../types/utilityTypes';
import { loadingByField } from './../higher-order-components/loadingHOC';
import { Application } from './../../types/domainTypes';
import { Card } from './../card/cardComponent';
import Dropdown from './../dropdown/dropdownComponent';
import { Button } from './../buttons/buttons';
import { SVGLoader } from './../svg/svgObj';
import api from './../../services/api';
import CandidateCardDeck from './../candidate-card-component/candidateCardDeck';
import CandidateCardBrief from './../candidate-card-component/candidateCardBrief';
import CandidateCardSummary from './../candidate-card-component/candidateCardSummary';
import CandidateCardControls from './../candidate-card-component/candidateCardControls';

import * as styles from './candidate.css';
import * as stepStyles from './steps.css';
import * as btnStyles from './../buttons/buttons.css';

interface ResponseOptions {
  name: string;
  value: number;
}

interface Response {
  aside: string;
  message: Array<String>;
  filter: Loading<Array<ResponseOptions>>;
}

interface State {
  application: Loading<Application>;
  response: Loading<Response>;
}

const InitState: State = {
  application: 'loading',
  response: 'loading',
};

const CandidateContainer = ({ application }: State & any) => {
  return (
    <section className={styles.details}>
      <Card>
        <CandidateCardDeck {...application} />
        <CandidateCardBrief {...application} />
        <CandidateCardSummary {...application} />
        <CandidateCardControls
          advanced={true}
          {...application}
        />
      </Card>
    </section>
  );
};

const CandidateResponse = ({ response }: any) => {
  const { aside, filter } = response;
  return (
    <div className={stepStyles.response}>
      <div>
        <div className={stepStyles.controls}>
          <aside className={`${stepStyles.aside} blue-border`}>
            <p>{aside}</p>
          </aside>
          <Dropdown
            options={filter}
          />
        </div>
      </div>
      <Button
        className={btnStyles.btnLightBlue}
        text="Send Email"
        onClick={() => null}
      />
    </div>
  );
};

class CandidateNextSteps extends Component<RouteComponentProps<any>> {
  public state = InitState;

  public componentDidMount () {
    const { id } = this.props.match.params;

    const responseNext = {
      aside: 'Awesome. So glad you want to connect with John! Pick a template below that you’d like to use, then copy by clicking the “Copy Text” button.',
      message: [
        'Hi',
        'Thank you for applying to Wade & Wendy.',
        'My name is Dave, I’m the Chief of Staff. Wendy sent us your information and we would like to have a phone discussion to learn a bit more about you and tell you more about what we’re up to.',
        'Would you be available to come by to meet some of our Engineering team? Please go to this link [calendly link] to schedule a time that works best for you.',
        'Looking forward to hearing from you,',
        'All the best,',
        'Dave'
      ],
      filter: [
        { name: 'Schedule an onsite interview', value: 0 },
      ]
    };

    const responseRejected = {
      aside: 'Awesome. So glad you want to connect with John! Pick a template below that you’d like to use, then copy by clicking the “Copy Text” button.',
      message: [
        'Dear (Applicant\'s Name)',
        'Thank you for your application for the position of shipping coordinator at DLT Industries. As you can imagine, we received a large number of applications. I am sorry to inform you that you have not been selected for an interview for this position.',
        'The DLT selection committee thanks you for the time you invested to apply for the shipping coordinator position. We encourage you to apply for future openings for which you qualify.',
        'Best wishes for a successful job search. Thank you, again, for your interest in our company.',
        'Best,',
        'Name and Signature'
      ],
      filter: [
        { name: 'Rejection, General', value: 0 },
        { name: 'Rejection, But Possible Future Fit', value: 1 }
      ]
    };

    api.getApplication(+id)
      .then(application => {
        if (application) {
          this.setState({
            application,
            response: application.externalStatus === 'OTHER_REJECTED' ? responseRejected : responseNext
          });
        } else {
          this.setState({
            application: 'error',
            response: 'error'
          });
        }
      }).catch(e => this.setState({
        application: 'error',
        response: 'error'
      }));
  }

  public render() {
    const LoadingCandidateContainer = loadingByField(CandidateContainer);
    const LoadingResponse = loadingByField(CandidateResponse);
    return (
      <>
        <section className={stepStyles.container}>
          <a
            onClick={() => this.props.history.goBack()}
            className={stepStyles.backBtn}
          >
            Go Back to Inbox
          </a>
          <LoadingCandidateContainer
            loadingIndicator={<SVGLoader />}
            {...this.state}
          />
          <LoadingResponse
            response={this.state.response}
            loadingIndicator={<SVGLoader />}
          />
        </section>
      </>
    );
  }
}

export default CandidateNextSteps;
