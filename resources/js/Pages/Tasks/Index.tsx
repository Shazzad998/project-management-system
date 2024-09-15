import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProjectResource, TaskResource, User } from "@/types";
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
import { taskPriorities, taskStatuses } from "@/data";
import { TaskColumns } from "./TaskColumns";

type Props = {
    auth: {
        user: User;
    };
    tasks: TaskResource;
};

const Index = ({ auth, tasks }: Props) => {
    let deleteId = 0;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]) 

    const confirmDelete = (id: number) => {
        deleteId=id;
        setDeleteDialogOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tasks" />
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
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>List of all the tasks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={tasks.data}
                        columns={TaskColumns(confirmDelete)}
                        filters={[
                            {
                                title:"Status",
                                value:"status",
                                options:taskStatuses
                            },
                            {
                                title:"Priority",
                                value:"priority",
                                options:taskPriorities
                            }
                        ]}
                        search={{column:'name', placeholder:'Filter tasks..'}}
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
