import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="bg-background  overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">You're logged in!</div>
            </div>
        </AuthenticatedLayout>
    );
}
