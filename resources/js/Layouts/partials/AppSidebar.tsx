import ApplicationLogo from "@/Components/ApplicationLogo";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { Briefcase, ChevronRight, Home, Users } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const navMain = [
    {
        title: "Dashboard",
        url: "dashboard",
        icon: Home,
        items: [],
    },
    {
        title: "User Management",
        url: "#",
        icon: Users,
        items: [
            {
                title: "Users",
                url: "users.index",
            },
            {
                title: "Roles",
                url: "roles.index",
            },
        ],
    },
    {
        title: "Work",
        url: "#",
        icon: Briefcase,
        items: [
            {
                title: "Projects",
                url: "projects.index",
            },
            {
                title: "Tasks",
                url: "tasks.index",
            },
        ],
    },
];

export function AppSidebar() {
    const isRouteActive = (subItems:{title:string, url:string}[]) => {
        return subItems.some((subItem) => route().current(subItem.url));
      };
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold max-w-full"
                        >
                            <ApplicationLogo className="block h-7 fill-current text-primary" />
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                    {navMain.map((item) => (
                        <Fragment key={item.title}>
                            {item.items?.length > 0 ? (
                                <Collapsible
                                    
                                    asChild
                                    defaultOpen={isRouteActive(item.items)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={route().current(subItem.url)}
                                                        >
                                                            <Link
                                                                href={route(
                                                                    subItem.url
                                                                )}
                                                            >
                                                                {" "}
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title} isActive={route().current(item.url)}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        </Fragment>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
