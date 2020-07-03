export interface IUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthday: string;
    phone: number;
    roleId: number;
    imageUserUrl?: string;
}

export interface IUserPatch {
    op: string;
    path: string;
    value: number;
}
