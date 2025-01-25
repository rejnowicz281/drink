import { GlassWater, History, Settings } from "lucide-react";
import { ReactNode } from "react";
import { NavButton } from "./nav-button";

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex">
                <NavButton path="/">
                    <GlassWater />
                    Home
                </NavButton>
                <NavButton path="/history">
                    <History />
                    History
                </NavButton>
                <NavButton path="/settings">
                    <Settings />
                    Settings
                </NavButton>
            </div>
            <div className="flex-1 flex flex-col p-12">{children}</div>
        </div>
    );
};
