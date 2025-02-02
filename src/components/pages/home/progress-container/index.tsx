import { useSelector } from "@/hooks/store";
import { useGetTodayProgress } from "@/hooks/store/progress-goal";
import { cn } from "@/lib/utils";
import { addRecord } from "@/slices/records";
import dayjs from "dayjs";
import { ArrowUp, GlassWater, HeartCrack, PartyPopper } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useDispatch } from "react-redux";
import SlotCounter from "react-slot-counter";
import uniqid from "uniqid";
import { CupVolumeChanger } from "../cup-volume-changer";

export function ProgressContainer() {
    const progress = useGetTodayProgress();

    const progressGoal = useSelector((state) => state.progressGoal.value);
    const cupVolume = useSelector((state) => state.cupVolume.value);

    const processPercentage = Math.round((progress / progressGoal) * 100);

    const goalReached = progress >= progressGoal;

    const dispatch = useDispatch();

    const drink = () => {
        if (cupVolume && typeof cupVolume === "number" && cupVolume > 0)
            dispatch(
                addRecord({
                    id: uniqid(),
                    time: dayjs().toISOString(),
                    cupVolume
                })
            );
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative pt-12">
                <CircularProgressbarWithChildren
                    className="absolute top-[-60px] right-[-52px] w-[600px] -rotate-90"
                    circleRatio={0.5}
                    strokeWidth={3}
                    value={processPercentage}
                ></CircularProgressbarWithChildren>
                <div className="absolute inset-[-60px] pt-16 flex flex-col gap-3">
                    <div className="flex-1"></div>
                    <div className="flex-1 flex justify-between">
                        <HeartCrack
                            size="40"
                            className={cn(processPercentage === 0 ? "text-gray-500" : "text-blue-300")}
                        />
                        <PartyPopper size="40" className={cn(goalReached ? "text-blue-300" : "text-gray-500")} />
                    </div>
                </div>
                <div className="z-20 relative overflow-hidden flex flex-col items-center justify-center rounded-full gap-3 text-black bg-white h-[500px] w-[500px]">
                    <div className="flex-[7] gap-5 flex flex-col items-center justify-end">
                        <div className="text-6xl flex items-end gap-3">
                            <SlotCounter value={progress} duration={0.4} charClassName="text-blue-400" />
                            <div>/</div>
                            <div>{progressGoal} ml</div>
                        </div>
                        <div className="text-2xl font-semibold">Daily Drink Target</div>
                    </div>
                    <button
                        onClick={drink}
                        className="peer flex-[4] cursor-pointer gap-4 flex flex-col justify-end items-center z-20"
                    >
                        <div className="font-semibold text-xl">{cupVolume} ml</div>
                        <GlassWater
                            className="hover:fill-blue-300 fill-blue-400 transition-all"
                            strokeWidth="1"
                            size="70"
                        />
                    </button>
                    <button
                        onClick={drink}
                        className="peer peer-hover:bg-blue-100 bg-blue-200 hover:bg-blue-100 cursor-pointer transition-colors absolute bottom-[-33%] h-[320px] w-[300px] rounded-t-[50%]"
                    ></button>
                </div>
                <div className="absolute right-0 bottom-0">
                    <CupVolumeChanger />
                </div>
            </div>
            <div className="mt-4 flex flex-col items-center">
                <ArrowUp className="text-blue-400" strokeWidth="4" />
                <div className="text-sm font-semibold">Confirm that you have just drunk water</div>
            </div>
        </div>
    );
}
