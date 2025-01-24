import { Button } from "@/components/ui/button";
import { useDispatch } from "@/hooks/store";
import { Record } from "@/lib/types";
import { removeRecord } from "@/slices/records";
import dayjs from "dayjs";

export default function RecordContainer({ record }: { record: Record }) {
    const dispatch = useDispatch();

    return (
        <div>
            {dayjs(record.time).toString()} - {record.cupVolume} ml
            <Button onClick={() => dispatch(removeRecord(record.id))} variant="destructive">
                Delete
            </Button>
        </div>
    );
}
