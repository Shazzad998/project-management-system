
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

import { Card, CardContent } from "@/Components/ui/card"
import { ChartContainer } from "@/Components/ui/chart"

export default function ChartShow() {
  return (
    <Card className="max-w-xs">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Tasks</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              21/32
              <span className="text-sm font-normal text-muted-foreground">
                Completed
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            tasks: {
              label: "Tasks",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={[
              {
                activity: "tasks",
                value: (21 / 32) * 100,
                fill: "var(--color-tasks)",
              },
              
            ]}
            innerRadius="20%"
            barSize={24}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar dataKey="value" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
