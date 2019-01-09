import { JobSummary, InboxSummary, JobMetrics, Inbox, Application, ChatRecord, Job, Highlight, EvaluationSummary, Company, ApplicationStatus } from '../../types/domainTypes';
import { Nullable } from '../../types/utilityTypes';
import { Sort } from '../../types/routingTypes';
import { ImageFile } from 'react-dropzone';

export interface ApiService {
    getJobSummaries: () => Promise<Array<JobSummary>>;
    getJobInbox: (jobId: number) => Promise<Nullable<InboxSummary>>;
    getJobMetrics: (jobId: number) => Promise<Nullable<JobMetrics>>;
    getApplications: (jobId: number, inbox: Inbox, sort: Sort, score?: string) => Promise<Nullable<Array<Application>>>;
    getAllQualifiedApps: (jobId: number) => Promise<Nullable<Array<Application>>>;
    getAllUnQualifiedApps: (jobId: number) => Promise<Nullable<Array<Application>>>;
    getApplication: (appId: number) => Promise<Nullable<Application>>;
    updateApplicationStatus: (appId: number, externalStatus: Inbox) => Promise<null>;
    getChatRecord: (appId: number) => Promise<Nullable<ChatRecord>>;
    getJobOverviews: () => Promise<Array<Job & JobMetrics>>;
    createJobFromSoc: (soc: string) => Promise<Job>;
    createJobFromJd: (file: ImageFile) => Promise<Job>;
    createJobFromText: (text: string) => Promise<Job>;
    getEvalSummary: (jobId: number) => Promise<EvaluationSummary>;
    getCompany: () => Promise<Company>;
    updateStatus: (appId: number, externalStatus: ApplicationStatus) => Promise<void>;
    getHighlights: (appId: number) => Promise<Array<Highlight>>;
}
