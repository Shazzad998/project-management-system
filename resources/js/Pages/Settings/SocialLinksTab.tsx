import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { can } from "@/lib/utils";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps, Setting } from "@/types";
type SocialLinksTabProps = {
    setting: Setting;
};

const SocialLinksTab = ({ setting }: SocialLinksTabProps) => {
    const user = usePage<PageProps>().props.auth.user;
    const { data, setData, errors, post, processing } = useForm({
        facebook_url: setting.facebook_url ?? "",
        x_url: setting.x_url ?? "",
        instagram_url: setting.instagram_url ?? "",
        youtube_url: setting.youtube_url ?? "",
        linkedin_url: setting.linkedin_url ?? "",
        tiktok_url: setting.tiktok_url ?? "",
        discord_url: setting.discord_url ?? "",
    });

    const updateSocialLinks: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("settings.social-links-update"), {
            preserveScroll: true,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                    Make changes to your application's Social Links here. Click
                    save when you're done.
                </CardDescription>
            </CardHeader>
            <form onSubmit={updateSocialLinks}>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <Label
                            htmlFor="facebook_url"
                            className=" flex items-center gap-2"
                        >
                            <img
                                src="/images/icons/facebook.svg"
                                alt=""
                                className="w-5 h-5 dark:invert"
                            />{" "}
                            Facebook URL
                        </Label>
                        <Input
                            id="facebook_url"
                            disabled={!can("social-links-edit", user)}
                            value={data.facebook_url}
                            onChange={(e) =>
                                setData("facebook_url", e.target.value)
                            }
                        />
                        <InputError message={errors.facebook_url} />
                    </div>

                    <div className="space-y-1">
                        <Label
                            htmlFor="x_url"
                            className=" flex items-center gap-2"
                        >
                            <img
                                src="/images/icons/twitter.svg"
                                alt=""
                                className="w-5 h-5 dark:invert"
                            />{" "}
                            Twitter URL
                        </Label>
                        <Input
                            id="x_url"
                            disabled={!can("social-links-edit", user)}
                            value={data.x_url}
                            onChange={(e) => setData("x_url", e.target.value)}
                        />
                        <InputError message={errors.x_url} />
                    </div>
                    <div className="space-y-1">
                        <Label
                            htmlFor="instagram_url"
                            className=" flex items-center gap-2"
                        >
                            <img
                                src="/images/icons/instagram.svg"
                                alt=""
                                className="w-5 h-5 dark:invert"
                            />{" "}
                            Instagram URL
                        </Label>
                        <Input
                            id="instagram_url"
                            disabled={!can("social-links-edit", user)}
                            value={data.instagram_url}
                            onChange={(e) =>
                                setData("instagram_url", e.target.value)
                            }
                        />
                        <InputError message={errors.instagram_url} />
                    </div>

                    <div className="space-y-1">
                        <Label
                            htmlFor="youtube_url"
                            className=" flex items-center gap-2"
                        >
                            <img
                                src="/images/icons/youtube.svg"
                                alt=""
                                className="w-5 h-5 dark:invert"
                            />{" "}
                            Youtube URL
                        </Label>
                        <Input
                            id="youtube_url"
                            disabled={!can("social-links-edit", user)}
                            value={data.youtube_url}
                            onChange={(e) =>
                                setData("youtube_url", e.target.value)
                            }
                        />
                        <InputError message={errors.youtube_url} />
                    </div>

                    <div className="space-y-1">
                        <Label
                            htmlFor="linkedin_url"
                            className=" flex items-center gap-2"
                        >
                            <img
                                src="/images/icons/linkedin.svg"
                                alt=""
                                className="w-5 h-5 dark:invert"
                            />{" "}
                            Linkedin URL
                        </Label>
                        <Input
                            id="linkedin_url"
                            disabled={!can("social-links-edit", user)}
                            value={data.linkedin_url}
                            onChange={(e) =>
                                setData("linkedin_url", e.target.value)
                            }
                        />
                        <InputError message={errors.linkedin_url} />
                    </div>
                    <div className="space-y-1">
                        <Label
                            htmlFor="tiktok_url"
                            className=" flex items-center gap-2"
                        >
                            <img
                                src="/images/icons/tiktok.svg"
                                alt=""
                                className="w-5 h-5 dark:invert"
                            />{" "}
                            Tiktok URL
                        </Label>
                        <Input
                            id="tiktok_url"
                            disabled={!can("social-links-edit", user)}
                            value={data.tiktok_url}
                            onChange={(e) =>
                                setData("tiktok_url", e.target.value)
                            }
                        />
                        <InputError message={errors.tiktok_url} />
                    </div>
                    <div className="space-y-1">
                        <Label
                            htmlFor="discord_url"
                            className=" flex items-center gap-2"
                        >
                            <img
                                src="/images/icons/discord.svg"
                                alt=""
                                className="w-5 h-5 dark:invert"
                            />{" "}
                            Discord URL
                        </Label>
                        <Input
                            id="discord_url"
                            disabled={!can("social-links-edit", user)}
                            value={data.discord_url}
                            onChange={(e) =>
                                setData("discord_url", e.target.value)
                            }
                        />
                        <InputError message={errors.discord_url} />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        disabled={!can("social-links-edit", user) || processing}
                    >
                        Save changes
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default SocialLinksTab;
