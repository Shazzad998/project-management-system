import { ReactNode } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    image_path: string | null;
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

export type Task = {
    id: number;
    name: string;
    description: string | null;
    due_date: string | null;
    status: string;
    priority: string;
    image_path: string | undefined;
    created_at: string;
    updated_at: string;
    created_by: User;
    updated_by: User;
    assigned_user: User | null;
    project: Project;
};

export type ProjectResource = {
    data: Project[];
};

export type TaskResource = {
    data: Task[];
};
export type UserResource = {
    data: User[];
};

export type SelectOption = {
    label: string;
    value: string;
};

export type Errors = {
    name?: string;
    description?: string;
    due_date?: string;
    status?: string;
    email?: string;
    password?: string;
};
