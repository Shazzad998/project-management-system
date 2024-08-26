import { ReactNode } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type NavLink = {
    id:number,
    label:string,
    route:string,
    icon?:ReactNode
}
