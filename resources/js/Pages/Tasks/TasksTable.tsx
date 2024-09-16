import { Button } from "@/Components/ui/button";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { DataTable } from "@/Components/ui/data-table";
import { taskPriorities, taskStatuses } from "@/data";
import { TaskColumns } from "./TaskColumns";
import { Link } from "@inertiajs/react";
import { Task } from "@/types";

type TasksTableProps = {
    tasks: Task[];
    hideProjectColumn?:boolean
};

const TasksTable = ({ tasks, hideProjectColumn = false }: TasksTableProps) => {
    let deleteId = 0;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const confirmDelete = (id: number) => {
        deleteId = id;
        setDeleteDialogOpen(true);
    };
    return (
        <>
            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action can not be undone after completed.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-x-2">
                        <Button variant={"destructive"} asChild>
                            <Link
                                href={route("tasks.destroy", deleteId)}
                                method="delete"
                                as="button"
                            >
                                Delete
                            </Link>
                        </Button>
                        <DialogClose asChild>
                            <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>

            <DataTable
                data={tasks}
                columns={TaskColumns(confirmDelete, hideProjectColumn)}
                filters={[
                    {
                        title: "Status",
                        value: "status",
                        options: taskStatuses,
                    },
                    {
                        title: "Priority",
                        value: "priority",
                        options: taskPriorities,
                    },
                ]}
                search={{ column: "name", placeholder: "Filter tasks.." }}
            />
        </>
    );
};

export default TasksTable;
