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
import { Project, User } from "@/types";
import { DataTableColumnHeader } from "../../Components/ui/data-table-column-header";
import StatusBadge from "../../Components/StatusBadge";
import { Link } from "@inertiajs/react";

export const ProjectColumns = (
    confirmDelete: (id: number) => void,
    setProject: (item: Project) => void
): ColumnDef<Project>[] => {
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
                const project = row.original;
                return (
                    <div className="text-left font-semibold px-3">
                        <Link href={route("projects.show", project.id)}>
                            {project.id}
                        </Link>
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
                const project = row.original;
                return (
                    <Link
                        href={route("projects.show", project.id)}
                        className="text-left font-semibold ease-in-out duration-200 hover:underline"
                    >
                        {project.name}
                    </Link>
                );
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Status"
                    className=" justify-center"
                />
            ),
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        <StatusBadge status={row.getValue("status")} />
                    </div>
                );
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created at" />
            ),
        },
        {
            accessorKey: "due_date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Due Date" />
            ),
        },
        {
            accessorKey: "created_by",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created by" />
            ),
            cell: ({ row }) => {
                const created_by = row.getValue("created_by") as User;
                return (
                    <div className="text-start font-bold">
                        {created_by.name}
                    </div>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const project = row.original;
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
                                onClick={() => setProject(project ?? null)}
                            >
                                <span className=" flex items-center gap-1">
                                    {" "}
                                    <Edit className="w-4 h-4" /> Edit
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => confirmDelete(project.id)}
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
