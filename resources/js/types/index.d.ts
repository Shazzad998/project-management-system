import { ReactNode } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export type NavLink = {
    id: number;
    label: string;
    route: string;
    icon?: ReactNode;
};

export type Project = {
    id: number;
    name: string;
    description: string | null;
    due_date: string | null;
    status: string;
    image_path: string | undefined;
    created_at: string;
    created_by: User;
    updated_by: User;
};

export type metaLinks = {
    url: string;
    label: string;
    active: boolean;
};

export type ProjectResource = {
    data: Project[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: metaLinks[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
};
