import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
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
import { Button } from "@/Components/ui/button";
import { List } from "lucide-react";

type PageProps = {
    auth: {
        user: User;
    };
};
const Create = ({auth}:PageProps) => {
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
                            <BreadcrumbLink asChild>
                                <Link href={route("projects.index")}>
                                    Projects
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Button>
                    <Link className=" flex items-center gap-2 " href={route('projects.index')}> <List className="w-4 h-4"/>Project List</Link>
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    
                </CardContent>
            </Card>
        </AuthenticatedLayout>
  )
}

export default Create