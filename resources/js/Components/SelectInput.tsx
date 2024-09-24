import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type SelectInputProps = {
    options: SelectOption[];
    selectedValue: SelectOption | null | undefined;
    setSelectedValue: (value: SelectOption | null) => void;
    placeholder?: string;
    className?:string
};

export function SelectInput({
    options,
    selectedValue,
    setSelectedValue,
    placeholder = "",
    className
}: SelectInputProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-between", className)}>
                    {selectedValue ? (
                        <>{selectedValue.label}</>
                    ) : (
                        <span className="text-muted-foreground">{placeholder}</span>
                    )}
                     <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(value) => {
                                        setSelectedValue(
                                            options.find(
                                                (opt) => opt.value === value
                                            ) || null
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
