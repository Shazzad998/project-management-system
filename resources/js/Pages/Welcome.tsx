import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AlertSection from "@/Components/sections/AlertSection";
import Navbar from "@/Components/sections/partials/Navbar";
import HeroSection from "@/Components/sections/HeroSection";
import MarqueeSection from "@/Components/sections/MarqueSection";
import AboutProductSection from "@/Components/sections/AboutProductSection";
import FeatureSection from "@/Components/sections/FeatureSection";
import PricingSection from "@/Components/sections/PricingSection";
import FaqSection from "@/Components/sections/FaqSection";
import CtaSection from "@/Components/sections/CtaSection";
import FooterSection from "@/Components/sections/FooterSection";

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Welcome" />
            <AlertSection />
            <Navbar auth={auth} />
            <HeroSection />
            <MarqueeSection />
            <AboutProductSection />
            <FeatureSection />
            <PricingSection />
            <FaqSection />
            <CtaSection />
            <FooterSection />
        </>
    );
}
