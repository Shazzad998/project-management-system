import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {TaskResource, User } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import TasksTable from "./TasksTable";


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
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>List of all the tasks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TasksTable tasks={tasks.data}/>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
