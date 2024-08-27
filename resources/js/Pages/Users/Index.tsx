import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";

type Props = {
    auth: {
        user: User;
    };
};

const Index = ({ auth }: Props) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="bg-background  overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">You're logged in!</div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
