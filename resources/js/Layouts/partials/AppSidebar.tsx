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
    useSidebar,
} from "@/Components/ui/sidebar";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Briefcase, ChevronRight, Home, Settings, Users } from "lucide-react";
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
    {
        title: "Settings",
        url: "settings.index",
        icon: Settings,
        items: [],
    },
];

export function AppSidebar() {
    const isRouteActive = (subItems: { title: string; url: string }[]) => {
        return subItems.some((subItem) => route().current(subItem.url));
    };

    const { state } = useSidebar();

    const setting = usePage<PageProps>().props.auth.setting;
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold max-w-full"
                        >
                            {state == "expanded" ? (
                                <>
                                    <img
                                        src={setting.logo}
                                        alt="giftly-logo"
                                        className=" w-28 h-auto"
                                    />
                                </>
                            ) : (
                                <>
                                    <img
                                        src={setting.icon}
                                        alt="giftly-logo"
                                        className=" w-8 h-auto"
                                    />
                                </>
                            )}
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
                                                    {item.items?.map(
                                                        (subItem) => (
                                                            <SidebarMenuSubItem
                                                                key={
                                                                    subItem.title
                                                                }
                                                            >
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={route().current(
                                                                        subItem.url
                                                                    )}
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
                                                        )
                                                    )}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            isActive={route().current(item.url)}
                                        >
                                            <Link
                                                href={
                                                    item.url != "#"
                                                        ? route(item.url)
                                                        : item.url
                                                }
                                            >
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
