
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
import { Task, User } from "@/types";
import { DataTableColumnHeader } from "../../Components/ui/data-table-column-header";
import StatusBadge from "../../Components/StatusBadge";
import PriorityBadge from "@/Components/PriorityBadge";

export const TaskColumns = (
    confirmDelete: (id: number) => void,
    hideProjectColumn = false
): ColumnDef<Task>[] => {
    const columns: ColumnDef<Task>[] = [
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
                <DataTableColumnHeader column={column} title="ID" className="pl-2" />
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
                console.log(row, id, value);
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: "assigned_user",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Assigned to"
                />
            ),
            cell: ({ row }) => {
                const assigned_user = row.getValue("assigned_user") as User | null
                return (
                    <div className="text-start font-bold">
                        {assigned_user?.name}
                    </div>
                );
            },
        },
        {
            accessorKey: "priority",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Priority"
                    className="justify-center"
                />
            ),
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        <PriorityBadge priority={row.getValue("priority")} />
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
                <DataTableColumnHeader
                    column={column}
                    title="Created at"
                />
            ),
        },
        {
            accessorKey: "due_date",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Due Date"
                />
            ),
        },
        {
            accessorKey: "created_by",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Created by"
                />
            ),
            cell: ({ row }) => {
                const created_by = row.getValue("created_by") as User
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
                const task = row.original;
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
                                <span className=" flex items-center gap-1">
                                    {" "}
                                    <Edit className="w-4 h-4" /> Edit
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => confirmDelete(task.id)}
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
    if (!hideProjectColumn) {
        columns.splice(2, 0, {
            accessorKey: "project",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Project" />
            ),
            cell: ({ row }) => {
                const project = row.original;
                return (
                    <div className="text-left font-semibold">
                        {project.name}
                    </div>
                );
            },
        });
    }

    return columns

};
