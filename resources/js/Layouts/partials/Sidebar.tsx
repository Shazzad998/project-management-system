import { cn } from "@/lib/utils";
import { NavLink } from "@/types";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

type SidebarProps = {
    navigations: NavLink[];
};

const Sidebar = ({ navigations }: SidebarProps) => {
    return (
        <div className="hidden border-r bg-background md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold max-w-full"
                    >
                        <ApplicationLogo className="block h-9 fill-current text-gray-800" />{" "}
                        <span className="text-lg truncate">Laravel Shadcn</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navigations.map(
                            (nav) =>
                                nav.show && (
                                    <Link
                                        key={nav.label}
                                        href={route(nav.route)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                            route().current(nav.route) &&
                                                "bg-muted/50 text-primary"
                                        )}
                                    >
                                        {nav.icon}
                                        {nav.label}
                                    </Link>
                                )
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
