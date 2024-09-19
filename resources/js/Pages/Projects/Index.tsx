import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Project, ProjectResource, User } from "@/types";
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
import ProjectForm from "@/Components/projects/ProjectForm";

type Props = {
    auth: {
        user: User;
    };
    projects: ProjectResource;
    success: string;
};

const Index = ({ auth, projects, success }: Props) => {
    const { toast } = useToast();
    const [formOpen, setFormOpen] = useState<boolean>(false)
    const [project, setProject] = useState<Project|null>(null)

    const closeForm =() => {
        setFormOpen(false)
        setProject(null)
    }
    useEffect(() => {
        if (success) {
            toast({
                title: success,
                variant:'success',
            });
        }
    }, [success]);

    return (
        <AuthenticatedLayout user={auth.user}>
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
                {/* <Button asChild>
                    <Link
                        className=" flex items-center gap-1 "
                        href={route("projects.create")}
                    >
                        {" "}
                        <PlusIcon className="w-4 h-4" /> Create Project
                    </Link>
                </Button> */}
                <Button onClick={()=> setFormOpen(true)}>
                    
                        <PlusIcon className="w-4 h-4" /> Create Project
                    
                </Button>
                <ProjectForm open={formOpen} onOpenChange={closeForm} project={project}/>
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
