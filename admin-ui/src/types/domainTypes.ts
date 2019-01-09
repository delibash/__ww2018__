export interface Company {
  name: string;
  id: number | null;
  description: string;
}

export interface Chat {
  name: string;
  id: number | null;
}

export interface KGNode {
  name: string;
  id: number | null;
}

export interface Concept extends KGNode { }
export interface Measure extends KGNode { }

export interface ParsedJobDescription {
  id: number | null;
  title: string;
  location: string;
  source: string;
  rawText: string;
  soc: string;
  s3Link: string;
}

export interface Job {
  id: number | null;
  externalId: string;
  name: string;
  status: string;
  rawText: string;
  evalModel: string;
  recruiterFirstName: string;
  recruiterLastName: string;
  recruiterEmail: string;
  company: Company;
  jobDescription: ParsedJobDescription;
  chatDescriptor: ChatDescriptor | null;
  dateOpened: number;
}

type Outcome
  = 'IDEAL'
  | 'QUALIFIED'
  | 'UNQUALIFIED';

export interface Evaluation {
  id: number | null;
  score: number | null;
  outcome: Outcome;
}

export interface Bound {
  value: string;
  inclusive: boolean;
}

export interface Measurement {
  exact?: boolean;
  value: string;
  lowerBound: Bound;
  upperBound: Bound;
}

export type DegreeType
    = 'UNRECOGNIZED'
    | 'BACHELORS'
    | 'BACHELOR_OF_ARTS'
    | 'BACHELOR_OF_SCIENCE'
    | 'MASTERS'
    | 'MASTERS_OF_ARTS'
    | 'MASTERS_OF_SCIENCE'
    | 'PHD';

export type Attribution = 'linkedIn' | 'resume' | 'chat' | 'ats' | 'other' | string;

export interface Education {
  id: number | null;
  subject: string;
  degree: DegreeType;
  institution: string;
  graduationYearMonth: string;
  gpa: number | null;
  attribution: Attribution;
}

export interface WorkExperience {
  id: number | null;
  organization: string;
  description: string;
  jobTitle: string | null;
  startYearMonth: string;
  endYearMonth: string;
  isCurrentEmployer: boolean;
  attribution: Attribution;
}

export interface PersonBean {
  id: number;
  auth0Id: string;
  externalId: string;
  profileId: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  sourcedFrom: string;
  linkedInUrl: string;
  educations: Array<EducationBean>;
  workExperiences: Array<WorkExperienceBean>;
  dataPoints: Array<DataPointBean>;
}

export interface PersonProfile {
  id: number;
  email: string;
  externalId: string;
  sourceCompany: Company;
  sourcedFrom: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  linkedInUrl: string;
  educations: ProfileEducation;
  workExperiences: ProfileWorkExperience;

}

export interface ProfileEducation {
  id: number;
  institution: string;
  subject: string;
  degree: DegreeType;
  graducationYearMonth: string;
  gpa: number;
  attribution: Attribution;
}

export interface ProfileWorkExperience {
  id: number;
  organization: string;
  jobTitle: string;
  description: string;
  startYearMonth: string;
  endYearMonth: string;
  isCurrentEmployer: boolean;
  attribution: Attribution;
}

export interface EducationBean {
  id: number | null;
  subject: string;
  degree: string;
  institution: string;
  graduationYearMonth: string;
  gpa: number | null;
  attribution: Attribution;
}

export interface WorkExperienceBean {
  id: number | null;
  organization: string;
  description: string;
  jobTitle: string;
  startYearMonth: any;
  endYearMonth: any;
  isCurrentEmployer: boolean;
  attribution: Attribution;
}

export interface DataPoint {
  conceptId: number | null;
  measureDataType: string;
  person: string;
  timeRecorded: number | null;
  id: number | null;
  concept: Concept;
  measure: Measure;
  measurement: Measurement;
  measureId: number | null;
}

export interface DataPointBean {
  id: number | null;
  conceptId: string | null;
  measureId: string | null;
  measureDataType: string;
  measurement: MeasurementBean;
  timeRecorded: number | null;
  person: string;
}

export interface MeasurementBean {
  exact: boolean;
  inValue: boolean;
  value: string | null;
  lowerBound: Bound | null;
  upperBound: Bound | null;
}

export interface Bound {
  value: string;
  inclusive: boolean;
}

export type ApplicationStatus
  = 'APPLIED'
  | 'CONTACTED'
  | 'CHAT_INCOMPLETE'
  | 'CHAT_COMPLETED'
  | 'RECRUITER_SCREEN'
  | 'HM_SCREEN'
  | 'ONSITE_INTERVIEW'
  | 'OTHER_ADVANCED'
  | 'HELD'
  | 'DNQ'
  | 'NOT_AUTHORIZED'
  | 'NOT_HIRED'
  | 'PIVOTED'
  | 'OTHER_REJECTED'
  | 'HIRED';

export interface Status<T> {
  status: T;
}

export type ConversationType
  = 'SOURCING'
  | 'SCREENING';

export type UtteranceDescriptorType
  = 'TEXT'
  | 'MULTIPLE_CHOICE'
  | 'FILE';

export type MessageItemType
  = 'TEXT'
  | 'FILE';

export interface MessageItem {
  id: number;
  text: string;
  type: MessageItemType;
  index: number;
  score: number;
}

export interface UtteranceDescriptor {
  id: number;
  text: string;
  type: UtteranceDescriptorType;
  choices: Array<MessageItem>;
}

export interface Message {
  id: number;
  text: string;
  ts: number;
  sentByBot: boolean;
  messageType: UtteranceDescriptorType;
  messageItems: Array<MessageItem>;
}

export interface ChatRecord {
  id: number;
  type: ConversationType;
  messages: Array<Message>;
}

export interface Application {
  id: number;
  resumeLink: string;
  evaluation: Evaluation;
  job: Job;
  personBean: PersonBean;
  status: Status<ApplicationStatus>;
  insights: Array<string>;
  published: boolean;
}

// todo: [nick] implement the below
export interface FlatApplication {
  id: number;
  evaluationId: number;
  personName: string;
  personId: number;
  personEmail: string;
  jobId: number;
  jobName: string;
  jobStatus: string;
  dateJobOpened: number;
  orgName: string;
  orgId: number;
  chatRecordId: number;
  status: ApplicationStatus;
}

export interface User {
  id: number | null;
  auth0Id: string;
}

export interface ChatDescriptor {
  id: number;
  name: string;
}

export interface HelperPage<T> {	
  content: Array<T>;	
  number: number; // page number	
  size: number;	
  totalElements: number;	
  totalPages: number;	
  last: boolean;	
  numberOfElements: number;	
  first: boolean;	
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  company: Company;
}

export interface PaginationProps {
  pageNumber: string;
  recordsPerPage: string;
  type?: string;
}
