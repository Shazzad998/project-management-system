import React, { ReactNode } from "react";
import { Check } from "lucide-react";
import { Button } from "@/Components/ui/button";

export type PricingCardProps = {
  icon: ReactNode;
  title: string;
  text: string;
  price: string;
  priceYearly: string;
  yearly?: boolean;
  features: string[];
  buttonText: string;
  monthly?: boolean;
  buttonVariant?:
    | "ghost"
    | "default"
    | "destructive"
    | "outline"
    | "link"
    | "secondary";
};

const PricingCard = ({
  icon,
  title,
  text,
  price,
  priceYearly,
  features,
  buttonText,
  buttonVariant,
  monthly,
  yearly,
}: PricingCardProps) => {
  return (
    <div className=" border border-border rounded-md px-4 py-6 md:px-6 md:py-8 text-sm md:text-base group transition-color ease-in duration-200 group hover:border-primary/40 hover:bg-primary/5 shadow-xl shadow-primary/5">
      <div className=" border-b border-border pb-6 mb-6">
        <div className=" w-12 h-12 flex items-center justify-center bg-muted/30 rounded-md mb-10 text-primary group-hover:bg-muted/70 transition-color ease-in duration-200">
          {icon}
        </div>

        <h4 className=" text-lg md:text-xl font-medium mb-1 text-foreground/90">
          {title}
        </h4>
        <p className=" font-light text-foreground/70 mb-4">{text}</p>
        <h3 className=" text-3xl md:text-4xl font-semibold">
          {yearly ? priceYearly : price}{" "}
          {monthly && (
            <span className=" pl-1 text-sm font-light text-foreground/70">
              /month
            </span>
          )}
        </h3>
      </div>
      <div className=" flex flex-col gap-2 mb-6">
        {features.map((feature, index) => (
          <div className=" flex items-center gap-1 flex-wrap" key={index}>
            <Check className=" text-primary" />
            <span> {feature}</span>
          </div>
        ))}
      </div>
      <Button variant={buttonVariant} className=" w-full">
        {" "}
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
