import { formatString } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

type Props = {
    status: string;
};

function StatusBadge({ status }: Props) {
    const color =
        status == "in_progress"
            ? "bg-primary text-primary-foreground"
            : status == "pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            : status == "completed"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    return (
        <span
            className={twMerge(
                "text-xs px-2.5 py-0.5 rounded font-medium",
                color
            )}
        >
            {formatString(status)}
        </span>
    );
}

export default StatusBadge;
