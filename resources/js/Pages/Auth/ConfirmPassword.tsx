import { FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <CardHeader>
                <CardTitle className="text-2xl">Confirm Password</CardTitle>
                <CardDescription>
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="-mt-1"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4" disabled={processing}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
