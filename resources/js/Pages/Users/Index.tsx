import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Project, ProjectResource, User, UserResource } from "@/types";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import ProjectForm from "../Projects/Modals/ProjectForm";
import UsersTable from "./UsersTable";
import UserForm from "./Modals/UserForm";

type Props = {
    auth: {
        user: User;
    };
    users: UserResource;
    session: {
        success?:string
        error?:string
    };
};

const Index = ({ auth, users, session }: Props) => {
    const { toast } = useToast();
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const closeForm = () => {
        setFormOpen(false);
        setUser(null);
    };
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

    const openEdit = (user: User | null) => {
        setUser(user);
        setFormOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <div className="flex items-end justify-between gap-2">
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
                                <BreadcrumbPage>Users</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="mt-2 font-bold text-xl">User List</h2>
                </div>
                <Button onClick={() => setFormOpen(true)}>
                    <PlusIcon className="w-4 h-4 mr-2" /> Create User
                </Button>
                <UserForm open={formOpen}
                    onOpenChange={closeForm} user={user}/>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <UsersTable
                        users={users.data}
                        setUser={openEdit}
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
