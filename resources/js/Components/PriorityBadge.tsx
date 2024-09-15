import { formatString } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

type Props = {
    priority: string;
};

function PriorityBadge({ priority }: Props) {
    const color =
            priority == "low"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            : priority == "medium"
            ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            : priority == "high"
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            : "bg-accent-bacground text-accent-foreground";
    return (
        <span
            className={twMerge(
                "text-xs px-2.5 py-0.5 rounded-full font-medium",
                color
            )}
        >
            {formatString(priority)}
        </span>
    );
}

export default PriorityBadge;
