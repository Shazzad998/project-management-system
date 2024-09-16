import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProjectResource, User } from "@/types";
import {
    Card,
    CardContent
} from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import ProjectsTable from "./ProjectsTable";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";

type Props = {
    auth: {
        user: User;
    };
    projects: ProjectResource;
};

const Index = ({ auth, projects }: Props) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Projects" />
            <div className="flex items-center justify-between gap-2 mb-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Projects</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Button>
                    <Link className=" flex items-center gap-1 " href={route('projects.create')}> <PlusIcon className="w-4 h-4"/> Create Project</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <ProjectsTable projects={projects.data} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
