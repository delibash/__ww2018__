import * as React from 'react';
import { Component } from 'react';
import { loadingByField } from './../higher-order-components/loadingHOC';
import Modal, { ChatModal } from './../modal/modal';
import ResumeModal from './../resume/resumeModal';
import { ChatRecord } from './../../types/domainTypes';
import { Loadable } from './../../types/utilityTypes';
import { Profile, Person } from './../../types/domainTypes';
import { SVGLoader } from './../svg/svgObj';
import { WorkingRobot } from './../static/images';
import { Section, Current } from './sectionsComponents';
import api from './../../services/api';
import * as moment from 'moment';
import { getCurrentPosition } from './../../utils/dates';
import * as styles from './details.css';
import * as btnStyles from './../buttons/buttons.css';

interface CandidateCardBriefProps {
  profile: Profile;
  person: Person;
  id: number;
  match: any;
  resumeLink: string;
}

interface ModalState {
  chatRecord: Loadable<ChatRecord>;
  modal: boolean;
  modalType: string;
}

const ChatRecordState: Loadable<ChatRecord> = {
  id: 'loading',
  type: 'loading',
  messages: 'loading',
  job: 'loading',
  person: 'loading',
};

const ModalState: ModalState = {
  chatRecord: ChatRecordState,
  modal: false,
  modalType: '',
};

class CandidateCardBrief extends Component<CandidateCardBriefProps> {
  public state = ModalState;
  private modal: HTMLDivElement;
  public constructor(props: any) {
    super(props);
    this.showResumeModal = this.showResumeModal.bind(this);
    this.showChatModal = this.showChatModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }
  public showChatModal (candidateId: number) {
    this.setState({ modal: true, modalType: 'chatType' });
    api.getChatRecord(candidateId)
      .then(chatRecord => {
        chatRecord !== null ?
          this.setState({ chatRecord })
          :
          this.setState({
            chatRecord: {
              id: 'error',
              type: 'error',
              messages: 'error',
              job: 'error',
              person: 'error'
            }
          });
      });
  }
  public showResumeModal(resumeLink: string) {
    this.setState({ modal: true, modalType: 'resumeType' });
  }
  public hideModal = () => {
    this.setState({ modal: false, modalType: '' });
  }
  public escFunction(e: any) {
    if (e.keyCode === 27) {
      this.setState({ modal: false, modalType: '' });
    }
  }
  public onOutsideClick(e: any) {
    const { modal } = this.state;
    if (modal) {
      if (!this.modal.contains(e.target)) {
        this.setState({ modal: false });
      }
    }
  }
  public componentWillMount() {
    document.addEventListener('mousedown', this.onOutsideClick, false);
    document.addEventListener('keydown', this.escFunction, false);
  }
  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
    document.removeEventListener('keydown', this.escFunction, false);
  }
  render() {
    const { profile, person, resumeLink, id } = this.props;
    const { workHistory } = profile;
    const { modal, modalType, chatRecord } = this.state;

    const current = getCurrentPosition(workHistory);
    const startDate = current && current.duration ? current.duration.startDate : null;
    const endDate = current
      && current.duration
      && current.duration.endDate
      ? current.duration.endDate
      : Date.now();
    const startEnd = startDate && endDate
      ? moment(startDate).format('YYYY') + ' - ' + moment(endDate).format('YYYY')
      : 'unknown';
    const time = startDate && endDate
      ? moment.duration(endDate - startDate, 'ms').humanize()
      : 'unknown';
    const title = current ? current.title : 'unknown';
    const company = current ? current.company.name : 'unknown';

    const LoadingResumeModal = loadingByField(ResumeModal);
    const LoadingChatModal = loadingByField(ChatModal);

    return (
      <section>
        <div>
          <Section
            header={<span>Current Position, <span className={styles.dateNormal}>{time}</span></span>}
            content={
              <Current
                title={title}
                company={company}
                duration={startEnd}
              />
            }
          />
        </div>
        <div />
        <div>
          <div className={styles.section} style={{height: '100%', display: 'flex', justifyContent: 'space-between', flexFlow: 'column'}}>
            <ul>
              <li>
                <a
                  target="blank"
                  href={person.linkedInUrl}
                  className={btnStyles.transcriptLink}
                >
                  View LinkedIn
                </a>
              </li>
              {/* <li>
                <a
                  className={btnStyles.transcriptLink}
                  onClick={() => this.showResumeModal(resumeLink)}
                >
                  View Resume
                </a>
              </li> */}
              <li>
                <a
                  className={btnStyles.transcriptLink}
                  onClick={() => this.showChatModal(id)}
                >
                  View Transcript
                </a>
              </li>
            </ul>
            <div className={styles.postApply}>
              <p>Chat completed</p>
            </div>
          </div>
          {
            modal && modalType === 'resumeType' ?
              <Modal
                handleOutsideClick={this.onOutsideClick}
                active={modal}
                handleClose={this.hideModal}
                type={modalType}
                node={(node: any) => { this.modal = node; }}
                body={
                  <LoadingResumeModal
                    loadingIndicator={<SVGLoader />}
                    resume={resumeLink}
                  />
                }
              />
              :
              ''
          }
          {
            modal && modalType === 'chatType' ?
              <Modal
                handleOutsideClick={this.onOutsideClick}
                active={modal}
                handleClose={this.hideModal}
                type={modalType}
                node={(node: any) => { this.modal = node; }}
                body={
                  <LoadingChatModal
                    errorElement={
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexFlow: 'column'
                        }}
                      >
                        {WorkingRobot}
                        <p style={{marginTop: '4rem', fontSize: '1.4rem'}}>Sorry, there was an error loading the transcript...</p>
                      </div>}
                    loadingIndicator={<SVGLoader />}
                    {...chatRecord}
                  />
                }
              />
              :
              ''
          }
        </div>
      </section>
    );
  }
}

export default CandidateCardBrief;
