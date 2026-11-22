export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    age?: number | null;
    is_active: boolean;
    role?:string
}

export interface updateUser {
    name?: string | null;
    email: string;
    password?: string | null;
    phone?: string | null;
    age?: number | null;
}