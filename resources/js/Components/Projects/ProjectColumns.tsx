// src/Components/Projects/ProjectColumns.tsx
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
import { Project } from "@/types";
import ProjectStatusBadge from "./ProjectStatusBadge";
import { DataTableColumnHeader } from "../ui/data-table-column-header";

// Pass confirmDelete and other required props
export const ProjectColumns = (
    confirmDelete: (id: number) => void
): ColumnDef<Project>[] => {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
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
                <DataTableColumnHeader column={column} title="Status" className=" justify-center" />
              ),
            cell: ({ row }) => {
                return (
                    <div className="text-center">
                        <ProjectStatusBadge status={row.getValue("status")} />
                    </div>
                );
            },
            filterFn: (row, id, value) => {
                console.log(row, id, value)
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: "created_at",
            header: "Created at",
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
                            <DropdownMenuItem><span className=" flex items-center gap-1"> <Edit className="w-4 h-4"/> Edit</span></DropdownMenuItem>
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
