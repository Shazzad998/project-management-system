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
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { Setting } from "@/types";
type OAuthSettingsTabProps = {
    setting: Setting;
};

const OAuthSettingsTab = ({ setting }: OAuthSettingsTabProps) => {
    const user = usePage().props.auth.user;
    const {
        data,
        setData,
        errors,
        post,
        processing,
    } = useForm({
        google_client_id: setting.google_client_id ?? "",
        google_client_secret: setting.google_client_secret ?? "",
    });

    const updateOauthSettings: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("settings.oauth-settings-update"), {
            preserveScroll: true,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>OAuth Settings</CardTitle>
                <CardDescription>
                    Make changes to your application's OAuth settings here.
                    Click save when you're done.
                </CardDescription>
            </CardHeader>
            <form onSubmit={updateOauthSettings}>
                <CardContent className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <Label htmlFor="google_client_id">
                            Google Client ID
                        </Label>
                        <Input
                            id="google_client_id"
                            disabled={!can("oauth-settings-edit", user)}
                            value={data.google_client_id}
                            onChange={(e) =>
                                setData("google_client_id", e.target.value)
                            }
                        />
                        <InputError message={errors.google_client_id} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="google_client_secret">
                            Google Client Secret
                        </Label>
                        <Input
                            id="google_client_secret"
                            disabled={!can("oauth-settings-edit", user)}
                            value={data.google_client_secret}
                            onChange={(e) =>
                                setData("google_client_secret", e.target.value)
                            }
                        />
                        <InputError message={errors.google_client_secret} />
                    </div>

                    <hr className=" col-span-2" />
                </CardContent>

                <CardFooter>
                    <Button disabled={!can("oauth-settings-edit", user) || processing}>
                        Save changes
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default OAuthSettingsTab;
