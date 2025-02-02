import { AddRecordDialog, HistoryChart, WeeklyCompletion } from "@/components/pages/history";

export function HistoryPage() {
    return (
        <>
            <AddRecordDialog />
            <HistoryChart />
            <WeeklyCompletion />
        </>
    );
}
