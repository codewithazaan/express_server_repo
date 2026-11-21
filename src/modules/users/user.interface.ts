export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    age?: number | null
}

export interface updateUser {
    name?: string | null;
    email: string;
    password?: string | null;
    phone?: string | null;
    age?: number | null;
}