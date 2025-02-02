import RecordFormDialog from "@/components/records/record-form/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "@/hooks/store";
import { Record } from "@/lib/types";
import { removeRecord } from "@/slices/records";
import dayjs from "dayjs";
import { Edit, GlassWater, Trash } from "lucide-react";

export default function RecordContainer({ record }: { record: Record }) {
    const dispatch = useDispatch();

    return (
        <div className="hover:bg-zinc-900 flex justify-between items-center gap-6 p-2">
            <GlassWater className="fill-blue-500" strokeWidth={1} />
            <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col font-semibold">
                    <div>{dayjs(record.time).format("hh:mm A")}</div>
                    <div className="text-sm text-gray-400">{record.cupVolume} ml</div>
                </div>

                <div className="flex gap-2 items-center">
                    <RecordFormDialog
                        record={record}
                        dialogTrigger={
                            <Button className="hover:bg-zinc-700" size="icon" variant="ghost">
                                <Edit className="text-gray-500" />
                            </Button>
                        }
                        today={true}
                    />
                    <Button
                        className="hover:bg-zinc-700"
                        size="icon"
                        variant="ghost"
                        onClick={() => dispatch(removeRecord(record.id))}
                    >
                        <Trash className="text-gray-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
