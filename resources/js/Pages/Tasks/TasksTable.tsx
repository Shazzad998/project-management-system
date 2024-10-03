import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { DataTable } from "@/Components/ui/data-table";
import { taskPriorities, taskStatuses } from "@/data";
import { TaskColumns } from "./TaskColumns";
import { router } from "@inertiajs/react";
import { ProjectOption, Task } from "@/types";
import DeleteConfirm from "@/Components/DeleteConfirm";

type TasksTableProps = {
    tasks: Task[];
    hideProjectColumn?: boolean;
    setTask:(task:Task) => void;
    projectOptions:ProjectOption[]
};

const TasksTable = ({ tasks, hideProjectColumn = false, setTask, projectOptions }: TasksTableProps) => {
    const ProjectOptions = projectOptions.map((project) => ({
        label: project.id,
        value: project.id,
    }));
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const deleteItem = () => {
        if (deleteId) {
            router.delete(route("tasks.destroy", deleteId), {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setDeleteId(null);
                },
            });
        }
    };
    return (
        <>
            <DeleteConfirm
                open={deleteDialogOpen}
                opOpenChange={setDeleteDialogOpen}
                onConfirm={deleteItem}
            />

            <DataTable
                data={tasks}
                columns={TaskColumns(confirmDelete, hideProjectColumn, setTask)}
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
                    {
                        title: "Project",
                        value: "project_id",
                        options: ProjectOptions,
                    },
                ]}
                searchableColumns={["name"]}
            />
        </>
    );
};

export default TasksTable;
