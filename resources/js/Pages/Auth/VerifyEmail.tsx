import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <CardHeader>
                <CardTitle className="text-2xl">Email Verification</CardTitle>
                <CardDescription>
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </CardDescription>
                {status === "verification-link-sent" && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className="grid gap-4">
                    <div className="mt-4 flex items-center justify-between">
                        <Button disabled={processing}>
                            Resend Verification Email
                        </Button>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="underline text-sm text-foreground hover:text-foreground/70 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
