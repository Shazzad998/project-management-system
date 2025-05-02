import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { EmailConfig, PageProps, Session, Setting } from "@/types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

import { useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import GeneralSettingsTab from "./GeneralSettingsTab";
import OAuthSettingsTab from "./OAuthSettingsTab";
import { toast } from "@/hooks/use-toast";
import SocialLinksTab from "./SocialLinksTab";
import { can } from "@/lib/utils";
import EmailConfigurationTab from "./EmailConfigurationTab";

const Edit = () => {
    const user = usePage<PageProps>().props.auth.user;
    const setting = usePage().props.setting as Setting;
    const emailConfig = usePage().props.emailConfig as EmailConfig;
    const session = usePage().props.session as Session;
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
        <AuthenticatedLayout user={user}
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Settings</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <Head title="Settings" />

            <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className=" font-bold text-xl">Settings</h2>
            </div>
            <Tabs defaultValue="general-settings" className="">
                <TabsList className="flex w-full flex-wrap gap-1 justify-start h-auto max-w-fit">
                    <TabsTrigger
                        value="general-settings"
                        disabled={!can("general-settings-edit", user)}
                    >
                        General Settings
                    </TabsTrigger>
                    {/* <TabsTrigger
                        value="email-configuration-settings"
                        disabled={!can("email-settings-edit", user)}
                    >
                        Email Configuration
                    </TabsTrigger> */}
                    {/* <TabsTrigger
                        value="oauth-settings"
                        disabled={!can("oauth-settings-edit", user)}
                    >
                        OAuth Settings
                    </TabsTrigger> */}
                    <TabsTrigger
                        value="social-links"
                        disabled={!can("social-links-edit", user)}
                    >
                        Social Links
                    </TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="general-settings">
                        <GeneralSettingsTab />
                    </TabsContent>
                    <TabsContent value="email-configuration-settings">
                        {can("email-settings-edit", user) && (
                            <EmailConfigurationTab emailConfig={emailConfig} />
                        )}
                    </TabsContent>
                    {/* <TabsContent value="oauth-settings">
                        <OAuthSettingsTab setting={setting} />
                    </TabsContent> */}

                    <TabsContent value="social-links">
                        <SocialLinksTab setting={setting} />
                    </TabsContent>
                </div>
            </Tabs>
        </AuthenticatedLayout>
    );
};

export default Edit;
