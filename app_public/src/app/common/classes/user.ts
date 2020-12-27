import { Goal } from "./goal";

export class User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    paycheck: Number;
    paycheckLastMonth: Number;
    paycheckDate: Number;
    balance: Number;
    accessLevel: Number;
    profilePic: string;
    language: string;
    defaultCurrency: string;
    connections: Array<Object>;
    envelopes: Array<Object>;
    goals: Array<Goal>;
    bills: Array<Object>;
    categories: Array<Object>;
    expense: Array<Object>;
    friendgroups: Array<Object>;
}