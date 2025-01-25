import { BrokenHeart } from "@/components/icons/broken-heart";
import { WaterDroplet } from "@/components/icons/water-droplet";
import CupVolumeContainer from "@/components/pages/home/cup-volume-container";
import ProgressContainer from "@/components/pages/home/progress-container";
import TodayRecords from "@/components/pages/home/today-records";

export default function HomePage() {
    return (
        <>
            <ProgressContainer />
            <CupVolumeContainer />
            <TodayRecords />
            <BrokenHeart />
            <WaterDroplet />
        </>
    );
}
