import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Record } from "@/lib/types";
import { useRecordForm } from "./use-record-form";

export interface RecordFormProps {
    onSuccess?: () => void;
    submitButtonClassName?: string;
    record?: Record;
    today?: boolean;
}

export default function RecordForm({ onSuccess, submitButtonClassName, record, today }: RecordFormProps) {
    const { onSubmit, time, setTime, cupVolume, setCupVolume } = useRecordForm(record, onSuccess, today);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <Input
                label="Time"
                id="time"
                type={today ? "time" : "datetime-local"}
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <Input
                label="Cup volume (ml)"
                id="volume"
                type="number"
                value={cupVolume}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCupVolume(e.target.valueAsNumber)}
            />

            <Button className={submitButtonClassName} type="submit">
                {record ? "Edit record" : "Add record"}
            </Button>
        </form>
    );
}
