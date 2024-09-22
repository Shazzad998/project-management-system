import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet";
import { Button } from "../../../Components/ui/button";
import { Errors, User } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "../../../Components/ui/label";
import { Input } from "../../../Components/ui/input";
import InputError from "../../../Components/InputError";
import { router } from "@inertiajs/react";

type Props = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    user: User | null;
};

const UserForm = ({ open, onOpenChange, user }: Props) => {
    const [errors, setErrors] = useState<Errors>({});

    const [data, _setData] = useState({
        name: "",
        email: "",
        password:""
    });

    const setData = (key: string, value: string) => {
        _setData((values) => ({
            ...values,
            [key]: value,
        }));
    };

    useEffect(() => {
        setData("name", user?.name ?? "");
        setData("email", user?.email ?? "");
    }, [user]);

    const reset = () => {
        _setData({
            name: "",
            email: "",
            password:""
        });
        setErrors({});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (user) {
            router.patch(route("users.update", user.id), data, {
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
                        <Label htmlFor="name">Email</Label>

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
