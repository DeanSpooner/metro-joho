"use client";

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
}

const MinifiedTimetable = ({
    times,
    locale,
    lineId,
    stationId,
    viewFullTimetableText
}: MinifiedTimetableProps) => {
    const { missed, upcoming } = getUpcomingDepartures(times);

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-wrap gap-3 items-center mb-6">
                {/* Missed Departure */}
                {missed && (
                    <div className="relative group">
                        <Typography className="text-white/30 font-mono text-lg line-through decoration-white/20">
                            {missed}
                        </Typography>
                    </div>
                )}

                {/* Next (Primary) Departure */}
                {upcoming.length > 0 && (
                    <div className="bg-white text-[#02022a] px-3 py-1 rounded-md font-bold font-mono text-xl shadow-lg animate-pulse">
                        {upcoming[0]}
                    </div>
                )}

                {/* Subsequent Departures */}
                {upcoming.slice(1).map((time) => (
                    <div key={time} className="bg-white/10 px-3 py-1 rounded-md font-mono text-lg text-white/80">
                        {time}
                    </div>
                ))}

                {upcoming.length === 0 && !missed && (
                    <Typography className="text-white/40 italic">--:--</Typography>
                )}
            </div>

            <div className="mt-auto pt-4 border-t border-white/10">
                <Link
                    href={`/${locale}/lines/${lineId}/${stationId}`}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                    {viewFullTimetableText}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    );
};

export default MinifiedTimetable;
