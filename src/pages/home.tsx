import { ProgressContainer, TodayRecords } from "@/components/pages/home";

export function HomePage() {
    return (
        <div className="flex-1 flex flex-col gap-12">
            <ProgressContainer />
            <TodayRecords />
        </div>
    );
}
