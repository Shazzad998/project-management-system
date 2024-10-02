import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProjectOption, Task, User, UserOption } from "@/types";
import { Card, CardContent } from "@/Components/ui/card";
import TasksTable from "./TasksTable";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { can } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import TaskForm from "./Modals/TaskForm";

type Props = {
    auth: {
        user: User;
    };
    tasks: Task[];
    session: {
        success?: string;
        error?: string;
    };
    projects: ProjectOption[];
    users: UserOption[];
};

const Index = ({ auth, tasks, projects, users, session }: Props) => {
    const { toast } = useToast();
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [task, setTask] = useState<Task | null>(null);

    const closeForm = () => {
        setFormOpen(false);
        setTask(null);
    };
    useEffect(() => {
        if (session.success) {
            toast({
                title: "Success!",
                description: session.success,
                variant: "success",
            });
        }
        if (session.error) {
            toast({
                title: "Error!",
                description: session.error,
                variant: "destructive",
            });
        }
    }, [session]);

    const openEdit = (task: Task | null) => {
        setTask(task);
        setFormOpen(true);
    };
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
                {can("task-create", auth.user) && (
                    <Button onClick={() => setFormOpen(true)}>
                        <PlusIcon className="w-4 h-4" /> Create Task
                    </Button>
                )}

                <TaskForm
                    open={formOpen}
                    onOpenChange={closeForm}
                    task={task}
                    projects={projects}
                    users={users}
                />
            </div>
            <Card>
                <CardContent className="pt-6">
                    <TasksTable tasks={tasks} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
