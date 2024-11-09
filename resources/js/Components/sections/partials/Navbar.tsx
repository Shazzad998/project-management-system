import ApplicationLogo from "@/Components/ApplicationLogo";
import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { AlignJustifyIcon } from "lucide-react";

const mainNavs = [
    {
        name: "Home",
        url: "#home",
    },
    {
        name: "Features",
        url: "#features",
    },
    {
        name: "Pricing",
        url: "#pricing",
    },
    {
        name: "Faq",
        url: "#faq",
    },
    {
        name: "Contact",
        url: "#contact",
    },
];
const Navbar = ({ auth }: PageProps) => {
    return (
        <nav className=" flex items-center justify-between sticky top-0 bg-background z-50 border-b border-border/30">
            <div className=" flex gap-x-20 items-center p-2 pl-4">
                <ApplicationLogo className=" w-32 fill-primary" />
                <div className="hidden lg:flex gap-4 items-center">
                    {mainNavs.map((nav, index) => (
                        <a
                            key={index}
                            className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                            href={nav.url}
                        >
                            {nav.name}
                        </a>
                    ))}
                </div>
            </div>
            <div className=" flex gap-2 items-center pr-4">
                <div className="hidden sm:flex items-center gap-2 ">
                    {auth.user ? (
                        <Button variant={"outline"} asChild>
                            <Link href={route("dashboard")}>Dashboard</Link>
                        </Button>
                    ) : (
                        <>
                            <Button variant={"outline"} asChild>
                                <Link href={route("login")}>Sign in</Link>
                            </Button>

                            <Button asChild>
                                <Link href={route("register")}>
                                    Start for free
                                </Link>
                            </Button>
                        </>
                    )}
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className=" px-3 lg:hidden">
                            <AlignJustifyIcon className=" w-4 h-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className=" sr-only">
                                Main Menu
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-2 pt-6">
                            {mainNavs.map((nav, index) => (
                                <SheetTrigger asChild>
                                    <a
                                        key={index}
                                        className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                                        href={nav.url}
                                    >
                                        {nav.name}
                                    </a>
                                </SheetTrigger>
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-2 mt-8">
                            {auth.user ? (
                                <Button
                                    variant={"outline"}
                                    className="w-full"
                                    asChild
                                >
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant={"outline"}
                                        className="w-full"
                                        asChild
                                    >
                                        <Link href={route("login")}>
                                            Sign in
                                        </Link>
                                    </Button>

                                    <Button className=" w-full" asChild>
                                        <Link href={route("register")}>
                                            Start for free
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;
