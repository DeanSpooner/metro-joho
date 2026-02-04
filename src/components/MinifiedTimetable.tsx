"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Typography from "./Typography";
import { getUpcomingDepartures } from "@/utils/timeUtils";
import { Locale } from "@/i18n/config";

interface MinifiedTimetableProps {
    times: string[];
    locale: Locale;
    lineId: string;
    stationId: string;
    viewFullTimetableText: string;
    directionId?: string;
    showLink?: boolean;
}

const MinifiedTimetable = ({
    times,
    locale,
    lineId,
    stationId,
    viewFullTimetableText,
    directionId,
    showLink = true
}: MinifiedTimetableProps) => {
    const [, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTick(t => t + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const { missed, upcoming } = getUpcomingDepartures(times);

    return (
        <div className="flex flex-col h-full">
            <div className={`flex flex-wrap gap-3 items-center ${showLink ? "mb-6" : ""}`}>

                {missed && (
                    <div className="relative group hidden sm:block">
                        <Typography className="text-white/30 font-mono text-lg line-through decoration-white/20">
                            {missed}
                        </Typography>
                    </div>
                )}

                {upcoming.length > 0 && (
                    <div className="bg-white text-[#02022a] px-3 py-1 rounded-md font-bold font-mono text-xl shadow-lg animate-pulse">
                        {upcoming[0]}
                    </div>
                )}

                {upcoming.slice(1).map((time, index) => (
                    <div
                        key={time}
                        className={`bg-white/10 px-3 py-1 rounded-md font-mono text-lg text-white/80 ${index >= 1 ? 'hidden sm:block' : ''}`}
                    >
                        {time}
                    </div>
                ))}

                {upcoming.length === 0 && !missed && (
                    <Typography className="text-white/40 italic">--:--</Typography>
                )}
            </div>

            {showLink && (
                <div className="mt-auto pt-4">
                    <Link
                        href={`/${locale}/lines/${lineId}/${stationId}${directionId ? `#dir-${directionId}` : ''}`}
                        className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        {viewFullTimetableText}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MinifiedTimetable;
