export interface Location {
    province: string;
    country: string;
}

export interface PersonalInfo {
    fullName: string;
    email: string;
    nationality: string;
    location: Location;
    linkedin: string;
    github: string;
    avatarUrl?: string;
}

export interface ProfessionalSummary {
    title: string;
    yearsOfExperience: number;
    description: string;
}

export interface Experience {
    company: string;
    sector: string;
    role: string;
    startDate: string;
    endDate: string;
    durationYears: number;
    responsibilities: string[];
    technologies: string[];
}

export interface Project {
    title: string;
    type: "professional" | "personal" | "academic";
    status?: string;
    year: string;
    description: string;
    stack: string[];
    repo?: string;
    demo?: string;
    video?: string;
    images?: string[];
}

export interface Education {
    degree: string;
    institution: string;
    startYear: number;
    endYear: number;
    location: string;
}

export interface Skills {
    languages: string[];
    frontend: string[];
    backend: string[];
    mobile: string[];
    databases: string[];
    tools: string[];
    other: string[];
}

export interface Course {
    name: string;
    course: string;
    provider: string;
    year: number;
    hours: number;
}

export interface Language {
    language: string;
    writtenLevel: string;
    spokenLevel: string;
}

export interface DeveloperProfile {
    personal: PersonalInfo;
    professionalSummary: ProfessionalSummary;
    roles: string[];
    experience: Experience[];
    projects: Project[];
    education: Education[];
    skills: Skills;
    courses: Course[];
    languages: Language[];
}
