import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet";
import { Button } from "../../../Components/ui/button";
import {
    Errors,
    ProjectOption,
    SelectOption,
    Task,
    User,
    UserOption,
} from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import InputError from "../../../Components/InputError";
import { router } from "@inertiajs/react";
import { SelectInput } from "@/Components/SelectInput";
import { Textarea } from "@/Components/ui/textarea";
import { DatePicker } from "@/Components/DatePicker";
import { formatDate } from "@/lib/utils";
import { taskPriorities, taskStatuses } from "@/data";

type TaskFormProps = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    projects: ProjectOption[];
    users: UserOption[];
    task: Task | null;
};

const TaskForm = ({
    open,
    onOpenChange,
    users,
    projects,
    task,
}: TaskFormProps) => {
    const ProjectOptions = projects.map((project) => ({
        label: project.name,
        value: project.id,
    }));
    const UserOptions = users.map((user) => ({
        label: user.name,
        value: user.id,
    }));
    const [errors, setErrors] = useState<Errors>({});
    const [project, setProject] = useState<SelectOption | null | undefined>();
    const [user, setUser] = useState<SelectOption | null | undefined>();
    const [status, setStatus] = useState<SelectOption | null | undefined>();
    const [priority, setPriority] = useState<SelectOption | null | undefined>();
    const [date, setDate] = useState<Date | undefined>();

    const [data, _setData] = useState<{
        name: string;
        description: string;
        status: string;
        priority: string;
        due_date: string;
        project_id: number | null;
        assigned_user_id: number | null;
        _method?: string;
    }>({
        name: "",
        description: "",
        status: "",
        priority: "",
        due_date: "",
        project_id: null,
        assigned_user_id: null,
    });

    const setData = (key: string, value: string | File | null) => {
        _setData((values) => ({
            ...values,
            [key]: value,
        }));
    };

    useEffect(() => {
        setData("name", task?.name ?? "");
        setData("description", task?.description ?? "");
        setData("status", task?.status ?? "");
        setData("priority", task?.priority ?? "");
        setData("due_date", task?.due_date ?? "");
        setData("project_id", task?.project_id ?? "");
        setData("assigned_user_id", task?.assigned_user_id ?? "");
        setData("due_date", task?.due_date ?? "");
        setProject(
            task
                ? ProjectOptions.find((item) => item.value == task.project_id)
                : null
        );
        setUser(
            task
                ? UserOptions.find(
                      (item) => item.value == task.assigned_user_id
                  )
                : null
        );
        setStatus(
            task ? taskStatuses.find((item) => item.value == task.status) : null
        );
        setPriority(
            task
                ? taskPriorities.find((item) => item.value == task.priority)
                : null
        );
        setDate(task && task.due_date ? new Date(task.due_date) : undefined);
        if (task) {
            setData("_method", "PUT");
        }
    }, [task]);

    const reset = () => {
        _setData({
            name: "",
            description: "",
            status: "",
            priority: "",
            due_date: "",
            project_id: null,
            assigned_user_id: null,
        });
        setProject(null);
        setUser(null);
        setErrors({});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (task) {
            router.post(route("tasks.update", task.id), data, {
                onSuccess: () => {
                    closeSheet();
                    reset();
                },
                onError: (errors) => {
                    setErrors(errors as Errors);
                },
            });
        } else {
            router.post(route("tasks.store"), data, {
                onSuccess: () => {
                    closeSheet();
                    reset();
                },
                onError: (errors) => {
                    setErrors(errors as Errors);
                },
            });
        }
    };
    const closeSheet = () => {
        onOpenChange(false);
        reset();
    };

    return (
        <Sheet open={open} onOpenChange={closeSheet}>
            <SheetContent className=" w-full sm:max-w-4xl">
                <SheetHeader>
                    <SheetTitle>Create Task</SheetTitle>
                </SheetHeader>
                <form
                    onSubmit={handleSubmit}
                    className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>

                        <div>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Name of the user"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="project">Project</Label>
                            <SelectInput
                                className="w-full"
                                options={ProjectOptions}
                                selectedValue={project}
                                setSelectedValue={(value) => {
                                    setProject(value);
                                    setData("project_id", value?.value ?? "");
                                }}
                                placeholder="Choose Project"
                            />
                            <InputError message={errors.project_id} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="assigned_to">Assigned to</Label>
                        <div>
                            <SelectInput
                                className="w-full"
                                options={UserOptions}
                                selectedValue={user}
                                setSelectedValue={(value) => {
                                    setUser(value);
                                    setData(
                                        "assigned_user_id",
                                        value?.value ?? ""
                                    );
                                }}
                                placeholder="Select User"
                            />
                            <InputError message={errors.assigned_user_id} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="due_date">Due Date</Label>

                        <div>
                            <DatePicker
                                placeholder="Pick a date"
                                selected={date}
                                onSelect={(selectedDate) => {
                                    setDate(selectedDate);
                                    if (selectedDate) {
                                        setData(
                                            "due_date",
                                            selectedDate
                                                ? formatDate(selectedDate)
                                                : ""
                                        );
                                    }
                                }}
                                className="w-full"
                            />
                            <InputError message={errors.due_date} />
                        </div>
                    </div>
                    <div className="grid md:col-span-2 gap-2">
                        <Label htmlFor="description">Task Description</Label>
                        <div>
                            <Textarea
                                id="description"
                                placeholder="Short description about the task"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Task Status</Label>
                        <div>
                            <SelectInput
                                className="w-full"
                                options={taskStatuses}
                                selectedValue={status}
                                setSelectedValue={(value) => {
                                    setStatus(value);
                                    setData("status", value?.value ?? "");
                                }}
                                placeholder="Task status"
                            />
                            <InputError message={errors.status} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Task Priority</Label>
                        <div>
                            <SelectInput
                                className="w-full"
                                options={taskPriorities}
                                selectedValue={priority}
                                setSelectedValue={(value) => {
                                    setPriority(value);
                                    setData("priority", value?.value ?? "");
                                }}
                                placeholder="Task priority"
                            />
                            <InputError message={errors.priority} />
                        </div>
                    </div>
                    <div className=" flex items-center justify-end gap-2 md:col-span-2">
                        <SheetClose asChild>
                            <Button variant={"secondary"}>Cancel</Button>
                        </SheetClose>
                        <Button>Save</Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default TaskForm;
