import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {TaskResource, User } from "@/types";
import {
    Card,
    CardContent
} from "@/Components/ui/card";
import TasksTable from "./TasksTable";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";


type Props = {
    auth: {
        user: User;
    };
    tasks: TaskResource;
};

const Index = ({ auth, tasks }: Props) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tasks" />
            <div className="flex items-end justify-between gap-2">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Tasks</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="mt-2 font-bold text-xl">Task List</h2>
                </div>
                <Button>
                    <Link
                        className=" flex items-center gap-1 "
                        href={route("tasks.create")}
                    >
                        {" "}
                        <PlusIcon className="w-4 h-4" /> Create Task
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <TasksTable tasks={tasks.data}/>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
