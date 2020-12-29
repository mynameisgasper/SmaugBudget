export class Alert {
    constructor(type: string, name: string, text: string) {
        this.type = type;
        this.name = name;
        this.text = text;
    }

    public type: string;
    public name: string;
    public text: string;
}
