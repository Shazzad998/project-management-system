import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {  ProjectResource, User } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {  MoreHorizontal } from "lucide-react";
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
import Pagination from "@/Components/Pagination";
import ProjectStatusBadge from "@/Components/Projects/ProjectStatusBadge";
import Filters from "@/Components/Projects/Filters";


type Props = {
    auth: {
        user: User;
    };
    projects: ProjectResource;
    queryParams : {
        status?:string[]
    }
};

const Index = ({ auth, projects, queryParams }: Props) => {
    const [selectedId, setSelectedId] = useState<number>(0);

    const confirmDelete = (id: number) => {
        setSelectedId(id);
        setDeleteDialogOpen(true);
    };
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
                    <div className=" flex justify-end gap-x-2">
                        <Button variant={"destructive"} asChild>
                            <Link
                                href={route("projects.destroy", selectedId)}
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
                    <Filters queryParam={queryParams}/>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {/* <TableHead> &nbsp;</TableHead> */}
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Created by</TableHead>
                                <TableHead>&nbsp;</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.data.map((project) => (
                                <TableRow key={project.id}>
                                    {/* <TableCell>
                                        <img
                                            src={project.image_path}
                                            alt={project.name}
                                            className=" w-16 h-16 object-cover rounded"
                                        />
                                    </TableCell> */}
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>
                                        {project.status && (
                                            <ProjectStatusBadge
                                                status={project.status}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{project.created_at}</TableCell>
                                    <TableCell>{project.due_date}</TableCell>
                                    <TableCell>
                                        {project.created_by.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Toggle menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "projects.edit",
                                                            project.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        confirmDelete(
                                                            project.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Pagination
                        links={projects.meta.links}
                        from={projects.meta.from}
                        to={projects.meta.to}
                        total={projects.meta.total}
                    />
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
