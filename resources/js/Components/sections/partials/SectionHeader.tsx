import Reveal from "@/Components/Reveal";
import { cn } from "@/lib/utils";
import React from "react";

type SectionHeaderProps = {
    className?: string;
    headerText: string;
    headerClass?: string;
    subHeaderText?: string;
    subHeaderClass?: string;
};

const SectionHeader = ({
    className,
    headerText,
    headerClass,
    subHeaderText,
    subHeaderClass,
}: SectionHeaderProps) => {
    return (
        <div
            className={cn(
                "space-y-2 md:space-y-4 max-w-4xl mx-auto text-center mb-8 md:mb-10",
                className
            )}
        >
            <Reveal delay={0.3} x={0} y={8}>
                <h2
                    className={cn(
                        "text-3xl lg:text-4xl 2xl:text-5xl font-dosis font-bold",
                        headerClass
                    )}
                >
                    {headerText}
                </h2>
            </Reveal>
            {subHeaderText && (
                <Reveal delay={0.5} x={0} y={8}>
                    <p
                        className={cn(
                            "text-sm lg:text-base text-foreground/70",
                            subHeaderClass
                        )}
                    >
                        {subHeaderText}
                    </p>
                </Reveal>
            )}
        </div>
    );
};

export default SectionHeader;
