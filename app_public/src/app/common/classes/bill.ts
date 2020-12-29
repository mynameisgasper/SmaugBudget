import { Category } from "./category";

export class Bill {
    _id: string;
    recipient: string;
    value: number;
    category: Category;
    currency: string;
    repeat: string;
    year: string;
    month: string;
    day: string;
    monthName: string;
    date: Date;
}