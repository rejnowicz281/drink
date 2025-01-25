import { useSelector } from "@/hooks/store";
import { useGetTodayProgress } from "@/hooks/store/progress-goal";
import { addRecord } from "@/slices/records";
import dayjs from "dayjs";
import { ArrowUp, GlassWater } from "lucide-react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";
import CupVolumeChanger from "../cup-volume-changer";

export default function ProgressContainer() {
    const progress = useGetTodayProgress();

    const progressGoal = useSelector((state) => state.progressGoal.value);
    const cupVolume = useSelector((state) => state.cupVolume.value);

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
            <div className="relative">
                <div className="relative overflow-hidden flex flex-col items-center justify-center rounded-full gap-3 text-black bg-white h-[500px] w-[500px]">
                    <div className="flex-[7] gap-5 flex flex-col items-center justify-end">
                        <div className="text-6xl">
                            <span className="text-blue-400">{progress}</span> / <span>{progressGoal} ml</span>
                        </div>
                        <div className="text-2xl font-semibold">Daily Drink Target</div>
                    </div>
                    <button
                        onClick={drink}
                        className="peer flex-[4] cursor-pointer gap-4 flex flex-col justify-end items-center z-10"
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
                        className="peer peer-hover:bg-blue-100 bg-blue-200 hover:bg-blue-100 cursor-pointer transition-colors z-0 absolute bottom-[-33%] h-[320px] w-[300px] rounded-t-[50%]"
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
