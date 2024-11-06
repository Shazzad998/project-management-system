'use client'
import { Briefcase, Check, HammerIcon, Rocket } from "lucide-react";

import { Label } from "../ui/label";
import { useState } from "react";
import PricingCard, { PricingCardProps } from "./partials/PricingCard";
import SectionWrapper from "./partials/SectionWrapper";
import SectionHeader from "./partials/SectionHeader";
import { Switch } from "../ui/switch";

type PricingSectionProps = {};

const pricingPlans: PricingCardProps[] = [
  {
    icon: <HammerIcon className="w-6 h-6" />,
    title: "Starter Plan",
    text: "Perfect for individuals or small teams getting started with taskmanagement.",
    price: "Free",
    priceYearly:"Free",
    features: [
      "Task Management Tools",
      "Team Colaboration ( 3 members )",
      "Basic Project Tracking",
      "Limited File Storage",
    ],
    buttonText: "Get Started",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Pro Plan",
    text: "Designed for growing teams that need advanced features and flexibility",
    price: "$19",
    priceYearly:"$15",
    features: [
      "Everything in Starter Plan",
      "Unlimited Team Members",
      "Advanced Project Tracking",
      "Customizable Dashboards",
    ],
    buttonText: "Get Started",
    monthly: true,
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Enterprice Plan",
    text: "Best for large teams and enterprises with multiple projects and complex workflows",
    price: "$49",
    priceYearly:"$40",
    features: [
      "Everything in Pro Plan",
      "Dedicated Account Manager",
      "Advanced Analytics & Reporting",
      "Unlimited File Storage",
    ],
    buttonText: "Get Started",
    monthly: true,
  },
];
const PricingSection = (props: PricingSectionProps) => {

  const [yearly, setYearly] = useState<boolean>(true);
  return (
    <SectionWrapper>
      <SectionHeader
        headerText="Flexible plans for every team"
        subHeaderText="Choose the plan that fits your teams needs. Wheather you're just getting started managing large projects. Qwirk offers affordable solutions to help you stay organized and productive"
      />

      <div className="flex items-center space-x-2 justify-center mb-6">
        <Label htmlFor="airplane-mode">Monthly</Label>
        <Switch id="airplane-mode" checked={yearly} onCheckedChange={(value) => setYearly(value)} />
        <Label htmlFor="airplane-mode">Yearly</Label>
      </div>

      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            icon={plan.icon}
            title={plan.title}
            text={plan.text}
            price={plan.price}
            priceYearly={plan.priceYearly}
            features={plan.features}
            buttonText={plan.buttonText}
            buttonVariant={plan.buttonVariant}
            monthly={plan.monthly}
            yearly={yearly}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default PricingSection;
