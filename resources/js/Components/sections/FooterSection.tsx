import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FacebookIcon, Youtube } from "lucide-react";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import ApplicationLogo from "../ApplicationLogo";
import Reveal from "../Reveal";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type FooterSectionProps = {};

const FooterSection = (props: FooterSectionProps) => {
    const setting = usePage<PageProps>().props.auth.setting;
    return (
        <footer className=" pt-16">
            <div className=" grid md:grid-cols-2 gap-4 max-w-6xl mx-auto border-b border-border pb-6 mb-10 px-4">
                <Reveal delay={0.5} x={0} y={4}>
                    <h4 className=" font-dosis font-semibold text-2xl mb-1">
                        Join our newsletter
                    </h4>
                    <p className=" text-sm font-light text-foreground/70">
                        Get updates from us weekly about project management
                    </p>
                </Reveal>
                <Reveal
                    delay={0.8}
                    x={0}
                    y={4}
                    className=" flex gap-2 justify-end"
                >
                    <Input
                        placeholder="Enter your email"
                        className=" max-w-72"
                    />
                    <Button>Subscribe</Button>
                </Reveal>
            </div>
            <div className=" max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-6 px-4">
                <div className=" text-foreground/70 space-y-6">
                    <Reveal delay={0.5} x={0} y={4}>
                        <img
                            src={setting.logo}
                            alt="qwirk-logo"
                            className=" w-32 h-auto"
                        />
                    </Reveal>
                    <Reveal delay={0.6} x={0} y={4} className=" grid">
                        <Label className=" text-lg text-foreground">
                            Address
                        </Label>
                        <span> {setting.address}</span>
                    </Reveal>
                    <Reveal delay={0.7} x={0} y={4} className=" grid">
                        <Label className=" text-lg text-foreground">
                            Contact
                        </Label>
                        <a href="" className=" underline">
                            {setting.phone}
                        </a>
                        <a href="" className=" underline">
                            {setting.email}
                        </a>
                    </Reveal>
                    <Reveal
                        delay={0.8}
                        x={0}
                        y={4}
                        className=" flex items-center text-foreground"
                    >
                        <a
                            href={setting.facebook_url}
                            className=" p-2 hover:text-primary transition-colors duration-200"
                        >
                            <FacebookIcon className=" w-6 h-6" />
                        </a>
                        <a
                            href={setting.instagram_url}
                            className=" p-2 hover:text-primary transition-colors duration-200"
                        >
                            <InstagramLogoIcon className=" w-6 h-6" />
                        </a>
                        <a
                            href={setting.linkedin_url}
                            className=" p-2 hover:text-primary transition-colors duration-200"
                        >
                            <LinkedInLogoIcon className=" w-6 h-6" />
                        </a>
                        <a
                            href={setting.youtube_url}
                            className=" p-2 hover:text-primary transition-colors duration-200"
                        >
                            <Youtube className=" w-6 h-6" />
                        </a>
                    </Reveal>
                </div>

                <div className=" grid grid-cols-2 gap-6 md:gap-16">
                    <Reveal delay={0.5} x={0} y={4}>
                        <ul className=" text-foreground/70 flex flex-col gap-2">
                            <Label className=" text-lg text-foreground">
                                Sitemap
                            </Label>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    Product
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    Faq
                                </a>
                            </li>
                        </ul>
                    </Reveal>
                    <Reveal delay={0.5} x={0} y={4}>
                        <ul className=" text-foreground/70 flex flex-col gap-2">
                            <Label className=" text-lg text-foreground">
                                Company
                            </Label>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className=" p-2 pl-0 hover:text-foreground transition-colors duration-200"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </div>
            <hr className=" mt-6" />

            <div className=" max-w-6xl mx-auto py-6 flex flex-col md:flex-row md:justify-between gap-2 justify-center items-center">
                <div className=" font-semibold ">
                    &copy; 2024 Qwirk. All Rights reserved.
                </div>
                <div className=" flex justify-center text-xs sm:text-sm gap-4 text-foreground/70">
                    <a href="">Privacy Policy</a>
                    <a href="">Terms of Service</a>
                    <a href="">Cookies Settings</a>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
