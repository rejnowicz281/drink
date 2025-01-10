import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { addRecord } from "@/slices/records";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useState } from "react";
import uniqid from "uniqid";

export default function AddRecordForm({ onSuccess }: { onSuccess?: () => void }) {
    const defaultCupVolume = useAppSelector((state) => state.cupVolume.value);

    const [time, setTime] = useState<dayjs.Dayjs | null>(dayjs());
    const [cupVolume, setCupVolume] = useState<number | string>(defaultCupVolume || "");

    const dispatch = useAppDispatch();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                console.log(time, cupVolume);

                if (time && time.isValid() && cupVolume) {
                    onSuccess && onSuccess();
                    dispatch(addRecord({ id: uniqid(), time: time.toISOString(), cupVolume: Number(cupVolume) }));
                    setTime(dayjs());
                    setCupVolume(0);
                }
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    disableOpenPicker
                    className="bg-white"
                    onChange={(value) => {
                        setTime(value);
                        console.log(value);
                    }}
                    value={time}
                />
            </LocalizationProvider>
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
