import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Button
            variant="outline"
            onClick={() => {
                if (theme === "light") setTheme("dark");
                else setTheme("light");
            }}
        >
            {theme === "light" ? <Sun /> : <MoonStar />}
        </Button>
    );
}
