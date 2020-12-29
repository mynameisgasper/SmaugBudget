import { Category } from "./category";

export class Expense {
    _id: string;
    date: Date;
    category: Category;
    recipient: string;
    value: Number;
    currency: string;
}