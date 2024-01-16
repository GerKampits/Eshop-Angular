export interface Adress {
    area: string;
    road: string;
}

export interface Phone {
    type: string;
    number: string;
}

export interface User {
    username: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    address: Adress;
    phone: Phone[];
}

export interface UserAPIList {
    status: boolean;
    data: User[];
}

export interface UserAPIUserOne {
    status: boolean;
    data: User
}