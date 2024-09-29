import { ColumnDef } from "@tanstack/react-table";
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
import { Permission, Role } from "@/types";
import { DataTableColumnHeader } from "../../Components/ui/data-table-column-header";
import { Badge } from "@/Components/ui/badge";
import { Link } from "@inertiajs/react";

export const RoleColumns = (
    confirmDelete: (id: number) => void
): ColumnDef<Role>[] => {
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
        // {
        //     accessorKey: "image_path",
        //     header: "Image",
        //     cell: ({ row }) => {
        //         return (
        //             <img
        //                 className=" w-12 h-12 rounded-lg object-cover"
        //                 src={row.getValue("image_path")}
        //                 alt={row.getValue("name")}
        //             />
        //         );
        //     },
        // },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="ID"
                    className="pl-2"
                />
            ),
            cell: ({ row }) => {
                return (
                    <div className="text-left font-semibold px-3">
                        {row.getValue("id")}
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
                return (
                    <div className="text-left font-semibold">
                        {row.getValue("name")}
                    </div>
                );
            },
        },
        {
            accessorKey: "permissions",
            header: "Permissions",
            cell: ({ row }) => {
                const permissions = row.original.permissions as Permission[];
                return (
                    <div className="flex flex-wrap gap-2">
                        {permissions.map((permission) => (
                            <Badge variant={"secondary"} key={permission.id}>
                                {permission.name}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },

        {
            id: "actions",
            cell: ({ row }) => {
                const role = row.original;
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
                            <DropdownMenuItem>
                                <Link
                                    href={route("roles.edit", role.id)}
                                    className=" flex items-center gap-1"
                                >
                                    {" "}
                                    <Edit className="w-4 h-4" /> Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => confirmDelete(role.id)}
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
