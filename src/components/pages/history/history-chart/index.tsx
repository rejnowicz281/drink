import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { Chart } from "./components/chart";
import { useHistoryChart } from "./use-history-chart";

export function HistoryChart() {
    const {
        isMonthMode,
        month,
        year,
        toggleChartMode,
        setMonthHandler,
        setYearHandler,
        monthProgressData,
        yearProgressData
    } = useHistoryChart();

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
                    {isMonthMode && `${dayjs().month(month).format("MMMM")}, `}
                    {year}
                </span>
                <Button
                    onClick={() => {
                        if (isMonthMode) setMonthHandler(month + 1);
                        else setYearHandler(year + 1);
                    }}
                >
                    Next {isMonthMode ? "Month" : "Year"}
                </Button>
            </div>
            <Chart
                data={isMonthMode ? monthProgressData : yearProgressData}
                month={month}
                year={year}
                isMonthMode={isMonthMode}
            />
        </>
    );
}
