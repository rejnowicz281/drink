import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import dayjs from "dayjs";
import { Bar, BarChart, CartesianGrid, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const chartConfig = {
    percentage: {
        label: "Percentage",
        color: "#2563eb"
    }
} satisfies ChartConfig;

export const Chart = ({
    data,
    month,
    year,
    isMonthMode
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any[];
    month: number;
    year: number;
    isMonthMode: boolean;
}) => {
    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 border border-gray-200 p-2 rounded-lg">
                    {(isMonthMode && (
                        <p>
                            <b>
                                {dayjs().month(month).format("MMMM")} {label}, {year}
                            </b>{" "}
                            : Reached <b>{payload[0].value} %</b> of the progress goal
                        </p>
                    )) || (
                        <p>
                            <b>{label}</b> : Reached <b>{payload[0].value} %</b> of the progress goal
                        </p>
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <ChartContainer config={chartConfig} className="max-h-[500px] overflow-hidden flex-1">
            <BarChart accessibilityLayer data={data}>
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid />
                <XAxis
                    dataKey={isMonthMode ? "day" : "month"}
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    interval={1}
                />
                <YAxis
                    allowDataOverflow={true}
                    label={{ value: "(%)", position: "insideTopLeft", offset: 0 }}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={true}
                    type="number"
                    domain={[0, 100]}
                />
                <Bar dataKey="percentage" fill="var(--color-percentage)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
};
