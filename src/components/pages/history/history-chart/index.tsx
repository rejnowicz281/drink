import { Button } from "@/components/ui/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useGetMonthProgressPercentages } from "@/hooks/store/progress-goal";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const chartConfig = {
    percentage: {
        label: "Percentage",
        color: "#2563eb"
    }
} satisfies ChartConfig;

export default function HistoryChart() {
    const year = useRef(dayjs().year());
    const [month, setMonth] = useState(dayjs().month());

    const setMonthHandler = (month: number) => {
        if (month < 0) {
            setMonth(11);
            year.current = year.current - 1;
        } else if (month > 11) {
            setMonth(0);
            year.current = year.current + 1;
        } else {
            setMonth(month);
        }
    };

    const progressData = useGetMonthProgressPercentages(month, year.current);

    return (
        <>
            <div className="flex flex-col items-start">
                <Button onClick={() => setMonthHandler(month - 1)}>Previous Month</Button>
                <span>
                    {dayjs().month(month).format("MMMM")}, {year.current}
                </span>
                <Button onClick={() => setMonthHandler(month + 1)}>Next Month</Button>
            </div>
            <ChartContainer config={chartConfig} className="min-h-[200px] max-w-[500px] w-full">
                <BarChart accessibilityLayer data={progressData}>
                    <Tooltip />
                    <CartesianGrid />
                    <XAxis dataKey="day" tickLine={true} tickMargin={10} axisLine={true} interval={1} />
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
