import { Nullable } from './utilityTypes';

export type ConversationType = 'sourcing';
export type JobStatus = 'draft' | 'live';

export interface Message {
    id: number;
    text: string;
    timestamp: number;
    sentByBot: boolean;
    utterance: Nullable<object>;
    goal: Nullable<object>;
    messageType: Nullable<string>;
    messageItems: Array<object>;
}

export interface Person {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    linkedInUrl: string;
    address: string;
}

export interface Company {
    id: number;
    description: string;
    name: string;
}

export interface Job {
    id: number;
    name: string;
    externalStatus: JobStatus;
    dateOpened: number;
    company: Company;
}

export interface JobSummary {
    id: number;
    name: string;
    externalId: string | null;
}

export interface ChatRecord {
    id: number;
    type: ConversationType;
    messages: Array<Message>;
    job?: Job;
    person?: Person;
}

export interface JobMetrics {
    newCandidates: number;
    advancedCandidates: number;
    chatsInLastWeek: number;
    totalChats: number;
    chatCompletion: number; // between 0 and 1
}

export interface InboxSummary {
    inbox: number;
    held: number;
    advanced: number;
    rejected: number;
    unqualified: number;
    qualified: number;
}

export type Origin = 'sourced' | 'post_apply';
export type Score = 'all' | 'qualified' | 'unqualified' | 'ideal';
export type Applied 
    = 'APPLIED'
    | 'CONTACTED';
export type Engaged
    = 'CHAT_INCOMPLETE'
    | 'CHAT_COMPLETED'
    | 'EVALUATED';
export type Advanced
    = 'RECRUITER_SCREEN'
    | 'HM_SCREEN'
    | 'ONSITE_INTERVIEW'
    | 'OTHER_ADVANCED'
    | 'HIRED';
export type Held = 'HELD';
export type Rejected
    = 'DNQ'
    | 'NOT_AUTHORIZED'
    | 'NOT_HIRED'
    | 'PIVOTED'
    | 'OTHER_REJECTED';
export type ApplicationStatus = Applied | Engaged | Advanced | Held | Rejected;

export interface Application {
    id: number;
    person: Person;
    profile: Profile;
    jobId: number;
    date: number;
    externalStatus: ApplicationStatus;
    resumeLink?: string;
    linkedIn?: string;
    origin: Origin;
    score: Score;
}

// <------------->
export interface Duration {
    startDate: number; // epoch millis
    endDate?: number; // epoch mills
}

export interface ResumeSource {
    s3Link: string;
    text: string;
}

export interface ChatSource {
    chatRecordId: number;
    text: string;
}

export interface FactSource {
    factId: number;
}

type Attribution = ResumeSource | ChatSource | FactSource;

export interface Employment {
    duration: Duration; // years;
    company: Company;
    title: string;
    attribution?: Attribution;
    current?: boolean;
    insight?: Array<string>;
}

export interface Education {
    degree: string;
    degreeAttained: boolean;
    school: string;
    duration: Duration;
    attribution: Attribution;
}

export interface SkillInsight {
    insight: string;
    present: boolean;
}

export interface Skill {
    name: string;
    duration: Duration;
    recency: string;
    attribution?: Attribution; 
    hasSkill?: boolean;
    insights?: Array<SkillInsight>;
}

export interface Highlight {
    header: string;
    text: string;
}

export interface Node {
    text: string;
    present: boolean;
}

export interface Category {
    name: string;
    items: Array<String>;
}

export interface Profile {
    header: string;
    workHistory: Array<Employment>;
    skills: Array<Skill>; // sorted by evaluation score
    tools: Array<Category>;
    abilities: Array<Category>;
    educationHistory: Array<Education>;
    highlights: Array<Highlight>;
    insights: Array<string>;
    importantNodes: Array<Node>;
}

export interface EvaluationNode {
    name: string;
}

export interface QualificationCategory {
    name: string;
    skills: Array<EvaluationNode>;
}

export interface ParsedJobDescription {
    title: string;
    location: string;
    source: string;
    salaryRange: {
        min: number;
        max: number;
    };
    rawText: string;
    soc: string;
}

export interface EvaluationSummary {
    soc: string;
    title: string;
    knockOuts: Array<EvaluationNode>;
    qualifications: Array<QualificationCategory>;
    salaryMax: number;
    salaryMin: number;
    parsedJobDescription: Nullable<ParsedJobDescription>;
}

export type Inbox = 'new' | 'held' | 'advanced' | 'rejected';