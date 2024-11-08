import ApplicationLogo from "@/Components/ApplicationLogo";
import { Card } from "@/Components/ui/card";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-12 sm:pt-0 bg-background relative">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(#091023bf 1px, transparent 1px), linear-gradient(to right, #091023bf 1px, transparent 1px)`,
                    backgroundSize: `60px 60px`,
                    maskImage: `
                        linear-gradient(to bottom, transparent, black 40%, black 60%, transparent),
                        linear-gradient(to right, transparent, black 40%, black 60%, transparent)`,
                    maskComposite: "intersect",
                }}
            />

            <div className=" relative">
                <Link href="/">
                    <ApplicationLogo className="w-44 fill-current text-foreground" />
                </Link>
            </div>
            <Card className="mx-auto max-w-sm min-w-80 sm:min-w-96 mt-6 relative">
                {children}
            </Card>
        </div>
    );
}
