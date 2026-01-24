import { stations } from "../data/stations";
import { stationTimetables } from "../data/stationTimetables";
import { dummyStations } from "../data/dummyStations";
import { getLastSegment } from "./utilities";

export interface StationData {
  id: string;
  name: string;
  description?: string;
  lines: string[];
  timetable: Record<string, string[]>; // lineId -> times
}

const STATION_PREFIX = "odpt.Station:TokyoMetro.";
const RAILWAY_PREFIX = "odpt.Railway:TokyoMetro.";

// Helper to normalize strings for ID generation (e.g. "Meiji-jingumae<Harajuku>" -> "meijijingumaeharajuku")
// Ideally we want "meijijingumae" or matching what dummyStations uses if possible.
// dummyStations uses "meijijingumae" (based on data file check? No, let's normalize simply).
const normalizeId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

// Helper to extract line ID from ODPT railway URN
const getLineId = (railwayUrn: string) => {
  return railwayUrn.replace(RAILWAY_PREFIX, "").toLowerCase();
};

export const getAllStations = () => {
  // Aggregate stations by name to handle multiple lines per station
  const uniqueStations = new Map<string, { name: string; id: string }>();

  stations.forEach((station) => {
    // extract English name
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
  // 1. Find all station entries matching this ID (by normalized name)
  const matchingStations = stations.filter((s) => {
    const name = s["odpt:stationTitle"]?.en;
    return name && normalizeId(name) === stationId;
  });

  if (matchingStations.length === 0) {
    // Fallback to dummyStations if it exists there directly (though our ID logic differs?)
    const dummy = (dummyStations as any)[stationId];
    if (dummy) return dummy;
    return null;
  }

  // 2. Aggregate data
  // Base info from first match
  const firstMatch = matchingStations[0];
  const name = firstMatch["odpt:stationTitle"].en;

  // Try to find description from dummyStations if available, as API data doesn't seem to have descriptions
  // We need to try to match the dummyStations key.
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

    // 3. Find timetables for this specific station entry
    // The station entry lists timetable IDs in `odpt:stationTimetable`
    const timetableIds = station["odpt:stationTimetable"] || [];

    timetableIds.forEach((ttId) => {
      // Find the actual timetable object in stationTimetables
      // This is an expensive find if array is huge. map lookup would be better but for now filter is okay-ish?
      // Actually stationTimetables is an array.
      // Optimization: Filter logic might be heavy.
      const ttData = stationTimetables.find((t) => t["owl:sameAs"] === ttId);

      if (ttData) {
        if (!timetable[lineId]) {
          timetable[lineId] = [];
        }

        // internal structure of timetable object
        const trainTimetables = ttData["odpt:stationTimetableObject"] || [];
        trainTimetables.forEach((train: any) => {
          if (train["odpt:departureTime"]) {
            timetable[lineId].push(train["odpt:departureTime"]);
          }
        });
      }
    });
  });

  // Sort times for each line
  Object.keys(timetable).forEach((line) => {
    // Times are "HH:MM", simple string sort works
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
  // Normalize station name for searching if needed, but here we can try to match the last segment
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
