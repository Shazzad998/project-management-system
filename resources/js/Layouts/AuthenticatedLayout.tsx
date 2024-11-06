import { PropsWithChildren, ReactNode } from "react";
import { NavLink as NavLinkType, User } from "@/types";
import { FolderOpen, Home, ListTodo, UserRoundCog, Users2 } from "lucide-react";
import { Navbar } from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";
import { Toaster } from "@/Components/ui/toaster";
import { can } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "./partials/AppSidebar";

export default function AuthenticatedLayout({
    user,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const navigations: NavLinkType[] = [
        {
            label: "Dashboard",
            route: "dashboard",
            icon: <Home className="h-5 w-5" />,
            show: true,
        },
        {
            label: "Users",
            route: "users.index",
            icon: <Users2 className="h-5 w-5" />,
            show: can("user-list", user),
        },
        {
            label: "Roles",
            route: "roles.index",
            icon: <UserRoundCog className="h-5 w-5" />,
            show: can("role-list", user),
        },
        {
            label: "Projects",
            route: "projects.index",
            icon: <FolderOpen className="h-5 w-5" />,
            show: can("project-list", user),
        },
        {
            label: "Tasks",
            route: "tasks.index",
            icon: <ListTodo className="h-5 w-5" />,
            show: can("task-list", user),
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
            <AppSidebar />
            <main className=" max-h-screen overflow-auto w-full">
                <Navbar navigations={navigations} user={user} />
                <div className="p-4">{children}</div>
            </main>
        </SidebarProvider>
    );
}
