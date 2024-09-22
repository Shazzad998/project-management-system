
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "./input"
import { Button } from "./button"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  filters ?: {
    title:string,
    value:string,
    options:{
      label:string,
      value:string,
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[],
  globalFilter:string
  setGlobalFilter:(value:string)=>void
}

export function DataTableToolbar<TData>({
  table,
  filters,
  globalFilter,
  setGlobalFilter
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      <Input
          placeholder='Search...'
          value={globalFilter ?? ""} 
          onChange={(event) => setGlobalFilter(event.target.value)}  
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters?.map((filter) => {
          if(table.getColumn(filter.value)){
            return <DataTableFacetedFilter key={filter.value}
            column={table.getColumn(filter.value)}
            title={filter.title}
            options={filter.options}
          />
          }
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
