import { Input } from "@/Components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/Components/ui/separator";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/Components/ui/command";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, CheckIcon, FileQuestionIcon, TimerIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { formatString } from "@/lib/utils";

type Props = {
    queryParam: {
        name?:string,
        status?:string[]
    };
};

const projectStatuses = [
    {
        name: "pending",
        label: "Pending",
        icon: (
            <FileQuestionIcon className="mr-2 h-4 w-4 text-muted-foreground" />
        ),
    },
    {
        name: "in_progress",
        label: "In Progress",
        icon: <TimerIcon className="mr-2 h-4 w-4 text-muted-foreground" />,
    },
    {
        name: "completed",
        label: "Completed",
        icon: <Check className="mr-2 h-4 w-4 text-muted-foreground" />,
    },
];

const Filters = ({ queryParam }: Props) => {

    const [selectedStatus, setSelectedStatus] = useState(queryParam.status?? []);
    const [searchQuery, setSearchQuery] = useState(queryParam.name);
    const updateSelectedStatus = (item: string) => {
        const isSelected = selectedStatus.includes(item);
        let updatedStatus;
        if (isSelected) {
            updatedStatus = selectedStatus.filter((stat) => stat !== item);
        } else {
            updatedStatus = [...selectedStatus, item];
        }
        setSelectedStatus(updatedStatus);
        router.get(route('projects.index'), {...queryParam, status:updatedStatus})
    };

    return (
        <div className=" flex mb-3 gap-3 items-center">
            <Input className=" max-w-xs h-8" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-dashed"
                    >
                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                        Status
                        {selectedStatus.length > 0 && (
                            <>
                                <Separator
                                    orientation="vertical"
                                    className="mx-2 h-4"
                                />
                                <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal lg:hidden"
                                >
                                    {selectedStatus.length}
                                </Badge>
                                <div className="hidden space-x-1 lg:flex">
                                    {selectedStatus.length > 2 ? (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            {selectedStatus.length} selected
                                        </Badge>
                                    ) : (
                                        Array.from(selectedStatus).map(
                                            (selected_stat) => (
                                                <Badge
                                                    variant="secondary"
                                                    key={selected_stat}
                                                    className="rounded-sm px-1 font-normal"
                                                >
                                                    {formatString(selected_stat)}
                                                </Badge>
                                            )
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Status" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {projectStatuses.map((status) => {
                                    return (
                                        <CommandItem
                                            key={status.name}
                                            onSelect={() =>
                                                updateSelectedStatus(
                                                    status.name
                                                )
                                            }
                                        >
                                            <div
                                                className={twMerge(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    selectedStatus.includes(
                                                        status.name
                                                    )
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible"
                                                )}
                                            >
                                                <CheckIcon className="h-4 w-4" />
                                            </div>

                                            {status.icon}

                                            <span>{status.label}</span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Filters;
