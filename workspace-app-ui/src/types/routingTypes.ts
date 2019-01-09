import { Inbox, Score } from './domainTypes';

export type Tab = Inbox | 'dashboard' | 'qualified' | 'unqualified';

export type ViewType = 'summary' | 'expanded';

export type Sort = 'chrono' | 'match' | 'rubric';

export interface RoleParams {
  roleId: string;
  tab: Tab;
  score: Score;
  sort: Sort;
}

export interface CandidateParams {
  candidateId: string;
}

export interface CalibrationParams {
  jobId: string;
}
