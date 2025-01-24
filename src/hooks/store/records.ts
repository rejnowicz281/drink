import dayjs from "dayjs";
import { useSelector } from ".";

// Returns an array of records that were added today
export const useGetTodayRecords = () => {
    const records = useSelector((state) => state.records.value);

    return records.filter((record) => {
        const today = dayjs().format("YYYY-MM-DD");

        return dayjs(record.time).format("YYYY-MM-DD") === today;
    });
};

// Returns an array of records that were added in the specified month and year
export const useGetMonthRecords = (month: number, year: number) => {
    const records = useSelector((state) => state.records.value);

    return records.filter((record) => {
        const recordDate = dayjs(record.time);

        return recordDate.month() === month && recordDate.year() === year;
    });
};
