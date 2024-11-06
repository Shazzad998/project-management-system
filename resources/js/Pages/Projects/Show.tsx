import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Project, ProjectOption, Task, User, UserOption } from "@/types";
import { Head, Link } from "@inertiajs/react";
import BarChartRadial from "@/Components/BarChartRadial";
import { Label } from "@/Components/ui/label";
import StatusBadge from "@/Components/StatusBadge";
import TasksTable from "../Tasks/TasksTable";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TaskForm from "../Tasks/Modals/TaskForm";
import { Activity, CalendarX2, ListChecks, UsersIcon } from "lucide-react";
import UsersTable from "../Users/UsersTable";
import UserForm from "../Users/Modals/UserForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import PriorityBadge from "@/Components/PriorityBadge";

type Props = {
    auth: {
        user: User;
    };
    project: Project;
    tasks: Task[];
    members: User[];
    session: {
        success?: string;
        error?: string;
    };
    projects: ProjectOption[];
    users: UserOption[];
    roles: string[];
    pendingTasks: Task[];
    overdueTasks: Task[];
};

const Show = ({
    auth,
    project,
    tasks,
    members,
    projects,
    users,
    roles,
    session,
    pendingTasks,
    overdueTasks,
}: Props) => {
    const totalTasks = tasks.length;
    const totalColpleted = tasks.filter(
        (item: Task) => item.status == "completed"
    );
    const high = tasks.filter((item: Task) => item.priority == "high");
    const medium = tasks.filter((item: Task) => item.priority == "medium");
    const low = tasks.filter((item: Task) => item.priority == "low");

    const priorityTaskData = [
        {
            label: "Low",
            value: low.length,
            total: totalTasks,
            color: "#ca8a04",
            type: "low",
        },
        {
            label: "Medium",
            value: medium.length,
            total: totalTasks,
            color: "#c2410c",
            type: "medium",
        },
        {
            label: "High",
            value: high.length,
            total: totalTasks,
            color: "#991b1b",
            type: "high",
        },
    ];

    const statusTastData = [
        {
            label: "In Progress",
            value: tasks.filter((item) => item.status == "in_progress").length,
            total: totalTasks,
            color: "hsl(var(--primary))",
            type: "in_progress",
        },
        {
            label: "Pending",
            value: tasks.filter((item) => item.status == "pending").length,
            total: totalTasks,
            color: "#d97706",
            type: "pending",
        },
        {
            label: "Completed",
            value: tasks.filter((item) => item.status == "completed").length,
            total: totalTasks,
            color: "#065f46",
            type: "completed",
        },
    ];

    const { toast } = useToast();
    const [tastFormOpen, setTaskFormOpen] = useState<boolean>(false);
    const [task, setTask] = useState<Task | null>(null);
    const [memberFormOpen, setMemberFormOpen] = useState<boolean>(false);
    const [member, setMember] = useState<User | null>(null);

    const closeTaskForm = () => {
        setTaskFormOpen(false);
        setTask(null);
    };
    const closeMemberForm = () => {
        setMemberFormOpen(false);
        setMember(null);
    };
    const openTaskEdit = (task: Task | null) => {
        setTask(task);
        setTaskFormOpen(true);
    };
    const openMemberEdit = (user: User | null) => {
        setMember(user);
        setMemberFormOpen(true);
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.name} />
            <div className="grid ">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("projects.index")}>
                                    Projects
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{project.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-col ">
                <div className="flex-1 space-y-4 ">
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="tasks">Tasks</TabsTrigger>
                            <TabsTrigger value="members">Members</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Project Progress
                                        </CardTitle>
                                        <Activity className=" text-primary" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {totalTasks > 0
                                                ? Math.floor(
                                                      (totalColpleted.length /
                                                          totalTasks) *
                                                          100
                                                  )
                                                : 0}
                                            %
                                        </div>
                                        <div className=" min-w-24 max-w-40 w-full h-1 rounded-full overflow-hidden relative bg-muted mb-2">
                                            <div
                                                className="h-full bg-primary"
                                                style={{
                                                    width:
                                                        totalTasks > 0
                                                            ? Math.floor(
                                                                  (totalColpleted.length /
                                                                      totalTasks) *
                                                                      100
                                                              )
                                                            : 0 + "%",
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {totalColpleted.length} tasks
                                            completed from {totalTasks} tasks.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Completed Tasks
                                        </CardTitle>
                                        <ListChecks className=" text-success" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {totalColpleted.length}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            +7 since last hour
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Members
                                        </CardTitle>
                                        <UsersIcon className=" text-primary" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {members.length}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            3 recently added
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Overdue Tasks
                                        </CardTitle>
                                        <CalendarX2 className=" text-destructive" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            5
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            +4 will be in next 12 hour.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
                                <Card className="col-span-2 lg:col-span-4 2xl:col-span-3">
                                    <CardHeader>
                                        <CardTitle>Project Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className=" grid gap-2 mb-3">
                                            <p className="text-xl font-medium text-foreground/80">
                                                {"[" + project.id + "]"}{" "}
                                                {project.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className=" flex flex-wrap gap-6 justify-between items-center">
                                            <div>
                                                <Label>Created at</Label>
                                                <div className=" text-sm text-muted-foreground">
                                                    {project.created_at}
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Due date</Label>
                                                <div className=" text-sm text-muted-foreground">
                                                    {project.due_date}
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Status</Label>
                                                <div className=" text-sm text-muted-foreground">
                                                    <StatusBadge
                                                        status={project.status}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Created by</Label>
                                                <div className=" text-sm text-muted-foreground">
                                                    {project.created_by.name}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <BarChartRadial
                                    className=" col-span-2"
                                    cardTitle="Priority Based Tast Overview"
                                    data={priorityTaskData}
                                />
                                <BarChartRadial
                                    className=" col-span-2"
                                    cardTitle="Status Based Task Overview"
                                    data={statusTastData}
                                />
                            </div>
                            <div className=" flex flex-col gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>PendingTasks</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            ID
                                                        </TableHead>
                                                        <TableHead>
                                                            Name
                                                        </TableHead>
                                                        <TableHead>
                                                            Status
                                                        </TableHead>
                                                        <TableHead>
                                                            Priority
                                                        </TableHead>
                                                        <TableHead>
                                                            Due Date
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {pendingTasks.map(
                                                        (pendingTask) => (
                                                            <TableRow
                                                                key={
                                                                    pendingTask.id
                                                                }
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        pendingTask.id
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        pendingTask.name
                                                                    }
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
                                                                    {
                                                                        pendingTask.due_date
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                    {!pendingTasks.length && (
                                                        <TableRow>
                                                            <TableCell
                                                                colSpan={6}
                                                            >
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
                                        <CardTitle>Overdue Tasks</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            ID
                                                        </TableHead>
                                                        <TableHead>
                                                            Name
                                                        </TableHead>
                                                        <TableHead>
                                                            Status
                                                        </TableHead>
                                                        <TableHead>
                                                            Priority
                                                        </TableHead>
                                                        <TableHead>
                                                            Due Date
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {overdueTasks.map(
                                                        (overdueTask) => (
                                                            <TableRow
                                                                key={
                                                                    overdueTask.id
                                                                }
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        overdueTask.id
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        overdueTask.name
                                                                    }
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
                                                                    {
                                                                        overdueTask.due_date
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                    {!overdueTasks.length && (
                                                        <TableRow>
                                                            <TableCell
                                                                colSpan={6}
                                                            >
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
                        </TabsContent>
                        <TabsContent value="tasks">
                            <Card>
                                <CardContent className=" pt-4">
                                    <TasksTable
                                        hideProjectColumn={true}
                                        tasks={tasks}
                                        setTask={openTaskEdit}
                                    />
                                </CardContent>
                            </Card>
                            <TaskForm
                                open={tastFormOpen}
                                onOpenChange={closeTaskForm}
                                task={task}
                                projects={projects}
                                users={users}
                            />
                        </TabsContent>
                        <TabsContent value="members">
                            <Card>
                                <CardContent className=" pt-4">
                                    <UsersTable
                                        users={members}
                                        setUser={openMemberEdit}
                                    />
                                </CardContent>
                                <UserForm
                                    open={memberFormOpen}
                                    roles={roles}
                                    onOpenChange={closeMemberForm}
                                    user={member}
                                />
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
