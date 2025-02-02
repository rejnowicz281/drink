import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddRecordForm from "./add-record-form";

export default function AddRecordDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Plus />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Record</DialogTitle>
                    <DialogDescription>
                        Add a record of drinking water in the past that you forgot to confirm
                    </DialogDescription>
                </DialogHeader>
                <AddRecordForm submitButtonClassName="self-end" onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
