import React from "react";
import Typography from "./Typography";
import { twMerge } from "tailwind-merge";

interface StationEmblemProps {
    color: string;
    code: string;
    className?: string;
    size?: "sm" | "md";
}

const StationEmblem = ({ color, code, className, size = "md" }: StationEmblemProps) => {
    const dimensions = size === "sm" ? "w-10 h-10" : "w-12 h-12";

    // Split code into two parts (e.g., "G" and "01")
    const match = code.match(/^([A-Z]+)(\d+)$/);
    const letterPart = match ? match[1] : code;
    const numberPart = match ? match[2] : "";

    return (
        <div
            className={twMerge(
                "flex items-center justify-center rounded-full bg-white border-4 z-10 transition-transform duration-300 group-hover:scale-110",
                dimensions,
                className
            )}
            style={{ borderColor: color }}
        >
            <div className="flex flex-col items-center justify-center -space-y-1">
                <Typography
                    className="text-black text-[0.7rem]"
                    style={{ fontWeight: 900, lineHeight: "1.25rem" }}
                >
                    {letterPart}
                </Typography>
                {numberPart && (
                    <Typography
                        className="text-black text-[0.85rem]"
                        style={{ fontWeight: 900, lineHeight: "1.25rem" }}
                    >
                        {numberPart}
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default StationEmblem;
