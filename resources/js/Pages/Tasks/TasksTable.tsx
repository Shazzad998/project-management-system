import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { DataTable } from "@/Components/ui/data-table";
import { taskPriorities, taskStatuses } from "@/data";
import { TaskColumns } from "./TaskColumns";
import { router } from "@inertiajs/react";
import { ProjectOption, Task } from "@/types";
import DeleteConfirm from "@/Components/DeleteConfirm";
import TaskDetails from "./Modals/TaskDetails";

type TasksTableProps = {
    tasks: Task[];
    hideProjectColumn?: boolean;
    setTask: (task: Task) => void;
    projectOptions?: ProjectOption[];
};

const TasksTable = ({
    tasks,
    hideProjectColumn = false,
    setTask,
    projectOptions,
}: TasksTableProps) => {
    const tableFilters = [
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
    ];
    if (!hideProjectColumn) {
        const ProjectOptions = projectOptions?.map((project) => ({
            label: project.name,
            value: project.id,
        }));
        if (ProjectOptions?.length) {
            tableFilters.push({
                title: "Project",
                value: "project",
                options: ProjectOptions,
            });
        }
    }
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

    const [taskDetail, setTaskDetail] = useState<Task|null>(null);
    const [taskDetailOpen, setTaskDetailOpen] = useState(false);

    const openEdit = (task: Task | null) => {
        setTaskDetail(task);
        setTaskDetailOpen(true);
    };

    return (
        <>
            <DeleteConfirm
                open={deleteDialogOpen}
                opOpenChange={setDeleteDialogOpen}
                onConfirm={deleteItem}
            />

            <TaskDetails task={taskDetail} open={taskDetailOpen} opOpenChange={setTaskDetailOpen}/>

            <DataTable
                data={tasks}
                columns={TaskColumns(confirmDelete, hideProjectColumn, setTask, openEdit)}
                filters={tableFilters}
                searchableColumns={["name"]}
            />
        </>
    );
};

export default TasksTable;
