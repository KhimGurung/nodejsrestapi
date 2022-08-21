import { Schema } from "mongoose";

export interface IUser{
    name: string;
    username: string;
    contact: string;
    dob: Date;
    nonce: string;
    refreshTokens: Schema.Types.ObjectId
}

export interface ILocation {
    country: string;
    city: string;
}

export interface ICompany{
    name: string;
    location: ILocation;
    companySize: number;
    email: string;
    about: string;
    website: string;
    uderId: any;
}

type seniorityLevel = "entry" | "junior" | "intermediate" | "senior";
type jobTypes = "office" | "remote" | "hybrid";

interface ISalaryRange{
    min: number;
    max: number;
}

export interface IJob {
    title: string;
    description: string;
    seniority: seniorityLevel;
    type: jobTypes;
    salaryRange: ISalaryRange;
    link: string;
    openingDate: Date;
    closingDate: Date;
    companyId: any;
}

export interface IToken {
    refreshToken: string,
    user: Schema.Types.ObjectId
}