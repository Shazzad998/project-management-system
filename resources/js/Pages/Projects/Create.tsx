import { Head, Link } from "@inertiajs/react";
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
import { useState } from "react";
import { projectStatus } from "@/data";

type PageProps = {
    auth: {
        user: User;
    };
};
const Create = ({ auth }: PageProps) => {
    const [status, setStatus] = useState<SelectOption | null>(null);
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
                    <div className=" grid grid-cols-1 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="m@example.com"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Project Status</Label>
                            <SelectInput
                                options={projectStatus}
                                selectedValue={status}
                                setSelectedValue={setStatus}
                                placeholder="Set Status"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Create;
