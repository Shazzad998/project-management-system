import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { User } from "@/types";
import { DataTableColumnHeader } from "../../Components/ui/data-table-column-header";
import { Link } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";

export const UserColumns = (
    confirmDelete: (id: number) => void,
    setUser: (item: User) => void
): ColumnDef<User>[] => {
    return [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && "indeterminate")
        //             }
        //             onCheckedChange={(value) =>
        //                 table.toggleAllPageRowsSelected(!!value)
        //             }
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Id"
                    className="pl-2"
                />
            ),
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="text-left font-semibold px-3">
                        <Link href={route("users.show", user.id)}>
                            {user.id}
                        </Link>
                    </div>
                );
            },
        },
        {
            accessorKey: "image_path",
            header: "Image",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div>
                        {user.image_path ? (
                            <img
                                className=" w-10 h-10 rounded-xl object-cover"
                                src={user.image_path}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <Link
                        href={route("users.show", user.id)}
                        className="text-left font-semibold ease-in-out duration-200 hover:underline"
                    >
                        {user.name}
                    </Link>
                );
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Email"
                    className=" justify-center"
                />
            ),
            cell: ({ row }) => {
                return (
                    <div className="text-center text-nowrap">
                        <a href={`mailto:${row.getValue("email")}`}>
                            {row.getValue("email")}
                        </a>
                    </div>
                );
            },
        },
        {
            accessorKey: "email_verified_at",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Verified"
                    className=" justify-center"
                />
            ),
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        {row.getValue("email_verified_at") ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Yes
                            </Badge>
                        ) : (
                            <Badge variant={"destructive"}>No</Badge>
                        )}
                    </div>
                );
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id) ? "Yes" : "No");
            },
        },
        {
            accessorKey: "roles",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Role"
                    className=" justify-center"
                />
            ),
            cell: ({ row }) => {
                let roles = row.original.roles;
                return (
                    <div className=" text-center">
                        {roles?.map((role: string) => (
                            <Badge>{role}</Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created at" />
            ),
        },

        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setUser(user ?? null)}
                            >
                                <span className=" flex items-center gap-1">
                                    {" "}
                                    <Edit className="w-4 h-4" /> Edit
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => confirmDelete(user.id)}
                            >
                                <span className=" flex items-center gap-1">
                                    <Trash className=" w-4 h-4" /> Delete
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
};
