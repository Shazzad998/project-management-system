import { LogOutIcon, Menu, Search, User2Icon } from "lucide-react";

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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { cn } from "@/lib/utils";
import { NavLink, User } from "@/types";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

type NavbarProps = {
    navigations: NavLink[];
    user: User;
};

export function Navbar({ navigations, user }: NavbarProps) {
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    return (
        <header className="flex pt-[10px] pb-[9px] items-center gap-4 border-b bg-background px-4 lg:px-6 sticky top-0 z-10">
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

            {/* Profile Update Dialog */}
            {/* <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information.
            </DialogDescription>
          </DialogHeader>
          <form className=" grid gap-4" onSubmit={handleSubmit}>
            <div className=" grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <ErrorMessage message={errors.name?.[0]} className="-mt-1"/>
            </div>
            <div className=" grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <ErrorMessage message={errors.username?.[0]} className="-mt-1"/>
            </div>
            <div className=" grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email as string}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ErrorMessage message={errors.email?.[0]} className="-mt-1"/>
            </div>
            <div className=" grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ErrorMessage message={errors.password?.[0]} className="-mt-1"/>
            </div>
            <div className=" grid gap-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                type="password"
                id="password_confirmation"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <div className=" grid gap-2 flex-1">
              <Label htmlFor="profile_image">Profile Image</Label>
              <Input
                type="file"
                id="profile_image"
                accept="image/png,image/svg,image/jpg,image/jpeg,image/webp"
                onChange={handleImageChange}
                className=" file:text-muted-foreground"
              />
              <ErrorMessage message={errors.profile_image?.[0]} className="-mt-1"/>
            </div>
            <DialogFooter>
              <Button type="submit">Update</Button>
              <DialogClose asChild>
                <Button variant={"secondary"}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> */}

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold mb-4 max-w-full"
                        >
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />{" "}
                            <span className=" text-xl w-64 truncate">
                                Laravel Shadcn
                            </span>
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        {navigations.map(
                            (nav) =>
                                nav.show && (
                                    <Link
                                        key={nav.label}
                                        href={route(nav.route)}
                                        className={cn(
                                            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                            route().current(nav.route) &&
                                                "bg-muted text-foreground"
                                        )}
                                    >
                                        {nav.icon}
                                        {nav.label}
                                    </Link>
                                )
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
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
