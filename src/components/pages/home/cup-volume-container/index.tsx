import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setCupVolume } from "@/slices/cup-volume";

export default function CupVolumeContainer() {
    const cupVolume = useAppSelector((state) => state.cupVolume.value);

    const dispatch = useAppDispatch();

    return (
        <Input
            placeholder="Change cup volume"
            value={cupVolume}
            onChange={(e) => dispatch(setCupVolume(Number(e.target.value) || 0))}
        />
    );
}
