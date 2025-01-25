import AddRecordDialog from "@/components/pages/history/add-record-dialog";
import HistoryChart from "@/components/pages/history/history-chart";
import { WeeklyCompletion } from "@/components/pages/history/weekly-completion";

export default function HistoryPage() {
    return (
        <>
            <AddRecordDialog />
            <HistoryChart />
            <WeeklyCompletion />
        </>
    );
}
