export class Card {
    constructor(id: number, color: string, icon: string, count: number, title: string, comment: string) {
        this.id = id;
        this.color = color;
        this.icon = icon;
        this.count = count;
        this.title = title
        this.comment = comment;
    }

    public id: number;
    public color: string;
    public icon: string;
    public count: number;
    public title: string;
    public comment: string;
}
