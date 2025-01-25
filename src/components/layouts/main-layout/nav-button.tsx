import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export const NavButton = ({ path, children }: { path: string; children: ReactNode }) => {
    const { pathname } = useLocation();

    return (
        <Button
            variant="ghost"
            className={cn(
                pathname === path ? "border-b-2 border-b-white" : "text-gray-500",
                "py-8 font-semibold rounded-none flex-1 flex gap-1 items-center"
            )}
            asChild
        >
            <Link to={path}>{children}</Link>
        </Button>
    );
};
