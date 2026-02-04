"use client";

import Link from "next/link";
import Typography from "./Typography";
import StationEmblem from "./StationEmblem";
import { Locale } from "@/i18n/config";
import { StationData } from "@/utils/stationUtils";

interface StationCardProps {
    locale: Locale;
    station: StationData;
}

const StationCard = ({ locale, station }: StationCardProps) => {
    return (
        <Link href={`/${locale}/stations/${station.id}`} className="group no-underline">
            <div className="relative h-full overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 flex flex-col p-6 backdrop-blur-sm">
                <Typography role="h3" font="zenKaku" className="text-xl text-white font-bold mb-4 group-hover:text-white transition-all transform group-hover:scale-105 origin-left">
                    {station.name}
                </Typography>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {station.lines.map((line) => (
                        <StationEmblem
                            key={line.id}
                            color={line.color}
                            code={line.code}
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default StationCard;
