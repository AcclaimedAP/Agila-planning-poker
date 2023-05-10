export interface IUser {
    id: string;
    name: string;
}

export interface IVote {
    name: string;
    voteValue: number;
}

export interface IUsers {
    username: string;
    isAdmin: boolean;
}