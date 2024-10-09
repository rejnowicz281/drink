import { Button } from "@/components/ui/button";
import { useState } from "react";
import uniqid from "uniqid";

export default function HomePage() {
    const [cupVolume, setCupVolume] = useState(300); // ml
    const [progressGoal, setProgressGoal] = useState(2700); // ml
    const [records, setRecords] = useState([
        {
            id: uniqid(),
            time: new Date(),
            cupVolume: 300
        }
    ]);

    const progress = records.reduce((acc, record) => acc + record.cupVolume, 0);

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
                    setRecords([
                        ...records,
                        {
                            id: uniqid(),
                            time: new Date(),
                            cupVolume
                        }
                    ]);
                }}
            >
                drink ({cupVolume} ml)
            </Button>
            <Button>cup type</Button>
            <Button>add record</Button>
            <div>
                <h2>today's records</h2>
                <ul>
                    {records.map((record) => (
                        <li key={record.id}>
                            {record.time.toLocaleTimeString()} - {record.cupVolume} ml
                            <Button
                                onClick={() => {
                                    setRecords(records.filter((r) => r.id !== record.id));
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
