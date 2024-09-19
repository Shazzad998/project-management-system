import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SelectOption, User } from "@/types";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { List } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { SelectInput } from "@/Components/SelectInput";
import { FormEvent, useState } from "react";
import { projectStatus } from "@/data";
import InputError from "@/Components/InputError";
import { Textarea } from "@/Components/ui/textarea";
import { DatePicker } from "@/Components/DatePicker";
import { SelectSingleEventHandler } from "react-day-picker";
import { formatDate } from "@/lib/utils";

type PageProps = {
    auth: {
        user: User;
    };
};
const Create = ({ auth }: PageProps) => {
    const [status, setStatus] = useState<SelectOption | null>(null);
    const [date, setDate] = useState<Date>();

    const { data, setData, post, errors, reset } = useForm({
        name: "",
        status: status?.value,
        description: "",
        due_date: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("projects.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Projects" />
            <div className="flex items-center justify-between gap-2 mb-3">
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
                                <BreadcrumbLink asChild>
                                    <Link href={route("projects.index")}>
                                        Projects
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Create</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="mt-2 font-bold text-xl">Create Task</h2>
                </div>
                <Button>
                    <Link
                        className=" flex items-center gap-2 "
                        href={route("projects.index")}
                    >
                        {" "}
                        <List className="w-4 h-4" />
                        Project List
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
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
                                        setData("status", value?.value);
                                    }}
                                    placeholder="Project status"
                                />
                                <InputError message={errors.status} />
                            </div>
                        </div>

                        <div className="grid md:col-span-2 gap-2">
                            <Label htmlFor="description">
                                Project Description
                            </Label>

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
                            <Button asChild variant={"secondary"}>
                                <Link href={route("projects.index")}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Create;
