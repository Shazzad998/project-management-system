import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "../ui/button";
import { Project, SelectOption } from "@/types";
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../InputError";
import { DatePicker } from "../DatePicker";
import { formatDate } from "@/lib/utils";
import { SelectInput } from "../SelectInput";
import { projectStatus } from "@/data";
import { Textarea } from "../ui/textarea";
import { router, useForm } from "@inertiajs/react";

type Props = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    project: Project | null;
};

const ProjectForm = ({ open, onOpenChange, project }: Props) => {
    const [status, setStatus] = useState<SelectOption | null | undefined>(
        project
            ? projectStatus.find((item) => item.value == project.status)
            : null
    );
    const [date, setDate] = useState<Date | undefined>(
        project && project.due_date ? new Date(project.due_date) : undefined
      );

    const { data, setData, post, errors, reset } = useForm({
        name: project?.name ?? "",
        status: status?.value ?? "",
        description: project?.description ?? "",
        due_date: project?.due_date ?? "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // This stops the page from refreshing
        console.log(data);
        router.post("/projectStore", data, {
            onSuccess: () => {
                closeSheet();
                reset(); // Reset the form on success
            },
            onError: () => {
                console.log(errors); // Handle errors
            },
        });
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
                    className=" grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div className="grid gap-2">
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

                    <div className="grid gap-2">
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

                    <div className="grid md:col-span-2 gap-2">
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

export default ProjectForm;
