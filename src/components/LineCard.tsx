"use client";

import Link from "next/link";
import Typography from "./Typography";
import HorizontalEmblem from "./HorizontalEmblem";
import { Locale } from "@/i18n/config";
import { ODPTRailway } from "@/utils/odptClient";

interface LineCardProps {
    locale: Locale;
    line: ODPTRailway;
    title: string;
    stationsLabel: string;
    terminalStations: string;
}

const LineCard = ({ locale, line, title, stationsLabel, terminalStations }: LineCardProps) => {
    const lineId = line["owl:sameAs"].split(":").pop()?.split(".").pop();

    return (
        <Link href={`/${locale}/lines/${lineId}`} className="group no-underline">
            <div className="relative h-full overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 flex flex-col backdrop-blur-sm">
                <div
                    className="absolute left-0 top-0 bottom-0 w-2 z-10"
                    style={{ backgroundColor: line["odpt:color"] }}
                />

                <div className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                        <HorizontalEmblem
                            color={line["odpt:color"]}
                            text={line["odpt:lineCode"]}
                            size="medium"
                            animate={false}
                        />
                    </div>

                    <div className="mt-auto">
                        <Typography role="h3" font="zenKaku" className="text-white group-hover:text-white transition-colors">
                            {title}
                        </Typography>

                        <div className="mt-2 space-y-1">
                            <Typography className="text-sm text-white/60">
                                {terminalStations}
                            </Typography>
                            <Typography className="text-xs text-white/40 uppercase tracking-wider">
                                {line["odpt:stationOrder"].length} {stationsLabel}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LineCard;
