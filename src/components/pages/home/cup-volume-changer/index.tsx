import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "@/hooks/store";
import { setCupVolume } from "@/slices/cup-volume";
import { DialogDescription } from "@radix-ui/react-dialog";
import { GlassWater, RefreshCcw } from "lucide-react";

export default function CupVolumeChanger() {
    const cupVolume = useSelector((state) => state.cupVolume.value);

    const dispatch = useDispatch();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="hover:bg-blue-100 group transition-colors relative bg-white text-black flex items-center justify-center rounded-full h-14 w-14">
                    <GlassWater className="text-blue-500" />
                    <div className="absolute group-hover:bg-blue-100 transition-colors bottom-0 right-0 bg-white text-black flex items-center justify-center rounded-full h-5 w-5">
                        <RefreshCcw className="text-blue-500" />
                    </div>
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change cup Volume</DialogTitle>
                    <DialogDescription>
                        Change the volume of your cup to adjust the amount of water you drink.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Change cup volume"
                    type="number"
                    value={cupVolume}
                    onChange={(e) => dispatch(setCupVolume(Number(e.target.value) || 0))}
                />

                <DialogClose asChild>
                    <Button>Save</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
