import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer } from "@/Components/ui/chart";

type Props = {
    cardTitle: string;
    data: {
        label: string;
        value: number;
        total: number;
        color: string;
        type: string;
    }[];
    className?:string
};

const generateConfig = (data: Props["data"]) => {
    const result: Record<string, { label: string; color: string }> = {};
    data.forEach((item) => {
        result[item.type] = {
            label: item.label,
            color: item.color,
        };
    });
    return result;
};

const BarChartRadial = ({ cardTitle, data, className }: Props) => {
    const chartConfig = generateConfig(data);
    const chartData = data.map((item) => ({
        activity: item.type,
        value: (item.value / item.total) * 100,
        fill: `var(--color-${item.type})`,
    }));
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 justify-between">
                <div className="grid items-center gap-2">
                    {data.map((item) => (
                        <div key={item.type} className="grid flex-1 auto-rows-min gap-0.5">
                            <div className="text-sm text-muted-foreground">
                                {item.label}{" "}
                                <span
                                    className=" w-3 h-1 inline-block rounded"
                                    style={{ backgroundColor: item.color }}
                                ></span>
                            </div>
                            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                                {item.value}/{item.total}
                                <span className="text-sm font-normal text-muted-foreground">
                                    total
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <ChartContainer config={chartConfig} className="w-full">
                    <RadialBarChart
                        margin={{
                            left: -10,
                            right: -10,
                            top: -10,
                            bottom: -10,
                        }}
                        data={chartData}
                        innerRadius={data.length > 2 ? "20%" : "60%"}
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
                        <RadialBar
                            dataKey="value"
                            background
                            cornerRadius={5}
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default BarChartRadial;
