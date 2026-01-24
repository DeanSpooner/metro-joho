import { stations } from "../data/stations";
import { stationTimetables } from "../data/stationTimetables";
import { dummyStations } from "../data/dummyStations";
import { getLastSegment } from "./utilities";

export interface StationData {
  id: string;
  name: string;
  description?: string;
  lines: string[];
  timetable: Record<string, string[]>;
}

const STATION_PREFIX = "odpt.Station:TokyoMetro.";
const RAILWAY_PREFIX = "odpt.Railway:TokyoMetro.";

const normalizeId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const getLineId = (railwayUrn: string) => {
  return railwayUrn.replace(RAILWAY_PREFIX, "").toLowerCase();
};

export const getAllStations = () => {
  const uniqueStations = new Map<string, { name: string; id: string }>();

  stations.forEach((station) => {
    const name = station["odpt:stationTitle"]?.en || "Unknown";
    const id = normalizeId(name);

    if (!uniqueStations.has(id)) {
      uniqueStations.set(id, { name, id });
    }
  });

  return Array.from(uniqueStations.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

export const getStationData = (stationId: string): StationData | null => {
  const matchingStations = stations.filter((s) => {
    const name = s["odpt:stationTitle"]?.en;
    return name && normalizeId(name) === stationId;
  });

  if (matchingStations.length === 0) {
    const dummy = (dummyStations as any)[stationId];
    if (dummy) return dummy;
    return null;
  }

  const firstMatch = matchingStations[0];
  const name = firstMatch["odpt:stationTitle"].en;

  const dummyKey = Object.keys(dummyStations).find(
    (k) =>
      k === stationId ||
      normalizeId((dummyStations as any)[k].name) === stationId
  );
  const description = dummyKey
    ? (dummyStations as any)[dummyKey].description
    : "Tokyo Metro Station";

  const lines = new Set<string>();
  const timetable: Record<string, string[]> = {};

  matchingStations.forEach((station) => {
    const railway = station["odpt:railway"];
    const lineId = getLineId(railway);
    lines.add(lineId);

    const timetableIds = station["odpt:stationTimetable"] || [];

    timetableIds.forEach((ttId) => {
      const ttData = stationTimetables.find((t) => t["owl:sameAs"] === ttId);

      if (ttData) {
        if (!timetable[lineId]) {
          timetable[lineId] = [];
        }

        const trainTimetables = ttData["odpt:stationTimetableObject"] || [];
        trainTimetables.forEach((train: any) => {
          if (train["odpt:departureTime"]) {
            timetable[lineId].push(train["odpt:departureTime"]);
          }
        });
      }
    });
  });

  Object.keys(timetable).forEach((line) => {
    timetable[line] = Array.from(new Set(timetable[line])).sort();
  });

  return {
    id: stationId,
    name,
    description,
    lines: Array.from(lines),
    timetable,
  };
};

export const getTimetableForLine = (
  lineId: string,
  stationName: string
): string[] => {
  const stationEntry = stations.find(
    (s) =>
      getLastSegment(s["owl:sameAs"]).toLowerCase() ===
        stationName.toLowerCase() &&
      getLastSegment(s["odpt:railway"]).toLowerCase() === lineId.toLowerCase()
  );

  if (!stationEntry) return [];

  const timetableIds = stationEntry["odpt:stationTimetable"] || [];
  const times: string[] = [];

  timetableIds.forEach((ttId) => {
    const ttData = stationTimetables.find((t) => t["owl:sameAs"] === ttId);
    if (ttData) {
      const trainTimetables = ttData["odpt:stationTimetableObject"] || [];
      trainTimetables.forEach((train: any) => {
        if (train["odpt:departureTime"]) {
          times.push(train["odpt:departureTime"]);
        }
      });
    }
  });

  return Array.from(new Set(times)).sort();
};
