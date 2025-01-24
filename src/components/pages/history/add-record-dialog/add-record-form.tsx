import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "@/hooks/store";
import { addRecord } from "@/slices/records";
import dayjs from "dayjs";
import { useState } from "react";
import uniqid from "uniqid";

export default function AddRecordForm({ onSuccess }: { onSuccess?: () => void }) {
    const defaultCupVolume = useSelector((state) => state.cupVolume.value);

    const [time, setTime] = useState<dayjs.Dayjs | null>(dayjs());
    const [cupVolume, setCupVolume] = useState<number | string>(defaultCupVolume || "");

    const dispatch = useDispatch();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (time && time.isValid() && cupVolume && typeof cupVolume === "number" && cupVolume > 0) {
                    onSuccess?.();
                    dispatch(addRecord({ id: uniqid(), time: time.toISOString(), cupVolume: Number(cupVolume) }));

                    setTime(dayjs());
                    setCupVolume(0);
                }
            }}
        >
            <Input type="datetime-local" onChange={(e) => setTime(dayjs(e.target.value))} />
            <div>
                <Label>Cup Volume (ml)</Label>
                <Input
                    type="number"
                    value={cupVolume}
                    onChange={(e) => {
                        const value = e.target.valueAsNumber;

                        if (!value) setCupVolume("");
                        else setCupVolume(value);
                    }}
                />
            </div>

            <Button type="submit">Add Record</Button>
        </form>
    );
}
