export class Goal {
    constructor(_id: string, title: string, progress: number, target: number, targetLeft: number, color: string, monthlyTarget: number, categoryName: string, year: string, month: string, day: string) {
        this._id = _id;
        this.title = title;
        this.progress = progress;
        this.target = target;
        this.targetLeft = targetLeft
        this.color = color;
        this.monthlyTarget = monthlyTarget;
        this.categoryName = categoryName;
        this.year = year;
        this.month = month;
        this.day = day
    }

    public _id: string;
    public title: string;
    public progress: number;
    public target: number;
    public targetLeft: number;
    public color: string;
    public monthlyTarget: number;
    public categoryName: string;
    public year: string;
    public month: string;
    public day: string;
}