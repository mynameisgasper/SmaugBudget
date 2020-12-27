import { Category } from "./category";

export class Bill {
    _id: string;
    recipient: string;
    value: number;
    category: Category;
    date: Date;
    currency: string;
    repeating: string;
}