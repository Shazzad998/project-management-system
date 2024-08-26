import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-2xl">Profile Information</CardTitle>
                <CardDescription>
                    Update your account's profile information and email address.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="grid gap-4">
                    <div className=" grid gap-2">
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            autoComplete="name"
                        />

                        <InputError className="-mt-1" message={errors.name} />
                    </div>

                    <div className=" grid gap-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            autoComplete="username"
                        />

                        <InputError className="-mt-1" message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-foreground">
                                Your email address is unverified.{" "}
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-foreground/80 hover:text-foreground rounded-md focus:outline-none"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-foreground">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
