import { ApiService } from './interface';
import { JobSummary, InboxSummary, JobMetrics, Inbox, Application, 
    ChatRecord, Job, EvaluationSummary, Company, ApplicationStatus, Highlight } from '../../types/domainTypes';
import { Nullable } from '../../types/utilityTypes';
import { Sort } from '../../types/routingTypes';
import { AxiosInstance, AxiosStatic, AxiosRequestConfig } from 'axios';
import { ImageFile } from 'react-dropzone';
import Auth from '../auth/auth';

export class DataApi implements ApiService {
    private http: AxiosInstance;

    constructor (http: AxiosStatic, baseUrl: string = '') {
        this.http = http.create({
            baseURL: `${baseUrl}/api/v1`
        });
    }

    public getJobSummaries = (): Promise<Array<JobSummary>> => {
        return this.http.get(`/jobs/job-summaries`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getJobInbox = (jobId: number): Promise<Nullable<InboxSummary>> => {
        return this.http.get(`/jobs/${jobId}/inbox-summary`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getJobMetrics = (jobId: number): Promise<Nullable<JobMetrics>> => {
        return this.http.get(`/jobs/${jobId}/metrics`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getApplications = (jobId: number, inbox: Inbox, sort: Sort, score?: string): Promise<Nullable<Array<Application>>> => {
        const parsedScore = score ? `&score=${score.toUpperCase()}` : '';
        return this.http.get(`/jobs/${jobId}/applications?inbox=${inbox.toUpperCase()}${parsedScore}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getAllQualifiedApps = (jobId: number): Promise<Nullable<Array<Application>>> => {
        return this.http.get(`/jobs/${jobId}/applications?score=ALL_QUALIFIED`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getAllUnQualifiedApps = (jobId: number): Promise<Nullable<Array<Application>>> => {
        return this.http.get(`/jobs/${jobId}/applications?score=UNQUALIFIED`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getApplication = (applicationId: number): Promise<Nullable<Application>> => {
        return this.http.get(`/applications/${applicationId}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public updateApplicationStatus = (appId: number, externalStatus: Inbox): Promise<null> => {
        return this.http.post(`/applications/${appId}/externalStatus/${externalStatus}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getChatRecord = (appId: number): Promise<Nullable<ChatRecord>> => {
        return this.http.get(`/applications/${appId}/chat-record`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getJobOverviews = (): Promise<Array<Job & JobMetrics>> => {
         return new Promise((resolve) => {
             setTimeout(() => resolve([]), 2000);
         });
    }

    public createJobFromSoc = (soc: string): Promise<Job> => {
        return this.http.post(`/jobs/soc/${soc}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public createJobFromJd = (file: ImageFile): Promise<Job> => {
        const formData = new FormData();
        formData.append('file', file);

        const config = { headers: { 
            ...this.createAuthHeader(),
            'Content-Type': 'multipart/form-data'
        }};

        return this.http.post(`/jobs/file`, formData, config)
            .then(res => res.data);   
    }

    public createJobFromText = (text: string): Promise<Job> => {
        const config = { headers: { 
            ...this.createAuthHeader(),
            'Content-Type': 'text/plain'
        }};

        return this.http.post(`/jobs/text`, text, config)
            .then(res => res.data);   
    }

    public getEvalSummary = (jobId: number): Promise<EvaluationSummary> => {
        return this.http.get(`/calibration/job/${jobId}` , this.createAuthHeader())
            .then(res => res.data); 
    }

    public getCompany = (): Promise<Company> => {
        return this.http.get(`/company`, this.createAuthHeader())
            .then(res => res.data);
    }

    public updateStatus = (appId: number, externalStatus: ApplicationStatus): Promise<void> => {
        return this.http.post(`/applications/${appId}/status/${externalStatus}`, {}, this.createAuthHeader())
            .then(res => res.data);
    }

    public getHighlights = (appId: number): Promise<Array<Highlight>> => {
        return this.http.get(`/applications/${appId}/highlights`, this.createAuthHeader())
            .then(res => res.data);
    }

    private createAuthHeader = (): AxiosRequestConfig => {
        const auth: Auth = new Auth();
        return {
            headers: {
                'authorization': 'Bearer ' + auth.getAccessToken()
            }
        };
    }
}