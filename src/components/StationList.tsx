"use client";

import { useState, useMemo } from "react";
import StationCard from "./StationCard";
import { StationData } from "@/utils/stationUtils";
import { Locale } from "@/i18n/config";

interface StationListProps {
    initialStations: StationData[];
    locale: Locale;
    placeholder: string;
    noResults: string;
}

const StationList = ({ initialStations, locale, placeholder, noResults }: StationListProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredStations = useMemo(() => {
        if (!searchQuery) return initialStations;

        const lowerQuery = searchQuery.toLowerCase();
        return initialStations.filter((station) => {
            // Match name
            if (station.name.toLowerCase().includes(lowerQuery)) return true;

            // Match station code (e.g. "G01")
            return station.lines.some(line => line.code.toLowerCase().includes(lowerQuery));
        });
    }, [initialStations, searchQuery]);

    return (
        <div>
            <div className="mb-8 max-w-md mx-auto relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all backdrop-blur-sm"
                />
                {/* Simple search icon SVG could go here */}
            </div>

            {filteredStations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredStations.map((station) => (
                        <StationCard key={station.id} locale={locale} station={station} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-white/40">
                    {noResults}
                </div>
            )}
        </div>
    );
};

export default StationList;
