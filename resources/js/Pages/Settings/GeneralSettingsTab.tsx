import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import InputError from "@/Components/InputError";
import { can } from "@/lib/utils";
import { useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { Textarea } from "@/Components/ui/textarea";
import { PageProps } from "@/types";
type Props = {};

const GeneralSettingsTab = (props: Props) => {
    const user = usePage<PageProps>().props.auth.user;
    const setting = usePage<PageProps>().props.auth.setting;

    type FormData = {
        site_name: string;
        site_description: string;
        email: string;
        phone: string;
        address: string;
        logo: File | null;
        icon: File | null;
    };
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<FormData>({
        site_name: setting.site_name ?? "",
        site_description: setting.site_description ?? "",
        email: setting.email ?? "",
        phone: setting.phone ?? "",
        address: setting.address ?? "",
        logo: null,
        icon: null,
    });

    const handleFileChange = (
        e: ChangeEvent<HTMLInputElement>,
        name: "logo" |  "icon"
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(name, file);
        }
    };

    const updateGeneralSettings: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("settings.general-settings-update"), {
            preserveScroll: true,
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                    Make changes to your application settings here. Click save
                    when you're done.
                </CardDescription>
            </CardHeader>
            <form onSubmit={updateGeneralSettings}>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className=" flex gap-4 items-center">
                        {setting && setting.logo && (
                            <div className=" bg-zinc-900 flex items-center justify-center p-1 rounded-md w-28 aspect-square">
                                <img
                                    src={setting.logo}
                                    alt=""
                                    className=" w-full rounded-xl"
                                />
                            </div>
                        )}
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="image">Logo </Label>

                            <div>
                                <Input
                                    id="image"
                                    className=" file:text-muted-foreground"
                                    type="file"
                                    disabled={!can("general-settings-edit", user)}
                                    onChange={(e) =>
                                        handleFileChange(e, "logo")
                                    }
                                />
                                <InputError message={errors.logo} />
                            </div>
                        </div>
                    </div>
                    <div className=" flex gap-4 items-center">
                        {setting && setting.icon && (
                            <div className=" bg-zinc-900 flex items-center justify-center p-1 rounded-md w-28 aspect-square">
                                <img
                                    src={setting.icon}
                                    alt=""
                                    className=" w-full rounded-xl"
                                />
                            </div>
                        )}
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="image">Icon</Label>

                            <div>
                                <Input
                                    id="image"
                                    className=" file:text-muted-foreground"
                                    type="file"
                                    disabled={!can("general-settings-edit", user)}
                                    onChange={(e) =>
                                        handleFileChange(e, "icon")
                                    }
                                />
                                <InputError message={errors.icon} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="site_name">Site Name</Label>
                        <Input
                            id="site_name"
                            disabled={!can("general-settings-edit", user)}
                            value={data.site_name}
                            onChange={(e) =>
                                setData("site_name", e.target.value)
                            }
                        />
                        <InputError message={errors.site_name} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            disabled={!can("general-settings-edit", user)}
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="phone"> Phone</Label>
                        <Input
                            id="phone"
                            disabled={!can("general-settings-edit", user)}
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="address"> Address</Label>
                        <Input
                            id="address"
                            disabled={!can("general-settings-edit", user)}
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                        />
                        <InputError message={errors.address} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="site_description"> Site Short Description</Label>
                        <Textarea
                            id="site_description"
                            rows={4}
                            disabled={!can("general-settings-edit", user)}
                            value={data.site_description}
                            onChange={(e) => setData("site_description", e.target.value)}
                        />
                        <InputError message={errors.site_description} />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        disabled={
                            !can("general-settings-edit", user) || processing
                        }
                    >
                        Save changes
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default GeneralSettingsTab;
