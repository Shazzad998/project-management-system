import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
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

type ProjectsTableProps = {
    projects: Project[];
};

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
    let deleteId = 0;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

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
                                href={route("projects.destroy", deleteId)}
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
                data={projects}
                columns={ProjectColumns(confirmDelete)}
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
