import { useGetCurrentWeekGoalCompletion } from "@/hooks/store/progress-goal";
import { CircleCheck, XCircle } from "lucide-react";

export const WeeklyCompletion = () => {
    const completion = useGetCurrentWeekGoalCompletion();

    return (
        <div className="flex justify-center items-center gap-12">
            {completion.map((info) => (
                <div className="flex flex-col justify-center items-center" key={info.day}>
                    {info.goalReached ? (
                        <CircleCheck className="text-green-400" />
                    ) : (
                        <XCircle className="text-red-400" />
                    )}
                    {info.day}
                </div>
            ))}
        </div>
    );
};
