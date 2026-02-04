import { Locale } from "@/i18n/config";
import { odptClient } from "./odptClient";
import { getLastSegment, getLocalizedTitle } from "./utilities";

export interface StationData {
  id: string;
  name: string;
  lines: {
    id: string;
    name: string;
    color: string;
    code: string;
  }[];
}

export const getAllStations = async (locale: Locale): Promise<StationData[]> => {
  const [stations, railways] = await Promise.all([
    odptClient.getStations(),
    odptClient.getRailways(),
  ]);

  const railwayMap = new Map<string, { color: string; code: string }>();
  railways.forEach((r) => {
    railwayMap.set(r["owl:sameAs"], {
      color: r["odpt:color"],
      code: r["odpt:lineCode"],
    });
  });

  const uniqueStations = new Map<string, StationData>();

  stations.forEach((station) => {
    const name = getLocalizedTitle(station["odpt:stationTitle"], locale);
    const id = getLastSegment(station["owl:sameAs"]);
    const railwayId = station["odpt:railway"];
    const railwayInfo = railwayMap.get(railwayId);
    
    // Only process Tokyo Metro stations (this check might be redundant given odptClient methods but safe)
    if (name && id && railwayInfo) {
      if (!uniqueStations.has(id)) {
        uniqueStations.set(id, {
          id,
          name,
          lines: [],
        });
      }

      const entry = uniqueStations.get(id)!;
      // Avoid duplicates if multiple entries exist for same line/station
      if (!entry.lines.some(l => l.id === getLastSegment(railwayId))) {
        entry.lines.push({
          id: getLastSegment(railwayId),
          name: getLocalizedTitle(station["odpt:stationTitle"], locale), // Using station title here effectively gives line context sometimes, but railway title might be better. 
          // Actually, let's just use the line ID/Title from railway map if needed, 
          // but for the card we mostly need color and station CODE.
          color: railwayInfo.color,
          code: station["odpt:stationCode"],
        });
      }
    }
  });

  return Array.from(uniqueStations.values())
    .sort((a, b) => a.name.localeCompare(b.name, locale));
};

export const getStationData = async (
  stationId: string,
  locale: Locale
): Promise<StationData | null> => {
  const allStations = await odptClient.getStations();
  const stationMatches = allStations.filter(
    (s) => getLastSegment(s["owl:sameAs"]) === stationId
  );

  if (stationMatches.length === 0) return null;

  const firstStation = stationMatches[0];
  const name = getLocalizedTitle(firstStation["odpt:stationTitle"], locale);

  const lines = await Promise.all(
    stationMatches.map(async (s) => {
      const railwayResponse = await odptClient.getRailway(s["odpt:railway"]);
      const railway = railwayResponse[0];
      return {
        id: getLastSegment(railway["owl:sameAs"]),
        name: getLocalizedTitle(railway["odpt:railwayTitle"], locale),
        color: railway["odpt:color"],
        code: s["odpt:stationCode"],
      };
    })
  );

  return {
    id: stationId,
    name,
    lines,
  };
};

export const getTimetableForLine = async (
  lineId: string,
  stationId: string
): Promise<string[]> => {
  const timetables = await odptClient.getStationTimetables(
    `odpt.Station:TokyoMetro.${lineId}.${stationId}`
  );

  if (timetables.length === 0) return [];

  const allTimes = timetables.flatMap((tt) =>
    tt["odpt:stationTimetableObject"].map((obj) => obj["odpt:departureTime"])
  );

  return Array.from(new Set(allTimes)).sort();
};
