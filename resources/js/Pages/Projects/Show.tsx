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
import {
    Project,
    TaskResource,
    User,
    UserResource,
    UserSingleResource,
} from "@/types";
import { Head, Link } from "@inertiajs/react";
import BarChartRadial from "@/Components/BarChartRadial";
import { Label } from "@/Components/ui/label";
import StatusBadge from "@/Components/StatusBadge";
import TasksTable from "../Tasks/TasksTable";

type Props = {
    auth: {
        user: UserSingleResource;
    };
    project: Project;
    tasks: TaskResource;
    members: UserResource;
};

const Show = ({ auth, project, tasks, members }: Props) => {
    const totalTasks = tasks.data.length;
    const totalColpleted = tasks.data.filter(
        (item) => item.status == "completed"
    );
    const high = tasks.data.filter((item) => item.priority == "high");
    const medium = tasks.data.filter((item) => item.priority == "medium");
    const low = tasks.data.filter((item) => item.priority == "low");

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
            value: tasks.data.filter((item) => item.status == "in_progress")
                .length,
            total: totalTasks,
            color: "hsl(var(--primary))",
            type: "in_progress",
        },
        {
            label: "Pending",
            value: tasks.data.filter((item) => item.status == "pending").length,
            total: totalTasks,
            color: "#d97706",
            type: "pending",
        },
        {
            label: "Completed",
            value: tasks.data.filter((item) => item.status == "completed")
                .length,
            total: totalTasks,
            color: "#065f46",
            type: "completed",
        },
    ];
    return (
        <AuthenticatedLayout user={auth.user.data}>
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
                            <TabsTrigger value="members" disabled>
                                Members
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Project Progress
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <rect
                                                width="20"
                                                height="14"
                                                x="2"
                                                y="5"
                                                rx="2"
                                            />
                                            <path d="M2 10h20" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            10
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
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
                        </TabsContent>
                        <TabsContent value="tasks">
                            <Card>
                                <CardContent className=" pt-4">
                                    <TasksTable
                                        hideProjectColumn={true}
                                        tasks={tasks.data}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
