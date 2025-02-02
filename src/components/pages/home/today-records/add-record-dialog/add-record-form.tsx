import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "@/hooks/store";
import { addRecord } from "@/slices/records";
import dayjs from "dayjs";
import { useState } from "react";
import uniqid from "uniqid";

export default function AddRecordForm({
    onSuccess,
    submitButtonClassName
}: {
    onSuccess?: () => void;
    submitButtonClassName?: string;
}) {
    const defaultCupVolume = useSelector((state) => state.cupVolume.value);

    const [time, setTime] = useState<string | undefined>(dayjs().format("HH:mm"));
    const [cupVolume, setCupVolume] = useState<number | undefined>(defaultCupVolume || undefined);

    const dispatch = useDispatch();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (time && cupVolume && typeof cupVolume === "number" && cupVolume > 0) {
                    onSuccess?.();

                    const today = dayjs().format("YYYY-MM-DD");

                    const dateTime = dayjs(`${today} ${time}`).toISOString();

                    dispatch(addRecord({ id: uniqid(), time: dateTime, cupVolume: Number(cupVolume) }));
                }
            }}
            className="flex flex-col gap-6"
        >
            <Input label="Time" id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />

            <Input
                label="Cup volume (ml)"
                id="volume"
                type="number"
                value={cupVolume}
                onChange={(e) => setCupVolume(e.target.valueAsNumber)}
            />

            <Button className={submitButtonClassName} type="submit">
                Add Record
            </Button>
        </form>
    );
}
