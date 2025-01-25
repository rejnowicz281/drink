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

    const daysInMonth = dayjs().year(year).month(month).daysInMonth();

    const recordsByDay = new Array(daysInMonth).fill(0);

    for (const record of records) {
        const recordDate = dayjs(record.time);
        const dayIndex = recordDate.date() - 1;
        recordsByDay[dayIndex] += record.cupVolume;
    }

    // Build the final percentages array
    return recordsByDay.map((totalVolume, index) => ({
        day: (index + 1).toString(),
        percentage: Math.round((totalVolume / progressGoal) * 100)
    }));
};

export const useGetYearProgressPercentages = (year: number) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return months.map((month, index) => {
        const progressPercentages = useGetMonthProgressPercentages(index, year);
        const totalPercentage = progressPercentages.reduce((acc, { percentage }) => acc + percentage, 0);
        const averagePercentage = totalPercentage / progressPercentages.length;

        return {
            month,
            percentage: Math.round(averagePercentage)
        };
    });
};

// Returns an array of objects with the day of the week and a boolean indicating if the progress goal was reached on that day,
// example:
// [
//     { day: "Sunday", goalReached: true },
//     { day: "Monday", goalReached: false },
//     ...etc
// ]
export const useGetCurrentWeekGoalCompletion = () => {
    const startOfWeek = dayjs().startOf("week");
    const progressGoal = useSelector((state) => state.progressGoal.value);
    const records = useSelector((state) => state.records.value);

    const weekProgress = Array.from({ length: 7 }, (_, index) => ({
        day: startOfWeek.add(index, "day").format("dddd"),
        goalReached: false
    }));

    const dayProgress = new Array(7).fill(0);

    for (const record of records) {
        const recordDayIndex = dayjs(record.time).diff(startOfWeek, "days");

        if (recordDayIndex >= 0 && recordDayIndex < 7) dayProgress[recordDayIndex] += record.cupVolume;
    }

    for (let i = 0; i < 7; i++) weekProgress[i].goalReached = dayProgress[i] >= progressGoal;

    return weekProgress;
};
