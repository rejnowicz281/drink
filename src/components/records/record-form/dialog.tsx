import RecordForm from "@/components/records/record-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Record } from "@/lib/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";

interface RecordFormDialogProps {
    dialogTrigger: ReactNode;
    title?: string;
    description?: string;
    record?: Record;
    today?: boolean;
}

export default function RecordFormDialog({ dialogTrigger, title, description, record, today }: RecordFormDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title || (record ? "Edit record" : "Add record")}</DialogTitle>
                    <DialogDescription>
                        {description ||
                            (record
                                ? "Edit an existing record of drinking water"
                                : "Add a record of drinking water in the past that you forgot to confirm")}
                    </DialogDescription>
                </DialogHeader>
                <RecordForm
                    submitButtonClassName="self-end"
                    onSuccess={() => {
                        setOpen(false);
                    }}
                    record={record}
                    today={today}
                />
            </DialogContent>
        </Dialog>
    );
}
