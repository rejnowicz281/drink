import ProgressContainer from "@/components/pages/home/progress-container";
import TodayRecords from "@/components/pages/home/today-records";

export default function HomePage() {
    return (
        <div className="flex-1 flex flex-col gap-12">
            <ProgressContainer />
            <TodayRecords />
        </div>
    );
}
