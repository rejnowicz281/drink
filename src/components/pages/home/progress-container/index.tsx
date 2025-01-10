import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/store";
import { addRecord } from "@/slices/records";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

export default function ProgressContainer() {
    const records = useAppSelector((state) => state.records.value);

    const progress = records.reduce((acc, record) => acc + record.cupVolume, 0);

    const progressGoal = useAppSelector((state) => state.progressGoal.value);
    const cupVolume = useAppSelector((state) => state.cupVolume.value);

    const dispatch = useDispatch();

    return (
        <>
            <div>
                <h1>
                    progress{" "}
                    {progress >= progressGoal
                        ? "goal reached! congrats!"
                        : `(${Math.round((progress / progressGoal) * 100)}%)`}
                </h1>
                <div>
                    {progress} / {progressGoal} ml
                </div>
            </div>
            <Button
                onClick={() => {
                    dispatch(
                        addRecord({
                            id: uniqid(),
                            time: dayjs().toISOString(),
                            cupVolume
                        })
                    );
                }}
            >
                drink ({cupVolume} ml)
            </Button>
        </>
    );
}
