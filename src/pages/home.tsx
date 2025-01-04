import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/store";
import { addRecord, removeRecord } from "@/slices/records";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

export default function HomePage() {
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
                            time: new Date().toISOString(),
                            cupVolume
                        })
                    );
                }}
            >
                drink ({cupVolume} ml)
            </Button>
            <div>
                <h2>today's records</h2>
                <ul>
                    {records.map((record) => (
                        <li key={record.id}>
                            {new Date(record.time).toLocaleTimeString()} - {record.cupVolume} ml
                            <Button
                                onClick={() => {
                                    dispatch(removeRecord(record.id));
                                }}
                                variant="destructive"
                            >
                                delete
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
