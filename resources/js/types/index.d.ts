import { ReactNode } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    image_path: string | null;
    roles: string[];
    permissions: string[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export type NavLink = {
    title: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    items: {
        url: string;
        title: string;
        show: boolean;
    }[];
    show: boolean;
};

export type Project = {
    id: number;
    name: string;
    description: string | null;
    due_date: string | null;
    status: string;
    user_ids: number[];
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
    assigned_user_id: string;
    project: Project;
    project_id: string;
};

export type Role = {
    id: number;
    name: string;
    permissions: Permission[];
};

export type Permission = {
    id: number;
    name: string;
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
    role?: string;
    permissions?: string;
    priority?: string;
    project_id?: string;
    assigned_user_id?: string;
    user_ids?: string;
};

export type ProjectOption = {
    id: string;
    name: string;
};
export type UserOption = {
    id: string;
    name: string;
};
