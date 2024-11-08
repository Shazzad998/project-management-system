import { XIcon } from "lucide-react";
import React, { useState } from "react";

type AlertSectionProps = {};

const AlertSection = (props: AlertSectionProps) => {
    const [showAlert, setShowAlert] = useState(true);

    if (showAlert) {
        return (
            <div className=" bg-primary font-medium text-primary-foreground block p-2 text-sm rounded-md relative mx-4">
                <p className="pr-6 md:pr-0 text-center">
                    {" "}
                    We&apos;ve raised a $23.5m Series led by Redpoint Ventures!{" "}
                    <a href="" className=" underline">
                        Read More
                    </a>
                </p>

                <button
                    onClick={() => setShowAlert(false)}
                    className=" p-1 absolute right-2 top-1/2 -translate-y-1/2 group"
                >
                    <XIcon className=" transition-all duration-200 w-4 h-4 group-hover:scale-125" />
                </button>
            </div>
        );
    } else {
        return null;
    }
};

export default AlertSection;
