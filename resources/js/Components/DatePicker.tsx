import * as React from "react"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"

type DatePickerProps ={
    className?:string
    placeholder?:string
    selected:Date|undefined
    onSelect:SelectSingleEventHandler | undefined
    fromYear?:number
    toYear?:number
}

export function DatePicker({className, placeholder, selected, onSelect, fromYear=1950, toYear=2050}:DatePickerProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[240px] justify-start text-left font-normal", !selected && "text-muted-foreground",className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selected}
          onSelect={onSelect}
          fromYear={fromYear}
          toYear={toYear}
        />
      </PopoverContent>
    </Popover>
  )
}