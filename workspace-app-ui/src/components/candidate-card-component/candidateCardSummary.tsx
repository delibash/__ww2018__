import * as React from 'react';
import { Component } from 'react';
import { Profile, Person, Highlight } from './../../types/domainTypes';
import { Loading } from '../../types/utilityTypes';
import { checkmark } from './../svg/svgObj';
import { Section, Experience, Highlights, EducationHistory, Skills } from './sectionsComponents';
import { loadingByField } from '../higher-order-components/loadingHOC';
import * as styles from './details.css';
import api from 'src/services/api';

interface CandidateCardSummaryProps {
  profile: Profile;
  person: Person;
  id: number;
}

interface ExpandableProps {
  header: string;
  children: any;
  active?: boolean;
}

class Expandable extends Component<ExpandableProps> {
  public state = {
    active: this.props.active || false
  };
  public constructor(props: any) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }
  public handleToggle() {
    this.setState((prevState: any) => ({
      active: !prevState.active
    }));
  }
  render() {
    const { active } = this.state;
    return (
      <div className={styles.expandable}>
        <h4 onClick={this.handleToggle} className={!active ? styles.toggleHeader : `${styles.toggleHeader} ${styles.active}`}>
          <span>{this.props.header}</span>
        </h4>
        {
          active ?
            this.props.children
            : ''
        }
      </div>
    );
  }
}

interface HighlightProps {
  appId: number;
}

interface HighlightState {
  highlights: Loading<Array<Highlight>>;
}

class LoadingHighlights extends Component<HighlightProps, HighlightState> {
  public state: HighlightState = {
    highlights: 'loading'
  };

  public componentDidMount() {
    api.getHighlights(this.props.appId)
      .then(highlights => { 
        this.setState({highlights});
      });
  }

  public render() {
    const HighlightsRenderer = loadingByField(Highlights);
    return <HighlightsRenderer {...this.state}/>;
  }

}

class CandidateCardSummary extends Component<CandidateCardSummaryProps> {
  render() {
    const { profile, person, id } = this.props;
    const { firstName } = person;
    const { workHistory, educationHistory, importantNodes, skills } = profile;
    return (
      <section>
        <div className={styles.summary}>
          <Expandable header="Work History" active={true}>
            <Section
              content={<Experience workHistory={workHistory} />}
            />
          </Expandable>
          <Expandable header={`${firstName}'s Conversation Highlights`} active={true}>
            <Section
              content={<LoadingHighlights appId={id} />}
            />
          </Expandable>

          <Expandable header="Activities, Skills and Tools">
            <Section
              content={<Skills skills={skills} />}
            />
          </Expandable>

          <Expandable header="Education" active={true}>
            <Section
              content={<EducationHistory educationHistory={educationHistory} />}
            />
          </Expandable>

          <Expandable header="Logistics" active={true}>
            <Section
              content={
                <ul style={{ margin: '1rem 0' }}>
                  {importantNodes && importantNodes.map((v: any, i: number) => {
                    const { present } = v;
                    const icon = present ? checkmark : <span className={styles.x} />;
                    return (
                      <li key={i} style={{ display: 'flex', marginBottom: '1.4rem', marginLeft: '1rem' }}>
                        <span className={`${styles.checkmark} ${present}`}>{icon}</span>
                        <p>{v.text}</p>
                      </li>
                    );
                  })}
                </ul>}
            />
          </Expandable>
        </div>
      </section>
    );
  }
}

export default CandidateCardSummary;
