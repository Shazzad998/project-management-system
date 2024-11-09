import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import { Briefcase, Home, Users } from "lucide-react";
import { Navbar } from "./partials/Navbar";
import { Toaster } from "@/Components/ui/toaster";
import { can } from "@/lib/utils";
import { SidebarProvider } from "@/Components/ui/sidebar";
import { AppSidebar } from "./partials/AppSidebar";

export default function AuthenticatedLayout({
    user,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const navMain = [
        {
            title: "Dashboard",
            url: "dashboard",
            icon: Home,
            items: [],
            show: true,
        },
        {
            title: "User Management",
            url: "#",
            icon: Users,
            show: can("user-list", user) || can("role-list", user),
            items: [
                {
                    title: "Users",
                    url: "users.index",
                    show: can("user-list", user),
                },
                {
                    title: "Roles",
                    url: "roles.index",
                    show: can("role-list", user),
                },
            ],
        },
        {
            title: "Work",
            url: "#",
            icon: Briefcase,
            show: can("project-list", user) || can("task-list", user),
            items: [
                {
                    title: "Projects",
                    url: "projects.index",
                    show: can("project-list", user),
                },
                {
                    title: "Tasks",
                    url: "tasks.index",
                    show: can("task-list", user),
                },
            ],
        },
    ];

    return (
        // <div className="grid h-full min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] ">
        //     <Sidebar navigations={navigations} />
        //     <div className="flex flex-col bg-muted/10 min-h-screen max-h-screen overflow-auto">
        //         <Navbar navigations={navigations} user={user} />
        //         <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        //             {children}
        //         </main>
        //     </div>
        //     <Toaster />
        // </div>
        <SidebarProvider>
            <AppSidebar navMain={navMain} />
            <main className=" max-h-screen overflow-auto w-full">
                <Navbar user={user} />
                <div className="p-4">{children}</div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
}
