import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProjectResource, User } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
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
import { ProjectColumns } from "@/Components/projects/ProjectColumns";
import { projectStatus } from "@/data";

type Props = {
    auth: {
        user: User;
    };
    projects: ProjectResource;
};

const Index = ({ auth, projects }: Props) => {
    let deleteId = 0;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]) 

    const confirmDelete = (id: number) => {
        deleteId=id;
        setDeleteDialogOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Projects" />
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
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>List of all the projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={projects.data}
                        columns={ProjectColumns(confirmDelete)}
                        filters={[
                            {
                                title:"Status",
                                value:"status",
                                options:projectStatus
                            }
                        ]}
                        search={{column:'name', placeholder:'Filter projects'}}
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
