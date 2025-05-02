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
import { can } from "@/lib/utils";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Briefcase, ChevronRight, Home, Settings, Users, Workflow } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export function AppSidebar() {
    const isRouteActive = (subItems: { title: string; url: string }[]) => {
        return subItems.some((subItem) => route().current(subItem.url));
    };

    const { state } = useSidebar();

    const setting = usePage<PageProps>().props.auth.setting;
    const user = usePage<PageProps>().props.auth.user;

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
                    show: can("role-list", user),
                },
                {
                    title: "Roles",
                    url: "roles.index",
                    show: can("user-list", user),
                },
            ],
        },

        {
            title: "Projects",
            url: "projects.index",
            icon: Briefcase,
            show: can("project-list", user),
            items: [],
        },
        {
            title: "Tasks",
            url: "tasks.index",
            icon: Workflow,
            show: can("task-list", user),
            items: [],
        },


        {
            title: "Settings",
            url: "settings.index",
            icon: Settings,
            items: [],
            show: can("settings-view", user),
        },
    ];
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
                                        alt="qwirk-logo"
                                        className=" w-28 h-auto"
                                    />
                                </>
                            ) : (
                                <>
                                    <img
                                        src={setting.icon}
                                        alt="qwirk-logo"
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
                                {item.show && item.items?.length > 0 ? (
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
                                                        (subItem) =>
                                                            subItem.show && (
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
                                                                            href={
                                                                                subItem.url !=
                                                                                ""
                                                                                    ? route(
                                                                                          subItem.url
                                                                                      )
                                                                                    : ""
                                                                            }
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
                                    item.show && (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={item.title}
                                                isActive={route().current(
                                                    item.url
                                                )}
                                            >
                                                <Link
                                                    href={
                                                        item.url != ""
                                                            ? route(item.url)
                                                            : ""
                                                    }
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
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
