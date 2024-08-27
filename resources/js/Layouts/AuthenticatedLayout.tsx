import { PropsWithChildren, ReactNode } from "react";
import { NavLink as NavLinkType, User } from "@/types";
import {  FolderOpen, Home, ListTodo, Users2 } from "lucide-react";
import { Navbar } from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";

const navigations: NavLinkType[] = [
    {
        id: 1,
        label: "Dashboard",
        route: "dashboard",
        icon: <Home className="h-5 w-5" />,
    },
    {
        id: 2,
        label: "Users",
        route: "users.index",
        icon: <Users2 className="h-5 w-5" />,
    },
    {
        id: 3,
        label: "Projects",
        route: "projects.index",
        icon: <FolderOpen className="h-5 w-5" />,
    },
    {
        id: 4,
        label: "Tasks",
        route: "tasks.index",
        icon: <ListTodo className="h-5 w-5" />,
    },

];

export default function AuthenticatedLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
            <Sidebar navigations={navigations} />
            <div className="flex flex-col">
                <Navbar navigations={navigations} user={user} />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-h-[calc(100vh-3.5rem)] overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
