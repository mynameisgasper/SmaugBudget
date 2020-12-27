import { Friend } from "./friend";

export class FriendGroup {
    _id: string;
    name: string
    balance: number
    friends: Array<Friend>
}