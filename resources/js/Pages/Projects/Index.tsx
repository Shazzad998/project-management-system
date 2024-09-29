import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Project, ProjectResource, User, UserSingleResource } from "@/types";
import { Card, CardContent } from "@/Components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import ProjectForm from "./Modals/ProjectForm";

type Props = {
    auth: {
        user: UserSingleResource;
    };
    projects: ProjectResource;
    session: {
        success?: string;
        error?: string;
    };
};

const Index = ({ auth, projects, session }: Props) => {
    const { toast } = useToast();
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [project, setProject] = useState<Project | null>(null);

    const closeForm = () => {
        setFormOpen(false);
        setProject(null);
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

    const openEdit = (project: Project | null) => {
        setProject(project);
        setFormOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user.data}>
            <Head title="Projects" />
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
                                <BreadcrumbPage>Projects</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h2 className="mt-2 font-bold text-xl">Project List</h2>
                </div>
                <Button onClick={() => setFormOpen(true)}>
                    <PlusIcon className="w-4 h-4" /> Create Project
                </Button>
                <ProjectForm
                    open={formOpen}
                    onOpenChange={closeForm}
                    project={project}
                />
            </div>
            <Card>
                <CardContent className="pt-6">
                    <ProjectsTable
                        projects={projects.data}
                        setProject={openEdit}
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Index;
