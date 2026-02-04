'use client';

import { useState, useEffect } from "react";
import Typography from "./Typography";
import Timetable from "./Timetable";
import MinifiedTimetable from "./MinifiedTimetable";
import { Locale } from "@/i18n/config";
import StationEmblem from "./StationEmblem";

interface CollapsibleTimetableProps {
    directionId: string;
    directionName: string;
    times: string[];
    boundForText: string;
    locale: Locale;
    className?: string;
    id?: string;
    stationCode?: string;
    lineColor?: string;
}

const CollapsibleTimetable = ({
    directionName,
    times,
    boundForText,
    locale,
    className,
    id,
    stationCode,
    lineColor,
}: CollapsibleTimetableProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && id && window.location.hash === `#${id}`) {
            setIsOpen(true);
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [id]);

    return (
        <div
            id={id}
            className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${className} ${isOpen ? 'shadow-lg shadow-white/5' : ''}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors group"
            >
                <div className="flex items-center gap-4">
                    {stationCode && lineColor && (
                        <StationEmblem
                            color={lineColor}
                            code={stationCode}
                            size="sm"
                        />
                    )}
                    <div className="flex flex-col">
                        <Typography className="text-sm text-white/50 uppercase tracking-wider font-bold mb-1">
                            {boundForText}
                        </Typography>
                        <Typography role="h3" font="zenKaku" className="text-2xl font-bold group-hover:text-white transition-colors">
                            {directionName}
                        </Typography>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="transform scale-90 origin-right">
                        <MinifiedTimetable
                            times={times}
                            locale={locale}
                            lineId=""
                            stationId=""
                            viewFullTimetableText=""
                            showLink={false}
                        />
                    </div>

                    <div className={`text-white/40 group-hover:text-white transition-all transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </button>

            <div
                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}
            >
                <div className="p-6 pt-0 border-t border-white/5">
                    <Timetable times={times} />
                </div>
            </div>
        </div>
    );
};

export default CollapsibleTimetable;
