import { Record as RecordType } from "@/lib/types";
import dayjs from "dayjs";
import { useSelector } from ".";
import { useGetMonthRecords, useGetTodayRecords } from "./records";

// Returns the total volume of water drank today
export const useGetTodayProgress = () => {
    const records = useGetTodayRecords();

    return records.reduce((acc, record) => acc + record.cupVolume, 0);
};

// Returns an array of objects with the day of a month and the percentage of the progress goal reached on that day, example:
// [
//     { day: "1", percentage: 50 }, (for example, 1300 ml drank of progress goal 2600 ml on the first day of the month)
//     { day: "2", percentage: 100 },
//     ...etc
// ]
export const useGetMonthProgressPercentages = (month: number, year: number) => {
    const records = useGetMonthRecords(month, year);
    const progressGoal = useSelector((state) => state.progressGoal.value);

    const daysInMonth = dayjs().month(month).daysInMonth();

    const recordsByDay = records.reduce((acc, record) => {
        const day = dayjs(record.time).date();

        if (!acc[day]) acc[day] = [];

        acc[day].push(record);
        return acc;
    }, {} as Record<number, RecordType[]>);

    return Array.from({ length: daysInMonth }).map((_, index) => {
        const day = index + 1;
        const recordsForDay = recordsByDay[day] || [];

        return {
            day: day.toString(),
            percentage: (recordsForDay.reduce((acc, record) => acc + record.cupVolume, 0) / progressGoal) * 100
        };
    });
};
