import { Button } from "../ui/button";
import SectionWrapper from "./partials/SectionWrapper";

type CtaSectionProps = {};

const CtaSection = (props: CtaSectionProps) => {
    return (
        <SectionWrapper>
            <div className=" grid md:grid-cols-2 gap-2 relative  max-w-6xl mx-auto bg-gradient-to-tr from-muted/30 via-primary/5 to-primary/50 rounded-lg overflow-hidden shadow-xl ring-1 ring-border/50 px-4">
                <div className=" px-6 md:px-10 py-12 max-w-2xl">
                    <h2 className=" text-3xl lg:text-4xl 2xl:text-5xl font-dosis font-bold mb-4">
                        Ready to Streamline your workflow
                    </h2>
                    <p className=" font-light mb-12 text-sm text-foreground/70">
                        Join Qwirk today and boost yours team&apos;s
                        productivity with powerful task management tools.
                        Simplify your projects and stay organized.
                    </p>
                    <Button>Get Started Now</Button>
                </div>
                <div className="hidden md:block relative ">
                    <img
                        src="/images/cta-bg.png"
                        alt="Cta Background"
                        className=" object-cover absolute inset-0"
                    />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default CtaSection;
