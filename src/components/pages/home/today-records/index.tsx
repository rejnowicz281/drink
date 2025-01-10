import { useAppSelector } from "@/hooks/store";
import AddRecordDialog from "./add-record-dialog";
import RecordContainer from "./record-container";

export default function TodayRecords() {
    const records = useAppSelector((state) => state.records.value);

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
