import ApplicationLogo from "@/Components/ApplicationLogo";
import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { AlignJustifyIcon } from "lucide-react";

const Navbar = ({ auth }: PageProps) => {
    return (
        <nav className=" p-2 flex items-center justify-between">
            <div className=" flex gap-x-20 items-center">
                <ApplicationLogo />
                <div className="hidden lg:flex gap-4 items-center">
                    <Link
                        className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                        href="/"
                    >
                        Features
                    </Link>
                    <Link
                        className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                        href="/"
                    >
                        Pricing
                    </Link>
                    <Link
                        className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                        href="/"
                    >
                        FAQ
                    </Link>
                    <Link
                        className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                        href="/"
                    >
                        Contact
                    </Link>
                </div>
            </div>
            <div className=" flex gap-2 items-center">
                <div className="hidden sm:flex items-center gap-2 ">
                    {auth.user ? (
                        <Link href={route("dashboard")}>
                            <Button variant={"outline"} asChild>
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={route("login")}>
                                <Button variant={"outline"} asChild>
                                    Sign in
                                </Button>
                            </Link>
                            <Link href={route("register")}>
                                <Button asChild>Start for free</Button>
                            </Link>
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
                                Edit profile
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-2 pt-6">
                            <Link
                                className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                                href="/"
                            >
                                Home
                            </Link>
                            <Link
                                className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                                href="/"
                            >
                                Features
                            </Link>
                            <Link
                                className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                                href="/"
                            >
                                Pricing
                            </Link>
                            <Link
                                className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                                href="/"
                            >
                                FAQ
                            </Link>
                            <Link
                                className="p-2 font-semibold text-foreground/70 hover:text-foreground"
                                href="/"
                            >
                                Contact
                            </Link>
                        </div>
                        <div className="flex flex-col items-center gap-2 mt-8">
                            {auth.user ? (
                                <Link href={route("dashboard")}>
                                    <Button
                                        variant={"outline"}
                                        className="w-full"
                                        asChild
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route("login")}>
                                        <Button
                                            variant={"outline"}
                                            className="w-full"
                                            asChild
                                        >
                                            Sign in
                                        </Button>
                                    </Link>
                                    <Link href={route("register")}>
                                        <Button className=" w-full" asChild>
                                            Start for free
                                        </Button>
                                    </Link>
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
