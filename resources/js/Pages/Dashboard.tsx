import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, Project, Task, User } from "@/types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { FolderKanban, ListTodo, UserIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import StatusBadge from "@/Components/StatusBadge";
import PriorityBadge from "@/Components/PriorityBadge";
import { Separator } from "@/Components/ui/separator";

type DashboardProps = {
    auth: {
        user: User;
    };
    totalProjectCount: number;
    pendingProjects: Project[];
    pendingProjectCount: number;
    overdueProjects: Project[];
    overdueProjectCount: number;
    totalTaskCount: number;
    pendingTasks: Task[];
    pendingTaskCount: number;
    overdueTasks: Task[];
    overdueTaskCount: number;
};

export default function Dashboard({
    auth,
    totalProjectCount,
    pendingProjects,
    pendingProjectCount,
    overdueProjects,
    overdueProjectCount,
    totalTaskCount,
    pendingTasks,
    pendingTaskCount,
    overdueTasks,
    overdueTaskCount,
}: DashboardProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <h2 className="font-bold text-xl">Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <Card className=" md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            User Information
                        </CardTitle>
                        <UserIcon className=" w-6 h-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {auth.user.name}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {auth.user.email}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Tasks
                        </CardTitle>
                        <ListTodo className=" w-6 h-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div className="text-2xl font-bold">
                                {totalTaskCount}
                            </div>
                            <Separator className="my-2" />
                            <div className="flex h-5 items-center space-x-4 text-sm text-muted-foreground">
                                <div className=" flex gap-1 items-center font-semibold  text-warning">
                                    <span className=" text-base">
                                        {pendingTaskCount}
                                    </span>
                                    Pending
                                </div>
                                <Separator orientation="vertical" />
                                <div className=" flex gap-1 items-center text-destructive font-semibold">
                                    <span className="  text-base ">
                                        {overdueTaskCount}
                                    </span>
                                    Overdue
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Projects
                        </CardTitle>
                        <FolderKanban className=" w-6 h-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div className="text-2xl font-bold">
                                {totalProjectCount}
                            </div>
                            <Separator className="my-2" />
                            <div className="flex h-5 items-center space-x-4 text-sm text-muted-foreground">
                                <div className=" flex gap-1 items-center font-semibold  text-warning">
                                    <span className=" text-base">
                                        {pendingProjectCount}
                                    </span>
                                    Pending
                                </div>
                                <Separator orientation="vertical" />
                                <div className=" flex gap-1 items-center text-destructive font-semibold">
                                    <span className="  text-base ">
                                        {overdueProjectCount}
                                    </span>
                                    Overdue
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className=" grid gap-4 grid-cols-1 lg:grid-cols-5">
                <div className=" flex flex-col gap-4 lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>PendingTasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table >
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Project</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Due Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingTasks.map((pendingTask) => (
                                        <TableRow key={pendingTask.id}>
                                            <TableCell>
                                                {pendingTask.id}
                                            </TableCell>
                                            <TableCell>
                                                {pendingTask.name}
                                            </TableCell>
                                            <TableCell>
                                                {pendingTask.project.name}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge
                                                    status={
                                                        pendingTask.status
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <PriorityBadge
                                                    priority={
                                                        pendingTask.priority
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell className=" text-nowrap">
                                                {pendingTask.due_date}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {!pendingTasks.length && (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                No data found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Overdue Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Project</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Due Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {overdueTasks.map((overdueTask) => (
                                            <TableRow key={overdueTask.id}>
                                                <TableCell>
                                                    {overdueTask.id}
                                                </TableCell>
                                                <TableCell>
                                                    {overdueTask.name}
                                                </TableCell>
                                                <TableCell>
                                                    {overdueTask.project.name}
                                                </TableCell>
                                                <TableCell>
                                                    <StatusBadge status="overdue" />
                                                </TableCell>
                                                <TableCell>
                                                    <PriorityBadge
                                                        priority={
                                                            overdueTask.priority
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell className=" text-nowrap">
                                                    {overdueTask.due_date}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {!overdueTasks.length && (
                                            <TableRow>
                                                <TableCell colSpan={6}>
                                                    No data found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className=" flex flex-col gap-4 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Due Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pendingProjects.map(
                                            (pendingProject) => (
                                                <TableRow
                                                    key={pendingProject.id}
                                                >
                                                    <TableCell>
                                                        {pendingProject.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {pendingProject.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <StatusBadge
                                                            status={
                                                                pendingProject.status
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className=" text-nowrap">
                                                        {
                                                            pendingProject.due_date
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                        {!pendingProjects.length && (
                                            <TableRow>
                                                <TableCell colSpan={4}>
                                                    No data found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Overdue Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Due Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {overdueProjects.map(
                                            (overdueProject) => (
                                                <TableRow
                                                    key={overdueProject.id}
                                                >
                                                    <TableCell>
                                                        {overdueProject.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {overdueProject.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <StatusBadge status="overdue" />
                                                    </TableCell>
                                                    <TableCell className=" text-nowrap">
                                                        {
                                                            overdueProject.due_date
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                        {!overdueProjects.length && (
                                            <TableRow>
                                                <TableCell colSpan={4}>
                                                    No data found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
