import { Button } from "@/Components/ui/button";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Project } from "@/types";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { DataTable } from "@/Components/ui/data-table";
import { ProjectColumns } from "@/Pages/Projects/ProjectColumns";
import { projectStatus } from "@/data";
import DeleteConfirm from "@/Components/DeleteConfirm";

type ProjectsTableProps = {
    projects: Project[];
    setProject: (item: Project) => void;
};

const ProjectsTable = ({ projects, setProject }: ProjectsTableProps) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const deleteItem = () => {
        if (deleteId) {
            router.delete(route("projects.destroy", deleteId), {
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
                data={projects}
                columns={ProjectColumns(confirmDelete, setProject)}
                filters={[
                    {
                        title: "Status",
                        value: "status",
                        options: projectStatus,
                    },
                ]}
                search={{ column: "name", placeholder: "Filter projects" }}
            />
        </>
    );
};

export default ProjectsTable;
