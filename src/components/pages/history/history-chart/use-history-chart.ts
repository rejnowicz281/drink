import { useGetMonthProgressPercentages, useGetYearProgressPercentages } from "@/hooks/store/progress-goal";
import dayjs from "dayjs";
import { useState } from "react";

export const useHistoryChart = () => {
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

    return {
        month,
        year,
        isMonthMode,
        toggleChartMode,
        monthProgressData,
        yearProgressData,
        setMonthHandler,
        setYearHandler
    };
};
