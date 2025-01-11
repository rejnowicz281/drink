import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useAppSelector } from "@/hooks/store";
import dayjs from "dayjs";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "../../../ui/button";

const chartConfig = {
    percentage: {
        label: "Percentage",
        color: "#2563eb"
    }
} satisfies ChartConfig;

export default function HistoryChart() {
    const [year, setYear] = useState(dayjs().year());

    const records = useAppSelector((state) => state.records.value);
    const progressGoal = useAppSelector((state) => state.progressGoal.value);

    const chartData = records
        .filter((record) => dayjs(record.time).year() === year)
        .reduce((acc, record) => {
            const month = record.time.slice(0, 7);
            const monthData = acc.find((data) => data.month === month);

            if (monthData) {
                monthData.volume += record.cupVolume;
            } else {
                acc.push({
                    month,
                    volume: record.cupVolume
                });
            }

            return acc;
        }, [] as { month: string; volume: number }[])
        .map((data) => ({
            month: data.month,
            percentage: (data.volume / progressGoal) * 100
        }));

    return (
        <>
            <div className="flex flex-col items-start">
                {JSON.stringify(chartData)}
                <Button onClick={() => setYear(year - 1)}>Previous Year</Button>
                <span>{year}</span>
                <Button onClick={() => setYear(year + 1)}>Next Year</Button>
            </div>
            <ChartContainer config={chartConfig} className="min-h-[200px] max-w-[500px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid />
                    <XAxis dataKey="month" tickLine={true} tickMargin={10} axisLine={true} />
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
