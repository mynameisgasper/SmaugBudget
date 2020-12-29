import { Bill } from "./bill";
import { Category } from "./category";
import { Envelope } from "./envelope";
import { Expense } from "./expense";
import { FriendGroup } from "./friendGroup";
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
    envelopes: Array<Envelope>;
    goals: Array<Goal>;
    bills: Array<Bill>;
    categories: Array<Category>;
    expense: Array<Expense>;
    friendgroups: Array<FriendGroup>;
}