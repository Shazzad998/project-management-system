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
import InputError from "@/Components/InputError";
import { can } from "@/lib/utils";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { EmailConfig, Setting } from "@/types";
type EmailConfigurationTabProps = {
    emailConfig: EmailConfig;
};

const EmailConfigurationTab = ({ emailConfig }: EmailConfigurationTabProps) => {
    const user = usePage().props.auth.user;
    const { data, setData, errors, post, processing } = useForm({
        mail_mailer: emailConfig.mail_mailer ?? "",
        mail_host: emailConfig.mail_host ?? "",
        mail_port: emailConfig.mail_port ?? "",
        mail_encryption: emailConfig.mail_encryption ?? "",
        mail_username: emailConfig.mail_username ?? "",
        mail_password: emailConfig.mail_password ?? "",
        mail_from_address: emailConfig.mail_from_address ?? "",
        mail_from_name: emailConfig.mail_from_name ?? "",
    });

    const updateEmailSettings: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("settings.email-settings-update"), {
            preserveScroll: true,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Configuration Settings</CardTitle>
                <CardDescription>
                    Make changes to your Email Configuration here. Click
                    save when you're done.
                </CardDescription>
            </CardHeader>
            <form onSubmit={updateEmailSettings}>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <Label htmlFor="mail_mailer">Mail Mailer</Label>
                        <Input
                            id="mail_mailer"
                            disabled={!can("email-settings-edit", user)}
                            value={data.mail_mailer}
                            onChange={(e) =>
                                setData("mail_mailer", e.target.value)
                            }
                        />
                        <InputError message={errors.mail_mailer} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="mail_host">Mail Host</Label>
                        <Input
                            id="mail_host"
                            disabled={!can("email-settings-edit", user)}
                            value={data.mail_host}
                            onChange={(e) =>
                                setData("mail_host", e.target.value)
                            }
                        />
                        <InputError message={errors.mail_host} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="mail_port">Mail Port</Label>
                        <Input
                            id="mail_port"
                            disabled={!can("email-settings-edit", user)}
                            value={data.mail_port}
                            onChange={(e) =>
                                setData("mail_port", e.target.value)
                            }
                        />
                        <InputError message={errors.mail_port} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="mail_encryption">Mail Encryption</Label>
                        <Input
                            id="mail_encryption"
                            disabled={!can("email-settings-edit", user)}
                            value={data.mail_encryption}
                            onChange={(e) =>
                                setData("mail_encryption", e.target.value)
                            }
                        />
                        <InputError message={errors.mail_encryption} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="mail_username">Mail Username</Label>
                        <Input
                            id="mail_username"
                            disabled={!can("email-settings-edit", user)}
                            value={data.mail_username}
                            onChange={(e) =>
                                setData("mail_username", e.target.value)
                            }
                        />
                        <InputError message={errors.mail_username} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="mail_password">Mail Password</Label>
                        <Input
                            id="mail_password"
                            disabled={!can("email-settings-edit", user)}
                            value={data.mail_password}
                            onChange={(e) =>
                                setData("mail_password", e.target.value)
                            }
                        />
                        <InputError message={errors.mail_password} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="mail_from_address">
                            Mail From Address
                        </Label>
                        <Input
                            id="mail_from_address"
                            disabled={!can("email-settings-edit", user)}
                            value={data.mail_from_address}
                            onChange={(e) =>
                                setData("mail_from_address", e.target.value)
                            }
                        />
                        <InputError message={errors.mail_from_address} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="mail_from_name">Mail From Name</Label>
                        <Input
                            id="mail_from_name"
                            disabled={!can("email-settings-edit", user)}
                            value={data.mail_from_name}
                            onChange={(e) =>
                                setData("mail_from_name", e.target.value)
                            }
                        />
                        <InputError message={errors.mail_from_name} />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        disabled={!can("email-settings-edit", user) || processing}
                    >
                        Save changes
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default EmailConfigurationTab;
