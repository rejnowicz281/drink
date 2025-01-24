import { useGetTodayRecords } from "@/hooks/store/records";
import AddRecordDialog from "./add-record-dialog";
import RecordContainer from "./record-container";

export default function TodayRecords() {
    const records = useGetTodayRecords();

    return (
        <>
            <h2>today's records</h2>
            <AddRecordDialog />
            {records.map((record) => (
                <RecordContainer key={record.id} record={record} />
            ))}
        </>
    );
}
