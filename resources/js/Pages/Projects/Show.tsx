import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Project, TaskResource, User, UserResource } from "@/types";
import { Head, Link } from "@inertiajs/react";
import ChartShow from "./Chart";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer } from "@/Components/ui/chart";
import BarChartRadial from "@/Components/BarChartRadial";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { taskPriorities, taskStatuses } from "@/data";
import { DataTable } from "@/Components/ui/data-table";
import { TaskColumns } from "../Tasks/TaskColumns";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

type Props = {
    auth: {
        user: User;
    };
    project: Project;
    tasks: TaskResource;
    members: UserResource;
};

const Show = ({ auth, project, tasks, members }: Props) => {
    let deleteId = 0;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const confirmDelete = (id: number) => {
        deleteId = id;
        setDeleteDialogOpen(true);
    };
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
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.name} />
            <h2 className="text-3xl font-bold tracking-tight">
                Project "{project.name}"
            </h2>
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
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Project Members</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-8">
                                        {members.data.map((member) => (
                                            <div className="flex items-center gap-4">
                                                <Avatar className="hidden h-9 w-9 sm:flex">
                                                    <AvatarImage
                                                        src="/avatars/01.png"
                                                        alt="Avatar"
                                                    />
                                                    <AvatarFallback>
                                                        {getInitials(
                                                            member.name
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {member.email}
                                                    </p>
                                                </div>
                                                <div className="ml-auto font-medium">
                                                    <span className="px-3 text-sm py-1 bg-accent text-accent-foreground rounded-md">
                                                        Project Manager
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="tasks">
                            <Card>
                                <CardContent className=" pt-4">
                                    <Dialog
                                        open={deleteDialogOpen}
                                        onOpenChange={setDeleteDialogOpen}
                                    >
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Are you absolutely sure?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This action can not be
                                                    undone after completed.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex justify-end gap-x-2">
                                                <Button
                                                    variant={"destructive"}
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "projects.destroy",
                                                            deleteId
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                    >
                                                        Delete
                                                    </Link>
                                                </Button>
                                                <DialogClose asChild>
                                                    <Button
                                                        variant={"secondary"}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <DataTable
                                        data={tasks.data}
                                        columns={TaskColumns(confirmDelete)}
                                        filters={[
                                            {
                                                title: "Status",
                                                value: "status",
                                                options: taskStatuses,
                                            },
                                            {
                                                title: "Priority",
                                                value: "priority",
                                                options: taskPriorities,
                                            },
                                        ]}
                                        search={{
                                            column: "name",
                                            placeholder: "Filter tasks..",
                                        }}
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
