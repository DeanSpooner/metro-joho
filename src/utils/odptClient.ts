const ODPT_BASE_URL = "https://api.odpt.org/api/v4";
const ACCESS_TOKEN = process.env.ODPT_ACCESS_TOKEN || "[YOUR_ACCESS_TOKEN]";

export interface ODPTTitle {
  ja: string;
  en: string;
  "zh-Hans"?: string;
  "zh-Hant"?: string;
  ko?: string;
}

export interface ODPTRailway {
  "@id": string;
  "owl:sameAs": string;
  "odpt:operator": string;
  "odpt:railwayTitle": ODPTTitle;
  "odpt:color": string;
  "odpt:lineCode": string;
  "odpt:stationOrder": {
    "odpt:index": number;
    "odpt:station": string;
    "odpt:stationTitle": ODPTTitle;
  }[];
}

export interface ODPTStation {
  "@id": string;
  "owl:sameAs": string;
  "odpt:operator": string;
  "odpt:railway": string;
  "odpt:stationTitle": ODPTTitle;
  "odpt:stationCode": string;
  "odpt:geo:lat"?: number;
  "odpt:geo:long"?: number;
}

export interface ODPTStationTimetableObject {
  "odpt:departureTime": string;
  "odpt:destinationStation": string[];
  "odpt:trainType": string;
  "odpt:calendar": string;
  "odpt:notes"?: ODPTTitle;
}

export interface ODPTStationTimetable {
  "@id": string;
  "owl:sameAs": string;
  "odpt:railway": string;
  "odpt:station": string;
  "odpt:direction": string;
  "odpt:calendar": string;
  "odpt:operator": string;
  "odpt:stationTimetableObject": ODPTStationTimetableObject[];
}

export async function fetchODPT<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T[]> {
  const queryParams = new URLSearchParams({
    "acl:consumerKey": ACCESS_TOKEN,
    ...params,
  });

  const url = `${ODPT_BASE_URL}/${endpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `ODPT API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ODPT API (${endpoint}):`, error);
    return [];
  }
}

export const odptClient = {
  getRailways: () =>
    fetchODPT<ODPTRailway>("odpt:Railway", {
      "odpt:operator": "odpt.Operator:TokyoMetro",
    }),
  getStations: () =>
    fetchODPT<ODPTStation>("odpt:Station", {
      "odpt:operator": "odpt.Operator:TokyoMetro",
    }),
  getStationTimetables: (stationId?: string) => {
    const params: Record<string, string> = {};
    if (stationId) params["odpt:station"] = stationId;
    return fetchODPT<ODPTStationTimetable>("odpt:StationTimetable", params);
  },
  getRailway: (railwayId: string) =>
    fetchODPT<ODPTRailway>("odpt:Railway", { "owl:sameAs": railwayId }),
  getStation: (stationId: string) =>
    fetchODPT<ODPTStation>("odpt:Station", { "owl:sameAs": stationId }),
};
