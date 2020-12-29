import { Friend } from "./friend";

export class FriendGroup {
    id: string;
    Group: string
    Balance: number
    Next: string;
    groupMember: Array<Friend>
}