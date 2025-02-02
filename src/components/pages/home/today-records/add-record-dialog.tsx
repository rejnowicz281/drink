import RecordFormDialog from "@/components/records/record-form/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AddRecordDialog() {
    return (
        <RecordFormDialog
            today={true}
            dialogTrigger={
                <Button variant="ghost" size="icon">
                    <Plus />
                </Button>
            }
        />
    );
}
