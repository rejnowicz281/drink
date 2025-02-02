import { useDispatch, useSelector } from "@/hooks/store";
import { Record } from "@/lib/types";
import { addRecord, editRecord } from "@/slices/records";
import dayjs from "dayjs";
import { useState } from "react";
import uniqid from "uniqid";

export const useRecordForm = (record?: Record, onSuccess?: () => void, today?: boolean) => {
    const defaultCupVolume = useSelector((state) => state.cupVolume.value);

    const [time, setTime] = useState(
        record && today
            ? dayjs(record.time).format("HH:mm")
            : record && !today
            ? dayjs(record.time).format("YYYY-MM-DDTHH:mm")
            : !record && today
            ? dayjs().format("HH:mm")
            : !record && !today
            ? dayjs().format("YYYY-MM-DDTHH:mm")
            : ""
    );
    const [cupVolume, setCupVolume] = useState(record ? record.cupVolume : defaultCupVolume);

    const dispatch = useDispatch();

    const validation = time && typeof time === "string" && cupVolume && typeof cupVolume === "number" && cupVolume > 0;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => (record ? onSubmitEditRecord(e) : onSubmitAddRecord(e));

    const onSubmitAddRecord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validation) {
            onSuccess?.();

            const dateTime = today ? dayjs(`${dayjs().format("YYYY-MM-DD")} ${time}`).format("YYYY-MM-DDTHH:mm") : time;

            dispatch(addRecord({ id: uniqid(), time: dateTime, cupVolume: Number(cupVolume) }));
        }
    };

    const onSubmitEditRecord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (record && validation) {
            onSuccess?.();

            const dateTime = today ? dayjs(`${dayjs().format("YYYY-MM-DD")} ${time}`).format("YYYY-MM-DDTHH:mm") : time;

            dispatch(editRecord({ id: record.id, time: dateTime, cupVolume: Number(cupVolume) }));
        }
    };

    return {
        time,
        setTime,
        cupVolume,
        setCupVolume,
        onSubmit
    };
};
