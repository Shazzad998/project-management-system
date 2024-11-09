import { LogOutIcon, User2Icon } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";

import { User } from "@/types";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { SidebarTrigger } from "@/Components/ui/sidebar";

type NavbarProps = {
    user: User;
};

export function Navbar({ user }: NavbarProps) {
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    return (
        <header className="flex pt-[10px] pb-[9px] justify-between items-center gap-4 border-b bg-background px-4  sticky top-0 z-10">
            {/* Logout Dialog */}
            <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            You will have to login again to access the user only
                            services.
                        </DialogDescription>
                    </DialogHeader>
                    <div className=" flex justify-end gap-x-2">
                        <Button variant={"destructive"} asChild>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Logout
                            </Link>
                        </Button>
                        <DialogClose asChild>
                            <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>

            <SidebarTrigger />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                    >
                        <User2Icon className="w-4 h-4" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" min-w-52">
                    <DropdownMenuLabel className=" flex flex-col">
                        {user.name}{" "}
                        <span className=" font-normal truncate">
                            {user.email}
                        </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link
                            className="flex items-center"
                            href={route("profile.edit")}
                        >
                            {" "}
                            <User2Icon className="w-4 h-4 mr-2" /> Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)}>
                        <LogOutIcon className=" w-4 h-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
