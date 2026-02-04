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
  }[];
}

export const getAllStations = async (locale: Locale): Promise<{ name: string; id: string }[]> => {
  const stations = await odptClient.getStations();
  const uniqueStations = new Map<string, string>();

  stations.forEach((station) => {
    const name = getLocalizedTitle(station["odpt:stationTitle"], locale);
    const id = getLastSegment(station["owl:sameAs"]);
    if (name && id) {
      uniqueStations.set(id, name);
    }
  });

  return Array.from(uniqueStations.entries())
    .map(([id, name]) => ({ id, name }))
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
