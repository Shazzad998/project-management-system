import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionWrapperProps = {
    className?: string;
    children: ReactNode;
    id?: string;
};

const SectionWrapper = ({ className, children, id }: SectionWrapperProps) => {
    return (
        <section
            className={cn("py-8 md:py-12 lg:py-16 xl:py-20 px-4", className)}
            id={id}
        >
            {children}
        </section>
    );
};

export default SectionWrapper;
