import { odptClient } from "./odptClient";
import { getLastSegment } from "./utilities";

export interface StationData {
  id: string;
  name: string;
  description?: string;
  lines: string[];
  timetable: Record<string, string[]>;
}

const RAILWAY_PREFIX = "odpt.Railway:TokyoMetro.";

const normalizeId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const getLineId = (railwayUrn: string) => {
  return railwayUrn.replace(RAILWAY_PREFIX, "").toLowerCase();
};

export const getAllStations = async () => {
  const stations = (await odptClient.getStations()) as any[];
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

export const getStationData = async (stationId: string): Promise<StationData | null> => {
  const stations = (await odptClient.getStations()) as any[];
  const matchingStations = stations.filter((s) => {
    const name = s["odpt:stationTitle"]?.en;
    return name && normalizeId(name) === stationId;
  });

  if (matchingStations.length === 0) {
    return null;
  }

  const firstMatch = matchingStations[0];
  const name = firstMatch["odpt:stationTitle"].en;
  const description = "Tokyo Metro Station";

  const lines = new Set<string>();
  const timetable: Record<string, string[]> = {};

  for (const station of matchingStations) {
    const railway = station["odpt:railway"];
    const lineId = getLineId(railway);
    lines.add(lineId);

    const timetableIds = station["odpt:stationTimetable"] || [];
    if (timetableIds.length > 0) {
      const ttDataList = (await odptClient.getStationTimetables(station["owl:sameAs"])) as any[];
      
      ttDataList.forEach((ttData) => {
        if (!timetable[lineId]) {
          timetable[lineId] = [];
        }

        const trainTimetables = ttData["odpt:stationTimetableObject"] || [];
        trainTimetables.forEach((train: any) => {
          if (train["odpt:departureTime"]) {
            timetable[lineId].push(train["odpt:departureTime"]);
          }
        });
      });
    }
  }

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

export const getTimetableForLine = async (
  lineId: string,
  stationName: string
): Promise<string[]> => {
  const stations = (await odptClient.getStations()) as any[];
  const stationEntry = stations.find(
    (s) =>
      getLastSegment(s["owl:sameAs"]).toLowerCase() ===
        stationName.toLowerCase() &&
      getLastSegment(s["odpt:railway"]).toLowerCase() === lineId.toLowerCase()
  );

  if (!stationEntry) return [];

  const ttDataList = (await odptClient.getStationTimetables(stationEntry["owl:sameAs"])) as any[];
  const times: string[] = [];

  ttDataList.forEach((ttData) => {
    const trainTimetables = ttData["odpt:stationTimetableObject"] || [];
    trainTimetables.forEach((train: any) => {
      if (train["odpt:departureTime"]) {
        times.push(train["odpt:departureTime"]);
      }
    });
  });

  return Array.from(new Set(times)).sort();
};
