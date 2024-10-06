import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet";
import { Button } from "../../../Components/ui/button";
import { Errors, Project, SelectOption } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import InputError from "../../../Components/InputError";
import { DatePicker } from "../../../Components/DatePicker";
import { formatDate } from "@/lib/utils";
import { SelectInput } from "../../../Components/SelectInput";
import { projectStatus } from "@/data";
import { Textarea } from "../../../Components/ui/textarea";
import { router } from "@inertiajs/react";
import { MultiSelect } from "@/Components/MultiSelect";

type Props = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    project: Project | null;
    userOptions: SelectOption[];
};

const ProjectForm = ({ open, onOpenChange, project, userOptions }: Props) => {
    const [status, setStatus] = useState<SelectOption | null | undefined>();
    const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);
    const [date, setDate] = useState<Date | undefined>();
    const [errors, setErrors] = useState<Errors>({});

    const [data, _setData] = useState({
        name: "",
        description: "",
        status: "",
        due_date: "",
        user_ids:[]
    });

    const setData = (key: string, value: string|number[]) => {
        _setData((values) => ({
            ...values,
            [key]: value,
        }));
    };

    useEffect(() => {
        console.log('setting user ids')
        setData('user_ids',selectedUsers.map(item => Number(item.value)))
    }, [selectedUsers])

    useEffect(() => {
        setData("name", project?.name ?? "");
        setData("status", project?.status ?? "");
        setStatus(
            project
                ? projectStatus.find((item) => item.value == project.status)
                : null
        );
        setData("description", project?.description ?? "");
        setData("due_date", project?.due_date ?? "");
        setDate(
            project && project.due_date ? new Date(project.due_date) : undefined
        );
        setData("user_ids", project?.user_ids ?? []);
        setSelectedUsers(project
            ? userOptions.filter((item) => project.user_ids.includes(Number(item.value)))
            : [])
    }, [project]);

    const reset = () => {
        _setData({
            name: "",
            description: "",
            status: "",
            due_date: "",
            user_ids:[]
        });
        setStatus(null);
        setDate(undefined);
        setErrors({});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (project) {
            router.patch(route("projects.update", project.id), data, {
                onSuccess: () => {
                    closeSheet();
                    reset();
                },
                onError: (errors) => {
                    setErrors(errors as Errors);
                },
            });
        } else {
            router.post(route("projects.store"), data, {
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
                    <SheetTitle>Create Project</SheetTitle>
                </SheetHeader>
                <form
                    onSubmit={handleSubmit}
                    className=" grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
                >
                    <div className="felx flex-column gap-2">
                        <Label htmlFor="name">Project Name</Label>

                        <div>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Name of the project"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                    </div>
                    <div className="felx flex-column gap-2">
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

                    <div className="felx flex-column gap-2">
                        <Label htmlFor="name">Project Status</Label>
                        <div>
                            <SelectInput
                                className="w-full"
                                options={projectStatus}
                                selectedValue={status}
                                setSelectedValue={(value) => {
                                    setStatus(value);
                                    setData("status", value?.value ?? "");
                                }}
                                placeholder="Project status"
                            />
                            <InputError message={errors.status} />
                        </div>
                    </div>

                    <div className="felx flex-column gap-2 md:col-span-3">
                        <Label htmlFor="name">Users</Label>
                        <div>
                            <MultiSelect
                                options={userOptions}
                                selected={selectedUsers}
                                setSelected={setSelectedUsers}
                                placeholder="Select users"
                            />
                            <InputError message={errors.user_ids} />
                        </div>
                    </div>

                    <div className="grid md:col-span-3 gap-2">
                        <Label htmlFor="description">Project Description</Label>

                        <div>
                            <Textarea
                                id="description"
                                placeholder="Short description about the project"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>

                    <div className=" flex items-center justify-end gap-2 md:col-span-3">
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

export default ProjectForm;
