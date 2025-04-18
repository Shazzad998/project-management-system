import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet";
import { Button } from "../../../Components/ui/button";
import { Errors, SelectOption, User } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import InputError from "../../../Components/InputError";
import { router } from "@inertiajs/react";
import { SelectInput } from "@/Components/SelectInput";

type Props = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    user: User | null;
    roles: string[];
};

const UserForm = ({ open, onOpenChange, user, roles= [] }: Props) => {
    
    const roleOptions = roles?.map((role) => ({
            label: role,
            value: role,
        }));
    const [errors, setErrors] = useState<Errors>({});
    const [role, setRole] = useState<SelectOption | null | undefined>();

    const [data, _setData] = useState<{
        name: string;
        email: string;
        password: string;
        image_path: File | null;
        role: string;
        _method?: string;
    }>({
        name: "",
        email: "",
        password: "",
        role: "",
        image_path: null,
    });

    const setData = (key: string, value: string | File | null) => {
        _setData((values) => ({
            ...values,
            [key]: value,
        }));
    };

    useEffect(() => {
        setData("name", user?.name ?? "");
        setData("email", user?.email ?? "");
        setData("role", user?.roles?.[0] ?? null);
        setRole(
            user
                ? roleOptions?.find((item) => item.value == user.roles?.[0])
                : null
        );
        if (user) {
            setData("_method", "PUT");
        }
    }, [user]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("image_path", file);
        }
    };

    const reset = () => {
        _setData({
            name: "",
            email: "",
            password: "",
            role: "",
            image_path: null,
        });
        setRole(null);
        setErrors({});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (user) {
            console.log(data);
            router.post(route("users.update", user.id), data, {
                onSuccess: () => {
                    closeSheet();
                    reset();
                },
                onError: (errors) => {
                    setErrors(errors as Errors);
                },
            });
        } else {
            router.post(route("users.store"), data, {
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
                    <SheetTitle>Create User</SheetTitle>
                </SheetHeader>
                <form
                    onSubmit={handleSubmit}
                    className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                >
                    <div className=" flex gap-4 items-stretch">
                        {user && user.image_path && (
                            <img
                                src={user.image_path}
                                alt=""
                                className=" aspect-square w-16 rounded-xl object-cover"
                            />
                        )}
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="image">Image</Label>

                            <div>
                                <Input
                                    id="image"
                                    className=" file:text-muted-foreground"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <InputError message={errors.name} />
                            </div>
                        </div>
                    </div>

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
                        <Label htmlFor="email">Email</Label>

                        <div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email of the user"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>

                        <div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Role</Label>
                        <div>
                            <SelectInput
                                className="w-full"
                                options={roleOptions}
                                selectedValue={role}
                                setSelectedValue={(value) => {
                                    setRole(value);
                                    setData("role", value?.value ?? "");
                                }}
                                placeholder="Select Role"
                            />
                            <InputError message={errors.role} />
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

export default UserForm;
