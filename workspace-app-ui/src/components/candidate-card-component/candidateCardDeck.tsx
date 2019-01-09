import * as React from 'react';
import { Component } from 'react';
import { Person } from './../../types/domainTypes';
import { avatarNew, avatarHeld, avatarAdvanced, avatarDNQ } from './../svg/svgObj';
import { Route, Link } from 'react-router-dom';
import { Label } from './../decor-elems/decorComponents';

import * as styles from './deck.css';
import * as btnStyles from './../buttons/buttons.css';

interface CandidateCardDeckProps {
  person: Person;
  score?: string;
  externalStatus: string;
  id: number;
}

class CandidateCardDeck extends Component<CandidateCardDeckProps> {
  render() {
    const { person, externalStatus, id, score } = this.props;
    const { email, phone, firstName, lastName, address } = person;
    return (
      <section>
        <header className={styles.header}>
          <div className={styles.candidate}>
            <div className={styles.avatar}>
              {
                externalStatus === 'new' ?
                  avatarNew :
                  externalStatus === 'held' ?
                    avatarHeld :
                    externalStatus === 'advanced' ?
                      avatarAdvanced :
                      externalStatus === 'rejected' ?
                        avatarDNQ :
                        avatarNew
              }
            </div>
            <div className={styles.name}>
              <h3>{`${firstName} ${lastName}`}</h3>
              <Route
                path="/role"
                render={() => <Label labelType={score} />}
              />
            </div>
            <div className={styles.location}>{address || ''}</div>
          </div>
          <div className={styles.controls}>
            <div>
              <Route
                path="/candidate"
                render={() => {
                  return (
                    <div className={styles.contactInfo}>
                      {
                        email ?
                          <div>
                            <strong>e:&nbsp;</strong>
                            <span>{email}</span>
                          </div>
                          : ''
                      }
                      {
                        phone ?
                          <div>
                            <strong>p:&nbsp;</strong>
                            <span>{phone}</span>
                          </div> : ''
                      }
                    </div>
                  );
                }}
              />
              <Route
                path="/role"
                render={() => {
                  return (
                    <Link
                      to={{ pathname: `/candidate/${id}` }}
                      className={btnStyles.textLinkBlue}
                    >
                      <span>View More Details</span>
                    </Link>
                  );
                }}
              />
            </div>
            <div style={{ alignItems: 'start' }}>
              {/* <VerticalMoreButton
                hoverText="Share Profile"
                active={`${btnStyles.btnGrayActive}`}
                className={`${btnStyles.btnGray} ${btnStyles.btnMore} ${btnStyles.btnMoreVertical}`}
              /> */}
            </div>
          </div>
        </header>
      </section>
    );
  }
}

export default CandidateCardDeck;
