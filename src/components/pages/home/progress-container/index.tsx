import { Button } from "@/components/ui/button";
import { useSelector } from "@/hooks/store";
import { useGetTodayProgress } from "@/hooks/store/progress-goal";
import { addRecord } from "@/slices/records";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

export default function ProgressContainer() {
    const progress = useGetTodayProgress();

    const progressGoal = useSelector((state) => state.progressGoal.value);
    const cupVolume = useSelector((state) => state.cupVolume.value);

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
                    if (cupVolume && typeof cupVolume === "number" && cupVolume > 0)
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
