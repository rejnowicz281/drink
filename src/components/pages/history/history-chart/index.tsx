import { Button } from "@/components/ui/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useGetMonthProgressPercentages, useGetYearProgressPercentages } from "@/hooks/store/progress-goal";
import dayjs from "dayjs";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const chartConfig = {
    percentage: {
        label: "Percentage",
        color: "#2563eb"
    }
} satisfies ChartConfig;

export default function HistoryChart() {
    const [chartMode, setChartMode] = useState<"byMonth" | "byYear">("byMonth");

    const toggleChartMode = () => {
        setChartMode((prev) => (prev === "byMonth" ? "byYear" : "byMonth"));
    };

    const isMonthMode = chartMode === "byMonth";

    const [{ month, year }, setDate] = useState({
        month: dayjs().month(),
        year: dayjs().year()
    });

    const setMonthHandler = (month: number) => {
        if (month < 0) {
            setDate({
                month: 11,
                year: year - 1
            });
        } else if (month > 11) {
            setDate({
                month: 0,
                year: year + 1
            });
        } else {
            setDate({
                month,
                year
            });
        }
    };

    const setYearHandler = (year: number) => {
        setDate({
            month,
            year
        });
    };

    const monthProgressData = useGetMonthProgressPercentages(month, year);
    const yearProgressData = useGetYearProgressPercentages(year);

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
        <>
            <div className="flex flex-col items-start">
                <Button onClick={toggleChartMode}>{isMonthMode ? "Show by Year" : "Show by Month"}</Button>
                <Button
                    onClick={() => {
                        if (isMonthMode) setMonthHandler(month - 1);
                        else setYearHandler(year - 1);
                    }}
                >
                    Previous {isMonthMode ? "Month" : "Year"}
                </Button>
                <span>
                    {chartMode === "byMonth" && `${dayjs().month(month).format("MMMM")}, `}
                    {year}
                </span>
                <Button
                    onClick={() => {
                        if (chartMode === "byMonth") setMonthHandler(month + 1);
                        else setYearHandler(year + 1);
                    }}
                >
                    Next {isMonthMode ? "Month" : "Year"}
                </Button>
            </div>
            <ChartContainer config={chartConfig} className="max-h-[500px] overflow-hidden flex-1">
                <BarChart accessibilityLayer data={isMonthMode ? monthProgressData : yearProgressData}>
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
        </>
    );
}
