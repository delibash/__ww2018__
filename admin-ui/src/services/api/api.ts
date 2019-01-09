import { AxiosInstance, AxiosStatic, AxiosRequestConfig } from 'axios';
import { Application, Job, Concept, Measure, DataPointBean, Company, User, ChatDescriptor, KGNode, HelperPage, FlatApplication, ChatRecord, PersonProfile, CreateUserRequest, Evaluation } from '../../types/domainTypes';
import Auth from '../auth/auth';

export default class Api {
    private http: AxiosInstance;

    public constructor (http: AxiosStatic, baseUrl: string = '') {
        this.http = http.create({
            baseURL: `${baseUrl}/api/v1`
        });
    }

    public getApplications = (): Promise<Application[]> => {
        return this.http.get('/applications', this.createAuthHeader())
            .then(res => res.data);
    }

    public getApplicationById = (id: number): Promise<Application> => {
        return this.http.get(`/applications/${id}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getJobs = (): Promise<Job[]> => {
        return this.http.get('/jobs', this.createAuthHeader())
            .then(res => res.data);
    }

    public getJobById = (id: number): Promise<Job> => {
        return this.http.get(`/jobs/${id}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getDataPoint = (personId: number): Promise<DataPointBean> => {
        return this.http.get(`/applications/data-points/${personId}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getDataPoints = (personId: number): Promise<DataPointBean[]> => {
        return this.http.get(`/people/${personId}/data-points`, this.createAuthHeader())
            .then(res => res.data);
    }

    public saveDataPoint = (personId: number, dataPoint: DataPointBean): Promise<DataPointBean> => {
        return this.http.post(`/people/${personId}/data-points`, dataPoint, this.createAuthHeader())
            .then(res => res.data);
    }

    public searchConcept = (searchTerm: string): Promise<Concept> => {
        return this.http.get(`/kowledge-graph/concepts?search=${searchTerm}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public searchMeasure = (searchTerm: string): Promise<Measure> => {
        return this.http.get(`/kowledge-graph/measures?search=${searchTerm}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public saveApplication = (application: Application): Promise<Application> => {
        return this.http.post('/applications', application, this.createAuthHeader())
            .then(res => res.data);
    }

    public saveJob = (job: Job): Promise<Job> => {
        return this.http.post('/jobs', job, this.createAuthHeader())
            .then(res => res.data);
    }

    public getOrganizations = (): Promise<Company[]> => {
        return this.http.get('/organizations', this.createAuthHeader())
            .then(res => res.data);
    }

    public getOrganizationById = (id: number): Promise<Company> => {
        return this.http.get(`/organizations/${id}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getUsers = (): Promise<User[]> => {
        return this.http.get('/users', this.createAuthHeader())
            .then(res => res.data);
    }

    public getChatDescriptorById = (id: number): Promise<ChatDescriptor> => {
        return this.http.get(`/chat-descriptors/${id}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getChatDescriptors = (): Promise<ChatDescriptor[]> => {
        return this.http.get('/chat-descriptors', this.createAuthHeader())
            .then(res => res.data);
    }

    public getConcepts = (query: string, size: number, vocabularyType: string): Promise<KGNode[]> => {
        return this.http.get(`/knowledge-graph/concepts?query=${query}&size=${size}&vocabulary_type=${vocabularyType}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public getMeasures = (query: string, size: number, vocabularyType: string): Promise<KGNode[]> => {
        return this.http.get(`/knowledge-graph/measures?query=${query}&size=${size}&vocabulary_type=${vocabularyType}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public pageApplications = (pageNumber: number, size: number): Promise<HelperPage<FlatApplication>> => {
        return this.http.get(`/applications/page?page_number=${pageNumber}&size=${size}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public pageJobs = (pageNumber: number, size: number): Promise<HelperPage<Job>> => {
        return this.http.get(`/jobs/page?page_number=${pageNumber}&size=${size}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public pageOrganizations = (pageNumber: number, size: number): Promise<HelperPage<Company>> => {
        return this.http.get(`/organizations/page?page_number=${pageNumber}&size=${size}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public pageUsers = (pageNumber: number, size: number): Promise<HelperPage<User>> => {
        return this.http.get(`/users/page?page_number=${pageNumber}&size=${size}`, this.createAuthHeader())
            .then(res => res.data);
    }

    public pagePeopleProfiles = (pageNumber: number, size: number): Promise<HelperPage<PersonProfile>> => {
        return this.http.get(`/people/defaultProfiles?page_number=${pageNumber}&size=${size}`, this.createAuthHeader())
            .then(res => res.data);
    }
    
    public publishApplication = (appId: number): Promise<string> => {
        return this.http.post(`/applications/${appId}/publish`, {}, this.createAuthHeader())
            .then(res => res.data);
    }

    public getChatRecordByApplicationId = (appId: number): Promise<ChatRecord> => {
        return this.http.get(`/applications/${appId}/chat-record`, this.createAuthHeader())
            .then(res => res.data);
    }

    public saveCompany = (company: Company): Promise<Company> => {
        return this.http.post(`/organizations`, company, this.createAuthHeader())
            .then(res => res.data);
    }

    public createApplication = (jobId: number, profileId: number): Promise<Application> => {
        return this.http.post(`/applications/create?jobId=${jobId}&profileId=${profileId}`, null, this.createAuthHeader())
            .then(res => res.data);
    }

    public createWSAUser = (user: CreateUserRequest): Promise<User> => {
        return this.http.post(`/users`, user, this.createAuthHeader())
            .then(res => res.data);
    }

    public reEvaluate = (appId: number, dataPoints: Array<DataPointBean>): Promise<Evaluation> => {
        return this.http.post(`/applications/${appId}/re-evaluate`, dataPoints, this.createAuthHeader())
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
