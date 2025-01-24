import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "@/hooks/store";
import { setCupVolume } from "@/slices/cup-volume";

export default function CupVolumeContainer() {
    const cupVolume = useSelector((state) => state.cupVolume.value);

    const dispatch = useDispatch();

    return (
        <Input
            placeholder="Change cup volume"
            value={cupVolume}
            onChange={(e) => dispatch(setCupVolume(Number(e.target.value) || 0))}
        />
    );
}
