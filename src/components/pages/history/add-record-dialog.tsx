import RecordFormDialog from "@/components/records/record-form/dialog";
import { Button } from "@/components/ui/button";

export const AddRecordDialog = () => {
    return <RecordFormDialog dialogTrigger={<Button variant="outline">Add Record</Button>} />;
};
