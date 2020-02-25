export interface User {
    username: string;
    email: string;
    password: string;
    contact: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface Generate {
    orignal: string;
    passed?: string;
}

export interface Verify {
    token : string;
}

export interface Link{
    link ?: string;
}