import { useGetTodayRecords } from "@/hooks/store/records";
import AddRecordDialog from "./add-record-dialog";
import RecordContainer from "./record-container";

export default function TodayRecords() {
    const records = useGetTodayRecords();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center font-semibold gap-2">
                <div className="text-lg">Today's Records </div>
                <AddRecordDialog />
            </div>

            <div className="bg-zinc-800 flex flex-col p-6">
                {records.length ? (
                    records.map((record) => <RecordContainer key={record.id} record={record} />)
                ) : (
                    <div className="font-semibold">No records for today. Click the button above to add one.</div>
                )}
            </div>
        </div>
    );
}
