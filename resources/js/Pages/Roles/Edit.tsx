import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Errors, Permission, Role, User, UserSingleResource } from "@/types";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { List } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { FormEvent, useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import CheckBoxGroup from "./Partials/CheckBoxGroup";

type EditProps = {
    auth: {
        user: UserSingleResource;
    };
    permissions: {
        [key: string]: string[];
    };
    role: {
        data: Role;
    };
};

const Edit = ({ auth, permissions, role }: EditProps) => {
    const [errors, setErrors] = useState<Errors>({});

    const initializePermissions = (permissions: Permission[]) => {
        return permissions.map((permission) => permission.name);
    };
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        initializePermissions(role.data.permissions)
    );

    const [data, _setData] = useState({
        name: "",
    });

    useEffect(() => {
        setData("name", role.data.name);
    }, [role]);

    const setData = (key: string, value: string) => {
        _setData((values) => ({
            ...values,
            [key]: value,
        }));
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        router.put(
            route("roles.update", role.data),
            { ...data, permissions: selectedPermissions },
            {
                onSuccess: () => {},
                onError: (errors) => {
                    setErrors(errors as Errors);
                },
            }
        );
    }

    return (
        <AuthenticatedLayout user={auth.user.data}>
            <Head title="Roles" />
            <div className="flex items-end justify-between gap-2">
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
                                    <Link href={route("roles.index")}>
                                        Roles
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="mt-2 font-bold text-xl">Edit Role</h2>
                </div>
                <Button>
                    <Link
                        className=" flex items-center gap-1 "
                        href={route("roles.index")}
                    >
                        {" "}
                        <List className="w-4 h-4" /> Role List
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <form
                        className=" grid grid-cols-1 md:grid-cols-2 gap-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="name">Role Name</Label>
                            <div>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Name of the role"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>
                        </div>

                        <div className="grid col-span-2 gap-4">
                            <div>
                                <Label htmlFor="name">Permissions</Label>
                                <InputError message={errors.permissions} />
                            </div>

                            <CheckBoxGroup
                                permissions={permissions}
                                selectedPermissions={selectedPermissions}
                                setSelectedPermissions={setSelectedPermissions}
                            />
                        </div>

                        <div className=" flex items-center justify-end gap-2 md:col-span-2 mt-6">
                            <Button variant={"secondary"}>Cancel</Button>

                            <Button>Update</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Edit;
