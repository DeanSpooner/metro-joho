import { odptClient } from "./odptClient";
import { getLastSegment } from "./utilities";

export interface StationData {
  id: string;
  name: string;
  lines: {
    id: string;
    name: string;
    color: string;
  }[];
}

export const getAllStations = async (): Promise<{ name: string; id: string }[]> => {
  const stations = await odptClient.getStations();
  const uniqueStations = new Map<string, string>();

  stations.forEach((station) => {
    const name = station["odpt:stationTitle"].en;
    const id = getLastSegment(station["owl:sameAs"]);
    if (name && id) {
      uniqueStations.set(id, name);
    }
  });

  return Array.from(uniqueStations.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getStationData = async (
  stationId: string
): Promise<StationData | null> => {
  const allStations = await odptClient.getStations();
  const stationMatches = allStations.filter(
    (s) => getLastSegment(s["owl:sameAs"]) === stationId
  );

  if (stationMatches.length === 0) return null;

  const firstStation = stationMatches[0];
  const name = firstStation["odpt:stationTitle"].en;

  const lines = await Promise.all(
    stationMatches.map(async (s) => {
      const railwayResponse = await odptClient.getRailway(s["odpt:railway"]);
      const railway = railwayResponse[0];
      return {
        id: getLastSegment(railway["owl:sameAs"]),
        name: railway["odpt:railwayTitle"].en,
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
