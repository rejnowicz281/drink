import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/store";
import { Record } from "@/lib/types";
import { removeRecord } from "@/slices/records";

export default function RecordContainer({ record }: { record: Record }) {
    const dispatch = useAppDispatch();

    return (
        <div>
            {new Date(record.time).toLocaleTimeString()} - {record.cupVolume} ml
            <Button onClick={() => dispatch(removeRecord(record.id))} variant="destructive">
                delete
            </Button>
        </div>
    );
}
