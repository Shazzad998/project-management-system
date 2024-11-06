import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Role, User } from "@/types";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import RolesTable from "./RolesTable";
import { can } from "@/lib/utils";

type Props = {
    auth: {
        user: User;
    };
    roles: Role[];
    session: {
        success?: string;
        error?: string;
    };
};

const Index = ({ auth, roles, session }: Props) => {
    useEffect(() => {
        if (session.success) {
            toast({
                title: "Success!",
                description: session.success,
                variant: "success",
            });
        }
        if (session.error) {
            toast({
                title: "Error!",
                description: session.error,
                variant: "destructive",
            });
        }
    }, [session]);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Roles" />
            <div className="flex items-end justify-between gap-2 mb-4">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Roles</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="mt-2 font-bold text-xl">Role List</h2>
                </div>
                {can("role-create", auth.user) && (
                    <Button asChild>
                        <Link
                            className=" flex items-center gap-1 "
                            href={route("roles.create")}
                        >
                            {" "}
                            <PlusIcon className="w-4 h-4" /> Create Role
                        </Link>
                    </Button>
                )}
            </div>
            <Card>
                <CardContent className="pt-6">
                    <RolesTable roles={roles} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
